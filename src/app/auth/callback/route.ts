import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { destinationAfterLogin } from "@/lib/roles";
import { getCurrentProfile } from "@/server/authorization";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const { searchParams } = requestUrl;
  const host =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  const forwardedProtocol = request.headers.get("x-forwarded-proto");
  const protocol =
    forwardedProtocol === "https"
      ? "https:"
      : forwardedProtocol === "http"
        ? "http:"
        : requestUrl.protocol;
  const origin =
    host && /^[a-zA-Z0-9.-]+(?::\d+)?$/.test(host)
      ? `${protocol}//${host}`
      : requestUrl.origin;
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code && isSupabaseConfigured()) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(new URL("/login?error=auth", origin));
    }

    const auth = await getCurrentProfile();
    if (!auth) {
      await supabase.auth.signOut();
      const login = new URL("/login", origin);
      login.searchParams.set("error", "account");
      return NextResponse.redirect(login);
    }

    if (auth.role === "CANDIDATE" && auth.profile.accessStatus !== "approved") {
      await supabase.auth.signOut({ scope: "local" });
      return NextResponse.redirect(new URL("/login?error=approval", origin));
    }
    return NextResponse.redirect(
      new URL(destinationAfterLogin(auth.role, next), origin),
    );
  }

  return NextResponse.redirect(new URL("/login", origin));
}
