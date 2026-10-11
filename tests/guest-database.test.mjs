import test from "node:test";
import { PGlite } from "@electric-sql/pglite";
import fs from "node:fs";
import assert from "node:assert/strict";
test("guest submission and review enforce database privacy, deadlines and duplicate limits", async () => {
  const db = new PGlite();
  await db.exec(
    `create role anon;create role authenticated;create table profiles(id uuid primary key,role text);insert into profiles values('11111111-1111-4111-8111-111111111111','admin');create function is_admin() returns boolean language sql stable as $$select current_setting('fixture.admin',true)='yes'$$;create table jobs(id uuid primary key,title text,status text,application_deadline date);create table notifications(id uuid default gen_random_uuid(),user_id uuid,title text,body text,href text);grant usage on schema public to anon,authenticated;insert into jobs select ('aaaaaaaa-aaaa-4aaa-8aaa-'||lpad(n::text,12,'0'))::uuid,'Job '||n,'published',current_date+1 from generate_series(1,7)n;insert into jobs values('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','Closed','closed',null),('cccccccc-cccc-4ccc-8ccc-cccccccccccc','Expired','published',current_date-1);`,
  );
  await db.exec(
    fs.readFileSync(
      new URL(
        "../supabase/migrations/0014_guest_applications.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  async function as(role, fn, admin = false) {
    await db.exec("begin");
    try {
      await db.exec("set local role " + role);
      await db.query("select set_config('fixture.admin',$1,true)", [
        admin ? "yes" : "no",
      ]);
      const value = await fn();
      await db.exec("commit");
      return value;
    } catch (e) {
      await db.exec("rollback");
      throw e;
    }
  }
  const submit = (id, email = "guest@example.com") =>
    as("anon", () =>
      db.query("select submit_guest_application($1,$2,$3,$4,$5,$6)", [
        id,
        "Guest Person",
        email,
        "555-0100",
        "https://example.com/resume",
        "A thoughtful cover letter.",
      ]),
    );
  const id = (n) => "aaaaaaaa-aaaa-4aaa-8aaa-" + String(n).padStart(12, "0");
  await submit(id(1));
  assert.equal(
    (await db.query("select count(*)::int n from guest_applications")).rows[0]
      .n,
    1,
  );
  assert.equal(
    (await db.query("select count(*)::int n from notifications")).rows[0].n,
    1,
  );
  await submit(id(1), "GUEST@example.com");
  assert.equal(
    (await db.query("select count(*)::int n from guest_applications")).rows[0]
      .n,
    1,
  );
  console.log(
    "PASS anonymous submission, private persistence, admin notification and duplicate replay",
  );
  await assert.rejects(
    as("anon", () => db.query("select * from guest_applications")),
  );
  assert.equal(
    (
      await as("authenticated", () =>
        db.query("select * from guest_applications"),
      )
    ).rows.length,
    0,
  );
  assert.equal(
    (
      await as(
        "authenticated",
        () => db.query("select * from guest_applications"),
        true,
      )
    ).rows.length,
    1,
  );
  await assert.rejects(
    as("anon", () =>
      db.query(
        "insert into guest_applications(job_id,full_name,email) values($1,'Bad','bad@example.com')",
        [id(1)],
      ),
    ),
  );
  await assert.rejects(
    as("authenticated", () =>
      db.query(
        "insert into guest_applications(job_id,full_name,email) values($1,'Bad','bad@example.com')",
        [id(1)],
      ),
    ),
  );
  console.log(
    "PASS applicant data inaccessible to anonymous and non-admin accounts; direct inserts denied",
  );
  await assert.rejects(
    submit("bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb"),
    /not open/,
  );
  await assert.rejects(
    submit("cccccccc-cccc-4ccc-8ccc-cccccccccccc"),
    /not open/,
  );
  await assert.rejects(submit(id(2), "bad-email"), /Invalid/);
  console.log("PASS closed, expired and invalid-email applications rejected");
  for (let n = 2; n <= 5; n++) await submit(id(n));
  await assert.rejects(submit(id(6)), /Please wait/);
  console.log("PASS five-role daily limit, enforced in database");
  const denied = await as("authenticated", () =>
    db.query("update guest_applications set status='accepted' returning id"),
  );
  assert.equal(denied.rows.length, 0);
  const updated = await as(
    "authenticated",
    () =>
      db.query(
        "update guest_applications set status='under_review',review_notes='Follow up' returning id",
      ),
    true,
  );
  assert.equal(updated.rows.length, 5);
  console.log("PASS admin review allowed and non-admin changes denied");
  const original = (
    await db.query("select id,updated_at::text as updated_at from guest_applications limit 1")
  ).rows[0];
  const firstReview = await as(
    "authenticated",
    () =>
      db.query(
        "update guest_applications set review_notes='First review',updated_at=updated_at+interval '1 second' where id=$1 and updated_at=$2 returning id",
        [original.id, original.updated_at],
      ),
    true,
  );
  assert.equal(firstReview.rows.length, 1);
  const stale = await as(
    "authenticated",
    () =>
      db.query(
        "update guest_applications set review_notes='Stale review' where id=$1 and updated_at=$2 returning id",
        [original.id, original.updated_at],
      ),
    true,
  );
  assert.equal(stale.rows.length, 0);
  await assert.rejects(
    as("anon", () =>
      db.query("select submit_guest_application($1,$2,$3,$4,$5,$6)", [
        id(7),
        "Guest Person",
        "another@example.com",
        "",
        "https://user:password@example.com/resume",
        "",
      ]),
    ),
    /Invalid/,
  );
  console.log(
    "PASS stale database review rejected and credential-bearing resume links blocked",
  );
  await db.exec(
    fs.readFileSync(
      new URL(
        "../supabase/migrations/0014_guest_applications.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  assert.equal(
    (await db.query("select count(*)::int n from guest_applications")).rows[0]
      .n,
    5,
  );
  console.log("PASS migration rerun retains applications");
  await db.close();
});
