import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { destinationAfterLogin, homePath, toAppRole } from "@/lib/roles";

function loginRedirect(request: NextRequest, pathname: string, extra?: Record<string, string>) {
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
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/auth/sign-out")) {
    return response;
  }

  if (!isSupabaseConfigured()) {
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
      return loginRedirect(request, pathname);
    }
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
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

  async function trustedRole() {
    if (!user) return null;
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    const role = toAppRole(profile?.role);
    if (role !== "CANDIDATE") return role;
    const { data: access, error } = await supabase
      .from("profiles")
      .select("access_status")
      .eq("id", user.id)
      .maybeSingle();
    if (error || access?.access_status !== "approved") return "PENDING" as const;
    return role;
  }

  const needsAuth = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  if (needsAuth && !user) {
    return loginRedirect(request, pathname);
  }

  if (user && (needsAuth || pathname === "/login" || pathname === "/register")) {
    const role = await trustedRole();
    if (role === "PENDING") {
      const signOut = request.nextUrl.clone();
      signOut.pathname = "/auth/sign-out";
      signOut.search = "";
      signOut.searchParams.set("reason", "approval");
      return NextResponse.redirect(signOut);
    }
    if (!role) {
      const signOut = request.nextUrl.clone();
      signOut.pathname = "/auth/sign-out";
      signOut.search = "";
      signOut.searchParams.set("reason", "account");
      return NextResponse.redirect(signOut);
    }

    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL(homePath(role), request.url));
    }

    if (pathname.startsWith("/dashboard")) {
      if (role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      if (pathname.startsWith("/dashboard/employee") && role !== "EMPLOYEE") {
        return NextResponse.redirect(new URL(homePath(role), request.url));
      }
      if (pathname.startsWith("/dashboard/candidate") && role !== "CANDIDATE") {
        return NextResponse.redirect(new URL(homePath(role), request.url));
      }
      if (pathname === "/dashboard") {
        return NextResponse.redirect(new URL(homePath(role), request.url));
      }
    }

    if (pathname === "/login" || pathname === "/register") {
      const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
      return NextResponse.redirect(new URL(destinationAfterLogin(role, callbackUrl), request.url));
    }
  }

  return response;
}
