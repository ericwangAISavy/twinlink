import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabasePublicKey, isSupabaseConfigured } from "@/lib/supabase/env";

async function signOutAndRedirect(request: NextRequest) {
  const login = new URL("/login", request.nextUrl.origin);
  if (request.nextUrl.searchParams.get("reason") === "account") {
    login.searchParams.set("error", "account");
  }

  const response = NextResponse.redirect(login, { status: 303 });

  if (!isSupabaseConfigured()) {
    return response;
  }

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, getSupabasePublicKey()!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  try {
    await supabase.auth.signOut({ scope: "local" });
  } catch {
    // Session may already be gone; still send the user to login with cleared cookies.
  }

  return response;
}

export async function GET(request: NextRequest) {
  return signOutAndRedirect(request);
}

export async function POST(request: NextRequest) {
  return signOutAndRedirect(request);
}
