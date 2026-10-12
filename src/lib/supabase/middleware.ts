import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { hasSupabaseAuthCookie } from "@/lib/supabase/session-cookie";
import { destinationAfterLogin, homePath, toAppRole } from "@/lib/roles";

function loginRedirect(
  request: NextRequest,
  pathname: string,
  extra?: Record<string, string>,
) {
  const login = request.nextUrl.clone();
  login.pathname = "/login";
  login.search = "";
  login.searchParams.set("callbackUrl", pathname);
  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      login.searchParams.set(key, value);
    }
  }
  return NextResponse.redirect(login);
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  function withSessionCookies(result: NextResponse) {
    for (const cookie of response.cookies.getAll()) result.cookies.set(cookie);
    return result;
  }
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/auth/sign-out")) {
    return response;
  }

  const needsAuth =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  const authPage = pathname === "/login" || pathname === "/register";
  const hasSession = hasSupabaseAuthCookie(request.cookies.getAll());

  if (!isSupabaseConfigured()) {
    if (needsAuth) {
      return withSessionCookies(loginRedirect(request, pathname));
    }
    return response;
  }

  if (!needsAuth && !hasSession) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (needsAuth && !user) {
    return withSessionCookies(loginRedirect(request, pathname));
  }

  if (user && (needsAuth || authPage)) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role, access_status")
      .eq("id", user.id)
      .maybeSingle();
    const role = toAppRole(profile?.role);
    const accessBlocked =
      role === "CANDIDATE" && (error || profile?.access_status !== "approved");

    if (accessBlocked) {
      const signOut = request.nextUrl.clone();
      signOut.pathname = "/auth/sign-out";
      signOut.search = "";
      signOut.searchParams.set("reason", "approval");
      return withSessionCookies(NextResponse.redirect(signOut));
    }
    if (!role) {
      const signOut = request.nextUrl.clone();
      signOut.pathname = "/auth/sign-out";
      signOut.search = "";
      signOut.searchParams.set("reason", "account");
      return withSessionCookies(NextResponse.redirect(signOut));
    }

    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return withSessionCookies(
        NextResponse.redirect(new URL(homePath(role), request.url)),
      );
    }

    if (pathname.startsWith("/dashboard")) {
      if (role === "ADMIN") {
        return withSessionCookies(
          NextResponse.redirect(new URL("/admin", request.url)),
        );
      }
      if (pathname.startsWith("/dashboard/employee") && role !== "EMPLOYEE") {
        return withSessionCookies(
          NextResponse.redirect(new URL(homePath(role), request.url)),
        );
      }
      if (pathname.startsWith("/dashboard/candidate") && role !== "CANDIDATE") {
        return withSessionCookies(
          NextResponse.redirect(new URL(homePath(role), request.url)),
        );
      }
      if (pathname === "/dashboard") {
        return withSessionCookies(
          NextResponse.redirect(new URL(homePath(role), request.url)),
        );
      }
    }

    if (authPage) {
      const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
      return withSessionCookies(
        NextResponse.redirect(
          new URL(destinationAfterLogin(role, callbackUrl), request.url),
        ),
      );
    }
  }

  return response;
}
