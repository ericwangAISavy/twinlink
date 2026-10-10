"use server";

import { cookies, headers } from "next/headers";
import { isSafeInternalPath, authErrorMessage } from "@/lib/roles";
import { isSupabaseConfigured, getSupabasePublicKey } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function beginGoogleSignIn(input: {
  next?: string | null;
  invite?: string;
}) {
  if (!isSupabaseConfigured())
    return {
      error: "Sign-in is currently unavailable. Please try again later.",
    };
  const requestHeaders = await headers();
  const origin =
    requestHeaders.get("origin") || process.env.NEXT_PUBLIC_APP_URL;
  if (!origin || !/^https?:\/\//.test(origin))
    return {
      error: "Unable to start Google sign-in. Please reload this page.",
    };
  if (
    input.invite &&
    (input.invite.length > 200 || !/^[a-zA-Z0-9_-]+$/.test(input.invite))
  )
    return {
      error:
        "This invitation is invalid. Please use the original invitation link.",
    };

  const callback = new URL("/auth/callback", origin);
  callback.searchParams.set("provider", "google");
  if (isSafeInternalPath(input.next))
    callback.searchParams.set("next", input.next);
  const cookieStore = await cookies();
  // Keep invitation tokens out of the Google authorization URL. The callback
  // redeems them only through the database's authenticated, email-matched RPC.
  if (input.invite)
    cookieStore.set("twinlink-google-invite", input.invite, {
      httpOnly: true,
      secure: callback.protocol === "https:",
      sameSite: "lax",
      path: "/auth/callback",
      maxAge: 600,
    });
  else
    cookieStore.delete({
      name: "twinlink-google-invite",
      path: "/auth/callback",
    });
  try {
    const settingsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/settings`,
      {
        headers: { apikey: getSupabasePublicKey()! },
        cache: "no-store",
      },
    );
    if (!settingsResponse.ok) throw new Error("Authentication unavailable");
    const settings = await settingsResponse.json();
    if (!settings.external?.google)
      return {
        error:
          "Google sign-in is not available yet. Please use email and password for now.",
      };
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callback.toString(),
        skipBrowserRedirect: true,
        queryParams: { prompt: "select_account" },
      },
    });
    if (error || !data.url) return { error: authErrorMessage(error) };
    return { url: data.url };
  } catch {
    return { error: "Unable to start Google sign-in. Please try again." };
  }
}
