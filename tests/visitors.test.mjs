import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import { PGlite } from "@electric-sql/pglite";
const nodeRequire = createRequire(import.meta.url);
function load(path, deps = {}) {
  const testModule = { exports: {} };
  const { outputText } = ts.transpileModule(
    readFileSync(new URL("../" + path, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  );
  new Function("require", "module", "exports", outputText)(
    (name) => (name in deps ? deps[name] : nodeRequire(name)),
    testModule,
    testModule.exports,
  );
  return testModule.exports;
}
const metadata = load("src/lib/visitor-metadata.ts");
test("visitor metadata trusts Vercel headers only and validates IP addresses", () => {
  const headers = new Headers({
    "x-vercel-forwarded-for": "203.0.113.42",
    "x-vercel-ip-country": "CN",
    "x-vercel-ip-city": "Hangzhou%20City",
    "x-vercel-ip-country-region": "ZJ",
    "user-agent": "Browser",
  });
  assert.equal(metadata.visitorMetadata(headers, true).ip, "203.0.113.42");
  assert.equal(metadata.visitorMetadata(headers, true).city, "Hangzhou City");
  assert.equal(metadata.visitorMetadata(headers, false).ip, null);
  assert.equal(metadata.visitorMetadata(headers, false).country, "");
  headers.set("x-vercel-forwarded-for", "bad-ip");
  assert.equal(metadata.visitorMetadata(headers, true).ip, null);
  assert.equal(metadata.isPublicVisitPath("/careers/engineer"), true);
  for (const path of [
    "/admin",
    "/dashboard/candidate",
    "/auth/callback",
    "/api/visits",
    "//elsewhere",
    "/careers?email=private",
  ])
    assert.equal(metadata.isPublicVisitPath(path), false);
});
test("capture endpoint ignores browser IP data, cross-origin requests and privacy opt-outs", async () => {
  const original = { ...process.env };
  try {
    Object.assign(process.env, {
      SUPABASE_SERVICE_ROLE_KEY: "fixture",
      VISITOR_TRACKING_ENABLED: "true",
      VERCEL: "1",
    });
    const calls = [];
    const route = load("src/app/api/visits/route.ts", {
      "next/server": { NextResponse: Response, after: () => {} },
      "@/server/visitor-connection": { enrichVisitorConnection: async () => {} },
      "@/lib/visitor-metadata": metadata,
      "@/lib/supabase/admin": {
        createAdminSupabaseClient: () => ({
          rpc: async (name, data) => {
            calls.push({ name, data });
            return { error: null };
          },
        }),
      },
    });
    const req = (body, headers = {}) =>
      new Request("https://twinlink.example/api/visits", {
        method: "POST",
        headers: {
          origin: "https://twinlink.example",
          host: "twinlink.example",
          "x-vercel-forwarded-for": "203.0.113.42",
          "x-vercel-ip-country": "CN",
          ...headers,
        },
        body: JSON.stringify(body),
      });
    assert.equal(
      (await route.POST(req({ page: "/", ip: "1.2.3.4", country: "US" })))
        .status,
      204,
    );
    assert.equal(calls[0].data.p_ip, "203.0.113.42");
    assert.equal(calls[0].data.p_country, "CN");
    for (const headers of [
      { origin: "https://other.example" },
      { dnt: "1" },
      { "sec-gpc": "1" },
    ])
      await route.POST(req({ page: "/" }, headers));
    await route.POST(req({ page: "/admin" }));
    await route.POST(req({ page: "/", huge: "x".repeat(2048) }));
    assert.equal(calls.length, 1);
    process.env.VISITOR_TRACKING_ENABLED = "false";
    await route.POST(req({ page: "/" }));
    assert.equal(calls.length, 1);
  } finally {
    for (const name of [
      "SUPABASE_SERVICE_ROLE_KEY",
      "VISITOR_TRACKING_ENABLED",
      "VERCEL",
    ]) {
      if (original[name] === undefined) delete process.env[name];
      else process.env[name] = original[name];
    }
  }
});
test("visitor records are admin-only; service writes deduplicate and expire old records", async () => {
  const db = new PGlite();
  try {
    await db.exec(
      `create role anon;create role authenticated;create role service_role bypassrls;grant usage on schema public to anon,authenticated,service_role;create function is_admin() returns boolean language sql stable as $$select current_setting('fixture.admin',true)='yes'$$;`,
    );
    await db.exec(
      readFileSync(
        new URL(
          "../supabase/migrations/0016_visitor_monitoring.sql",
          import.meta.url,
        ),
        "utf8",
      ),
    );
    async function role(name, fn, admin = false) {
      await db.exec("begin");
      try {
        await db.exec("set local role " + name);
        await db.query("select set_config('fixture.admin',$1,true)", [
          admin ? "yes" : "no",
        ]);
        const data = await fn();
        await db.exec("commit");
        return data;
      } catch (error) {
        await db.exec("rollback");
        throw error;
      }
    }
    const record = () =>
      db.query(
        "select record_site_visit('/','203.0.113.42','CN','ZJ','Hangzhou','Browser','vercel')",
      );
    await assert.rejects(role("anon", record));
    await assert.rejects(role("authenticated", record));
    await role("service_role", record);
    await role("service_role", record);
    assert.equal(
      (await db.query("select count(*)::int n from site_visits")).rows[0].n,
      1,
    );
    await assert.rejects(
      role("anon", () => db.query("select * from site_visits")),
    );
    assert.equal(
      (await role("authenticated", () => db.query("select * from site_visits")))
        .rows.length,
      0,
    );
    assert.equal(
      (
        await role(
          "authenticated",
          () => db.query("select * from site_visits"),
          true,
        )
      ).rows.length,
      1,
    );
    await db.query(
      "update site_visits set created_at=now()-interval '91 days'",
    );
    await role("service_role", record);
    assert.equal(
      (await db.query("select count(*)::int n from site_visits")).rows[0].n,
      1,
    );
    await db.exec(
      readFileSync(
        new URL(
          "../supabase/migrations/0016_visitor_monitoring.sql",
          import.meta.url,
        ),
        "utf8",
      ),
    );
    assert.equal(
      (await db.query("select count(*)::int n from site_visits")).rows[0].n,
      1,
    );
  } finally {
    await db.close();
  }
});

test("connection provider rejects incomplete, mismatched and error responses", () => {
  const { parseConnectionSignals } = load("src/lib/vpn-detection.ts");
  const fixture = { ip: "203.0.113.42", is_vpn: true, is_proxy: false, is_tor: false, is_datacenter: true };
  assert.deepEqual(parseConnectionSignals(fixture, fixture.ip), { vpn: true, proxy: false, tor: false, datacenter: true });
  assert.equal(parseConnectionSignals({ ...fixture, is_vpn: undefined }, fixture.ip), null);
  assert.equal(parseConnectionSignals(fixture, "203.0.113.43"), null);
  assert.equal(parseConnectionSignals({ ...fixture, error: "quota" }, fixture.ip), null);
});
test("connection cache claims once per day and remains private", async () => {
  const db = new PGlite();
  try {
    await db.exec("create role anon;create role authenticated;create role service_role bypassrls;grant usage on schema public to anon,authenticated,service_role;create function is_admin() returns boolean language sql stable as $$select current_setting('fixture.admin',true)='yes'$$;");
    await db.exec(readFileSync(new URL("../supabase/migrations/0017_visitor_connection_detection.sql", import.meta.url), "utf8"));
    await db.exec("set role service_role");
    const claim = async () => (await db.query("select claim_visitor_connection_check('203.0.113.42') claimed")).rows[0].claimed;
    assert.equal(await claim(), true);
    assert.equal(await claim(), false);
    await db.exec("update visitor_connections set attempted_at = now() - interval '25 hours', vpn=true, checked_at=now()");
    assert.equal(await claim(), true);
    assert.equal((await db.query("select vpn from visitor_connections")).rows[0].vpn, null);
    await db.exec("reset role;set role anon");
    await assert.rejects(db.query("select * from visitor_connections"));
    await assert.rejects(db.query("select claim_visitor_connection_check('203.0.113.42')"));
    await db.exec("reset role;set role authenticated");
    assert.equal((await db.query("select * from visitor_connections")).rows.length, 0);
    await db.query("select set_config('fixture.admin','yes',false)");
    assert.equal((await db.query("select * from visitor_connections")).rows.length, 1);
  } finally { await db.close(); }
});

test("daily visitor chart separates proxy/datacenter traffic and counts each IP once per UTC+8 day", () => {
  const { visitorStatus, dailyVisitorStatus } = load("src/lib/visitor-daily-status.ts");
  const now = Date.parse("2026-10-12T04:00:00Z");
  const pure = { checked_at: new Date(now).toISOString(), vpn: false, proxy: false, tor: false, datacenter: false };
  assert.equal(visitorStatus(pure, now), "pure");
  for (const signal of ["vpn", "proxy", "tor", "datacenter"]) assert.equal(visitorStatus({ ...pure, [signal]: true }, now), "nonPure");
  assert.equal(visitorStatus({ ...pure, proxy: null }, now), "unknown");
  assert.equal(visitorStatus({ ...pure, checked_at: new Date(now - 86400001).toISOString() }, now), "unknown");
  const row = (id, ip, createdAt, connection = pure) => ({ id, ip, createdAt, connection });
  const daily = dailyVisitorStatus([
    row("1", "1.1.1.1", "2026-10-11T17:00:00Z"),
    row("2", "1.1.1.1", "2026-10-12T01:00:00Z"),
    row("3", "2.2.2.2", "2026-10-12T01:00:00Z", { ...pure, datacenter: true }),
    row("4", "", "2026-10-12T01:00:00Z"),
    row("5", "1.1.1.1", "2026-10-11T15:59:00Z"),
  ], 3, now);
  assert.deepEqual(daily, [
    { date: "2026-10-10", pure: 0, nonPure: 0, unknown: 0 },
    { date: "2026-10-11", pure: 1, nonPure: 0, unknown: 0 },
    { date: "2026-10-12", pure: 1, nonPure: 1, unknown: 1 },
  ]);
});
