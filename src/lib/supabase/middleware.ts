import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { toAppRole } from "@/lib/supabase/mappers";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const { pathname } = request.nextUrl;

  if (!isSupabaseConfigured()) {
    if (pathname.startsWith("/dashboard")) {
      const login = request.nextUrl.clone();
      login.pathname = "/login";
      login.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(login);
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

  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      const login = request.nextUrl.clone();
      login.pathname = "/login";
      login.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(login);
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    const role = toAppRole(profile?.role);

    if (pathname.startsWith("/dashboard/employee") && role !== "EMPLOYEE") {
      return NextResponse.redirect(new URL("/dashboard/candidate", request.url));
    }
    if (pathname.startsWith("/dashboard/candidate") && role !== "CANDIDATE") {
      return NextResponse.redirect(new URL("/dashboard/employee", request.url));
    }
    if (pathname === "/dashboard") {
      return NextResponse.redirect(
        new URL(role === "EMPLOYEE" ? "/dashboard/employee" : "/dashboard/candidate", request.url),
      );
    }
  }

  if ((pathname === "/login" || pathname === "/register") && user) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    const role = toAppRole(profile?.role);
    return NextResponse.redirect(
      new URL(role === "EMPLOYEE" ? "/dashboard/employee" : "/dashboard/candidate", request.url),
    );
  }

  return response;
}
