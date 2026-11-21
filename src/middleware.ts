import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { isAdminUser } from '@/lib/auth/admin';

const LOGIN_PATH = '/admin-login';
const DASHBOARD_PATH = '/admin-dashboard';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isDashboard = pathname === DASHBOARD_PATH || pathname.startsWith(`${DASHBOARD_PATH}/`);

  const redirectTo = (path: string, params: Record<string, string> = {}) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    url.search = '';
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    return NextResponse.redirect(url);
  };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    // Fail closed: without Supabase there is no way to authenticate.
    return isDashboard ? redirectTo(LOGIN_PATH, { error: 'config' }) : NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // getUser() validates the token with Supabase Auth (unlike getSession()).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const withSessionCookies = (res: NextResponse) => {
    response.cookies.getAll().forEach((c) => res.cookies.set(c));
    return res;
  };

  if (isDashboard) {
    if (!user) {
      return withSessionCookies(redirectTo(LOGIN_PATH, { next: `${pathname}${search}` }));
    }
    if (!isAdminUser(user)) {
      return withSessionCookies(redirectTo(LOGIN_PATH, { error: 'unauthorized' }));
    }
  }

  if (pathname === LOGIN_PATH && isAdminUser(user)) {
    return withSessionCookies(redirectTo(DASHBOARD_PATH));
  }

  return response;
}

export const config = {
  matcher: ['/admin-dashboard', '/admin-dashboard/:path*', '/admin-login'],
};
