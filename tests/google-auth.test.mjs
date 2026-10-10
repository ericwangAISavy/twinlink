import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import { createServerClient } from "@supabase/ssr";

// Exercise the actual action and callback with isolated provider/session adapters.
// These tests never send credentials or write to the hosted Supabase project.
function load(path, dependencies, fetchImpl) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const testModule = { exports: {} };
  new Function("require", "module", "exports", "fetch", "process", outputText)(
    (name) => {
      assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
      return dependencies[name];
    },
    testModule,
    testModule.exports,
    fetchImpl,
    { env: { NEXT_PUBLIC_SUPABASE_URL: "https://fixture.supabase.co" } },
  );
  return testModule.exports;
}
const roles = load("src/lib/roles.ts", {});
function fixture({
  google = true,
  role = "CANDIDATE",
  approved = true,
  invite,
  inviteError,
  exchangeError,
} = {}) {
  const calls = {
    deleted: [],
    stored: [],
    signOut: 0,
    oauth: [],
    invites: [],
    exchanges: [],
  };
  const store = {
    get: () => (invite ? { value: invite } : undefined),
    set: (...args) => calls.stored.push(args),
    delete: (input) => calls.deleted.push(input),
  };
  const client = {
    auth: {
      signInWithOAuth: async (input) => {
        calls.oauth.push(input);
        return {
          data: {
            url: "https://fixture.supabase.co/auth/v1/authorize?provider=google",
          },
          error: null,
        };
      },
      exchangeCodeForSession: async (code) => {
        calls.exchanges.push(code);
        return { error: exchangeError };
      },
      signOut: async () => {
        calls.signOut++;
        return { error: null };
      },
    },
    rpc: async (name, input) => {
      calls.invites.push({ name, input });
      return { error: inviteError };
    },
  };
  const dependencies = {
    "next/headers": {
      cookies: async () => store,
      headers: async () => new Headers({ origin: "https://twinlink.example" }),
    },
    "next/server": {
      NextResponse: { redirect: (url) => ({ url: url.toString() }) },
    },
    "@/lib/roles": roles,
    "@/lib/supabase/env": {
      isSupabaseConfigured: () => true,
      getSupabasePublicKey: () => "fixture-key",
    },
    "@/lib/supabase/server": { createServerSupabaseClient: async () => client },
    "@/server/authorization": {
      getCurrentProfile: async () =>
        role
          ? {
              role,
              profile: { accessStatus: approved ? "approved" : "pending" },
            }
          : null,
    },
  };
  return {
    calls,
    begin: load(
      "src/server/actions/google-auth.ts",
      dependencies,
      async () => ({ ok: true, json: async () => ({ external: { google } }) }),
    ).beginGoogleSignIn,
    callback: (query, headers) =>
      load("src/app/auth/callback/route.ts", dependencies).GET(
        new Request(`https://twinlink.example/auth/callback?${query}`, {
          headers,
        }),
      ),
  };
}

