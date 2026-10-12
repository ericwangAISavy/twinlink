import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import ts from "typescript";
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
const roles = load("src/lib/roles.ts");
const origins = load("src/lib/site-url.ts");
test("font files are bundled and layout has no Google Fonts dependency", () => {
  const layout = readFileSync(
    new URL("../src/app/layout.tsx", import.meta.url),
    "utf8",
  );
  assert.equal(layout.includes("next/font/google"), false);
  for (const [name, hash] of [
    [
      "source-sans-3-latin.woff2",
      "19143dca075972bc84e3fd9eab7416dd40cc565dccb2435a044bdfabe060c7d5",
    ],
    [
      "cormorant-garamond-latin.woff2",
      "d80df8ff5aecd299a61549f9e29ab1ed0b9b05f4ea71d50fe978e07d5240b235",
    ],
  ]) {
    const bytes = readFileSync(
      new URL("../src/app/fonts/" + name, import.meta.url),
    );
    assert.equal(bytes.subarray(0, 4).toString(), "wOF2");
    assert.equal(createHash("sha256").update(bytes).digest("hex"), hash);
  }
});
test("production URLs fall back to Vercel instead of localhost", () => {
  const keys = [
    "NEXT_PUBLIC_APP_URL",
    "VERCEL",
    "VERCEL_URL",
    "VERCEL_PROJECT_PRODUCTION_URL",
  ];
  const old = Object.fromEntries(keys.map((k) => [k, process.env[k]]));
  try {
    Object.assign(process.env, {
      NEXT_PUBLIC_APP_URL: "http://localhost:3000",
      VERCEL: "1",
      VERCEL_URL: "preview.vercel.app",
      VERCEL_PROJECT_PRODUCTION_URL: "twinlink.example",
    });
    assert.equal(origins.siteOrigin(), "https://twinlink.example");
    process.env.NEXT_PUBLIC_APP_URL = "https://company.example/path";
    assert.equal(origins.siteOrigin(), "https://company.example");
    process.env.NEXT_PUBLIC_APP_URL = "not-a-url";
    assert.equal(origins.siteOrigin(), "https://twinlink.example");
  } finally {
    for (const key of keys) {
      if (old[key] === undefined) delete process.env[key];
      else process.env[key] = old[key];
    }
  }
});
test("callback destinations reject control characters and normalize protected paths", () => {
  for (const path of [
    "//attacker.example",
    "/\t/attacker.example",
    "/\\attacker.example",
    "https://attacker.example",
  ])
    assert.equal(roles.isSafeInternalPath(path), false);
  assert.equal(
    roles.destinationAfterLogin("CANDIDATE", "/careers/../admin"),
    "/dashboard/candidate",
  );
  assert.equal(
    roles.destinationAfterLogin(
      "EMPLOYEE",
      "/careers/%2e%2e/dashboard/candidate",
    ),
    "/dashboard/employee",
  );
  assert.equal(
    roles.destinationAfterLogin("CANDIDATE", "/careers/engineer?source=site"),
    "/careers/engineer?source=site",
  );
});
test("sign-out redirects to the public host and clears session cookies", async () => {
  const { NextResponse, NextRequest } = nodeRequire("next/server");
  const route = load("src/app/auth/sign-out/route.ts", {
    "next/server": { NextResponse },
    "@/lib/site-url": origins,
    "@/lib/supabase/env": {
      isSupabaseConfigured: () => true,
      getSupabasePublicKey: () => "fixture",
    },
    "@supabase/ssr": {
      createServerClient: (_url, _key, options) => ({
        auth: {
          signOut: async () =>
            options.cookies.setAll([
              {
                name: "sb-fixture-auth-token",
                value: "",
                options: { path: "/", maxAge: 0 },
              },
            ]),
        },
      }),
    },
  });
  const response = await route.GET(
    new NextRequest("http://0.0.0.0:3000/auth/sign-out?registered=1", {
      headers: { host: "localhost:3000", "x-forwarded-proto": "http" },
    }),
  );
  assert.equal(
    response.headers.get("location"),
    "http://localhost:3000/login?registered=1",
  );
  assert.match(response.headers.get("set-cookie"), /sb-fixture-auth-token=/);
});
test("middleware preserves refreshed session cookies on dashboard redirects", async () => {
  const { NextResponse, NextRequest } = nodeRequire("next/server");
  const route = load("src/lib/supabase/middleware.ts", {
    "next/server": { NextResponse },
    "@/lib/roles": roles,
    "@/lib/supabase/env": { isSupabaseConfigured: () => true },
    "@/lib/supabase/session-cookie": { hasSupabaseAuthCookie: () => true },
    "@supabase/ssr": {
      createServerClient: (_url, _key, options) => ({
        auth: {
          getUser: async () => {
            options.cookies.setAll([
              {
                name: "sb-fixture-auth-token",
                value: "refreshed",
                options: { path: "/", sameSite: "lax" },
              },
            ]);
            return { data: { user: { id: "person" } } };
          },
        },
        from: () => ({
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({
                data: { role: "admin", access_status: "approved" },
                error: null,
              }),
            }),
          }),
        }),
      }),
    },
  });
  const response = await route.updateSession(
    new NextRequest("https://twinlink.example/login"),
  );
  assert.equal(
    response.headers.get("location"),
    "https://twinlink.example/admin",
  );
  assert.equal(
    response.cookies.get("sb-fixture-auth-token").value,
    "refreshed",
  );
});
test("employee invitation already accepted by signup trigger is not redeemed twice", async () => {
  const helper = load("src/lib/signup-invite.ts");
  for (const role of ["employee", "admin", "candidate"]) {
    let calls = 0;
    const client = {
      from: () => ({
        select: () => ({
          eq: () => ({
            maybeSingle: async () => ({ data: { role }, error: null }),
          }),
        }),
      }),
      rpc: async () => {
        calls++;
        return { error: null };
      },
    };
    assert.equal(
      await helper.completeSignupInvite(client, "person", "invite-token"),
      null,
    );
    assert.equal(calls, role === "candidate" ? 1 : 0);
  }
});

test("candidate applications remain open throughout a date-only deadline", () => {
  const helper = load("src/lib/application-deadline.ts");
  assert.equal(
    helper.applicationDeadlinePassed(
      "2026-11-30",
      Date.parse("2026-11-30T23:59:59Z"),
    ),
    false,
  );
  assert.equal(
    helper.applicationDeadlinePassed(
      "2026-11-30",
      Date.parse("2026-12-01T00:00:00Z"),
    ),
    true,
  );
  assert.equal(helper.applicationDeadlinePassed(null), false);
});

test("editorial uploads reject files that exceed the Vercel-safe limit", async () => {
  let clientUsed = false;
  const schema = load("src/lib/editorial-schema.ts");
  const action = load("src/server/actions/editorial.ts", {
    "next/cache": {},
    "@/lib/editorial-schema": schema,
    "@/server/queries/editorial": {},
    "@/server/authorization": { requireAdmin: async () => ({ id: "admin" }) },
    "@/lib/supabase/server": {
      createServerSupabaseClient: async () => {
        clientUsed = true;
      },
    },
  });
  const data = new FormData();
  data.set(
    "file",
    new File(
      [new Uint8Array(schema.EDITORIAL_IMAGE_MAX_BYTES + 1)],
      "too-large.jpg",
      { type: "image/jpeg" },
    ),
  );
  const result = await action.uploadEditorialImage(data);
  assert.equal(result.ok, false);
  assert.match(result.error, /4 MB/);
  assert.equal(clientUsed, false);
});
