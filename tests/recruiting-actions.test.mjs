import { renderToStaticMarkup } from "react-dom/server";
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import { createRequire } from "node:module";
const nodeRequire = createRequire(import.meta.url);
function load(path, dependencies = {}) {
  const testModule = { exports: {} };
  const source = readFileSync(new URL("../" + path, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });
  new Function("require", "module", "exports", outputText)(
    (name) =>
      name in dependencies
        ? dependencies[name]
        : name === "@/lib/site-url"
          ? load("src/lib/site-url.ts")
          : name === "@/lib/application-contact"
            ? load("src/lib/application-contact.ts")
            : name.startsWith("@/")
              ? {}
              : nodeRequire(name),
    testModule,
    testModule.exports,
  );
  return testModule.exports;
}
const roles = load("src/lib/roles.ts");
const result = {
  ok: (message) => ({ ok: true, message }),
  fail: (error) => ({ ok: false, error }),
};
function fixture({ admin = true, conflict = false } = {}) {
  const calls = { rpc: [], filters: [], paths: [], updates: [] };
  const query = {
    update: (data) => {
      calls.updates.push(data);
      return query;
    },
    eq: (key, value) => {
      calls.filters.push([key, value]);
      return query;
    },
    select: () => query,
    maybeSingle: async () => ({
      data: conflict ? null : { id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa" },
      error: null,
    }),
  };
  const deps = {
    "@/lib/action-result": result,
    "@/lib/constants": {
      APPLICATION_STATUSES: [
        "submitted",
        "under_review",
        "interview",
        "accepted",
        "rejected",
        "withdrawn",
      ],
    },
    "next/cache": { revalidatePath: (path) => calls.paths.push(path) },
    "@/server/authorization": {
      requireAdmin: async () => {
        if (!admin) throw Error("Forbidden");
      },
    },
    "@/lib/supabase/public": {
      createPublicSupabaseClient: () => ({
        rpc: async (name, input) => {
          calls.rpc.push({ name, input });
          return { error: null };
        },
      }),
    },
    "@/lib/supabase/server": {
      createServerSupabaseClient: async () => ({ from: () => query }),
    },
  };
  return { ...load("src/server/actions/guest-applications.ts", deps), calls };
}
function application() {
  const data = new FormData();
  for (const [key, value] of Object.entries({
    jobId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    name: "Test Person",
    email: "Person@Example.com",
    phone: "+86 138 0000 0000",
    address: "88 Innovation Road, Hangzhou, China",
    social: "https://example.com/profile",
    resume: "HTTPS://example.com/resume",
    cover: "An introduction",
  }))
    data.set(key, value);
  return data;
}
test("guest submission needs no account and normalizes email and resume links", async () => {
  const f = fixture({ admin: false });
  assert.ok((await f.submitGuestApplication(application())).ok);
  assert.equal(f.calls.rpc[0].input.p_email, "person@example.com");
  assert.equal(f.calls.rpc[0].input.p_resume_url, "https://example.com/resume");
  assert.ok(f.calls.paths.includes("/admin/guest-applications"));
});
test("invalid fields and bot honeypots never write an application", async () => {
  for (const [key, value] of [
    ["resume", "javascript:alert(1)"],
    ["email", "not-an-email"],
    ["name", "x"],
    ["phone", ""],
    ["address", ""],
    ["social", "javascript:alert(1)"],
  ]) {
    const f = fixture();
    const data = application();
    data.set(key, value);
    assert.equal((await f.submitGuestApplication(data)).ok, false);
    assert.equal(f.calls.rpc.length, 0);
  }
  const f = fixture();
  const data = application();
  data.set("website", "bot");
  await f.submitGuestApplication(data);
  assert.equal(f.calls.rpc.length, 0);
});
function review() {
  const data = new FormData();
  for (const [key, value] of Object.entries({
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    status: "under_review",
    notes: "Review note",
    updatedAt: "2026-10-11T12:00:00.123456+00:00",
  }))
    data.set(key, value);
  return data;
}
test("review changes require admin access and compare the saved update timestamp", async () => {
  const denied = fixture({ admin: false });
  await assert.rejects(denied.reviewGuestApplication(review()), /Forbidden/);
  assert.equal(denied.calls.updates.length, 0);
  const stale = fixture({ conflict: true });
  assert.match(
    (await stale.reviewGuestApplication(review())).error,
    /Another administrator/,
  );
  assert.ok(
    stale.calls.filters.some(
      ([key, value]) =>
        key === "updated_at" && value === "2026-10-11T12:00:00.123456+00:00",
    ),
  );
  const saved = fixture();
  assert.ok((await saved.reviewGuestApplication(review())).ok);
});
test("homepage statistics preserve valid edited values and fall back on malformed data", () => {
  const stats = load("src/lib/company-statistics.ts");
  assert.equal(
    stats.parseStatistics('["75+","42","20+","8.5"]')[3].value,
    "8.5",
  );
  for (const value of ["invalid", '["one","2","3","4"]', '["1","2"]'])
    assert.deepEqual(stats.parseStatistics(value), stats.DEFAULT_STATISTICS);
});
test("email callback uses the public host and signs out candidates pending approval", async () => {
  let signOut = 0;
  const callback = load("src/app/auth/callback/route.ts", {
    "next/server": {
      NextResponse: { redirect: (url) => ({ url: url.toString() }) },
    },
    "@/lib/roles": roles,
    "@/lib/supabase/env": { isSupabaseConfigured: () => true },
    "@/lib/supabase/server": {
      createServerSupabaseClient: async () => ({
        auth: {
          exchangeCodeForSession: async () => ({ error: null }),
          signOut: async () => {
            signOut++;
          },
        },
      }),
    },
    "@/server/authorization": {
      getCurrentProfile: async () => ({
        role: "CANDIDATE",
        profile: { accessStatus: "pending" },
      }),
    },
  });
  const response = await callback.GET(
    new Request("http://0.0.0.0:3000/auth/callback?code=valid&next=/admin", {
      headers: { host: "localhost:3000", "x-forwarded-proto": "http" },
    }),
  );
  assert.equal(response.url, "http://localhost:3000/login?error=approval");
  assert.equal(signOut, 1);
});

test("pending candidates can apply as guests without accessing profile applications", async () => {
  const wrapper = ({ children }) => children;
  for (const [role, accessStatus, guest] of [
    [null, null, true],
    ["CANDIDATE", "pending", true],
    ["CANDIDATE", "approved", false],
    ["EMPLOYEE", "approved", true],
  ]) {
    let profileReads = 0;
    const page = load("src/app/(marketing)/careers/[id]/page.tsx", {
      "next/navigation": {
        notFound: () => {
          throw new Error("Not found");
        },
      },
      "@/components/careers/guest-apply-form": {
        GuestApplyForm: () => "guest-form",
      },
      "@/components/careers/apply-form": { ApplyForm: () => "profile-form" },
      "@/components/careers/save-job-button": { SaveJobButton: () => null },
      "@/components/ui/badge": { Badge: wrapper },
      "@/components/ui/card": {
        Card: wrapper,
        CardContent: wrapper,
        CardHeader: wrapper,
        CardTitle: wrapper,
      },
      "@/server/authorization": {
        getCurrentProfile: async () =>
          role
            ? { user: { id: "person", role }, profile: { accessStatus } }
            : null,
      },
      "@/server/queries/jobs": {
        getJobBySlugOrId: async () => ({
          id: "job",
          title: "Role",
          description: "Overview",
          status: "PUBLISHED",
        }),
      },
      "@/server/queries/applications": {
        getCandidateApplication: async () => {
          profileReads++;
          return null;
        },
        getSavedJobIds: async () => {
          profileReads++;
          return new Set();
        },
      },
      "@/lib/utils": { formatRelativeTime: () => "recently" },
    });
    const html = renderToStaticMarkup(
      await page.default({ params: Promise.resolve({ id: "role" }) }),
    );
    assert.ok(html.includes(guest ? "guest-form" : "profile-form"));
    assert.equal(profileReads, guest ? 0 : 2);
  }
});