test("Google initiation uses the account chooser and an internal callback", async () => {
  const f = fixture();
  assert.ok((await f.begin({ next: "/careers/example" })).url);
  assert.deepEqual(f.calls.oauth[0], {
    provider: "google",
    options: {
      redirectTo:
        "https://twinlink.example/auth/callback?provider=google&next=%2Fcareers%2Fexample",
      skipBrowserRedirect: true,
      queryParams: { prompt: "select_account" },
    },
  });
  await f.begin({ next: "//attacker.example" });
  assert.equal(
    f.calls.oauth[1].options.redirectTo,
    "https://twinlink.example/auth/callback?provider=google",
  );
});
test("disabled Google reports a useful error without starting OAuth", async () => {
  const f = fixture({ google: false });
  assert.match((await f.begin({})).error, /use email and password/);
  assert.equal(f.calls.oauth.length, 0);
});
test("invitation tokens use short-lived HTTP-only cookies, not provider URLs", async () => {
  const f = fixture();
  await f.begin({ invite: "private-invite-token" });
  assert.equal(f.calls.stored[0][0], "twinlink-google-invite");
  assert.equal(f.calls.stored[0][1], "private-invite-token");
  assert.deepEqual(f.calls.stored[0][2], {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/auth/callback",
    maxAge: 600,
  });
  assert.ok(!JSON.stringify(f.calls.oauth).includes("private-invite-token"));
  assert.match((await f.begin({ invite: "invalid/token" })).error, /invalid/);
});
test("callback cancellation and exchange errors never enter a dashboard", async () => {
  const cancelled = fixture();
  assert.equal(
    (await cancelled.callback("error=access_denied")).url,
    "https://twinlink.example/login?error=google",
  );
  assert.equal(cancelled.calls.exchanges.length, 0);
  const failed = fixture({ exchangeError: { message: "Invalid code" } });
  assert.equal(
    (await failed.callback("code=bad-code")).url,
    "https://twinlink.example/login?error=auth",
  );
});
test("new pending candidates and missing profiles have their sessions cleared", async () => {
  for (const [options, error] of [
    [{ approved: false }, "approval"],
    [{ role: null }, "account"],
  ]) {
    const f = fixture(options);
    assert.equal(
      (await f.callback("code=valid-code")).url,
      `https://twinlink.example/login?error=${error}`,
    );
    assert.equal(f.calls.signOut, 1);
  }
});
test("callback routing respects database roles and rejects external destinations", async () => {
  for (const [role, destination] of [
    ["CANDIDATE", "/dashboard/candidate"],
    ["EMPLOYEE", "/dashboard/employee"],
    ["ADMIN", "/admin"],
  ]) {
    const f = fixture({ role });
    assert.equal(
      (await f.callback("code=valid-code&next=https://attacker.example")).url,
      `https://twinlink.example${destination}`,
    );
  }
  assert.equal(
    (await fixture().callback("code=valid-code&next=/admin")).url,
    "https://twinlink.example/dashboard/candidate",
  );
});
test("employee invitation acceptance uses the authenticated RPC and fails closed", async () => {
  const f = fixture({ role: "EMPLOYEE", invite: "valid-token" });
  assert.equal(
    (await f.callback("code=valid-code&provider=google")).url,
    "https://twinlink.example/dashboard/employee",
  );
  assert.deepEqual(f.calls.invites, [
    { name: "accept_employee_invite", input: { invite_token: "valid-token" } },
  ]);
  assert.equal(f.calls.deleted[0].path, "/auth/callback");
  const invalid = fixture({
    invite: "expired-token",
    inviteError: { message: "Expired or mismatched" },
  });
  assert.equal(
    (await invalid.callback("code=valid-code&provider=google")).url,
    "https://twinlink.example/login?error=invite",
  );
  assert.equal(invalid.calls.signOut, 1);
});
test("Supabase SSR generates a PKCE authorization URL and stores its verifier", async () => {
  const stored = [];
  const client = createServerClient(
    "https://fixture.supabase.co",
    "fixture-key",
    {
      cookies: { getAll: () => [], setAll: (values) => stored.push(...values) },
    },
  );
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: { skipBrowserRedirect: true },
  });
  assert.equal(error, null);
  const url = new URL(data.url);
  assert.equal(url.searchParams.get("code_challenge_method"), "s256");
  assert.ok(url.searchParams.get("code_challenge"));
  assert.ok(stored.some((cookie) => cookie.name.includes("code-verifier")));
});

test("callback returns to the public proxy host instead of the internal bind address", async () => {
  const f = fixture();
  assert.equal(
    (
      await f.callback("error=access_denied", {
        host: "localhost:3000",
        "x-forwarded-proto": "http",
      })
    ).url,
    "http://localhost:3000/login?error=google",
  );
});
test("a stale Google invitation is not redeemed by an email confirmation callback", async () => {
  const f = fixture({ invite: "stale-google-token" });
  await f.callback("code=email-confirmation");
  assert.equal(f.calls.invites.length, 0);
});
