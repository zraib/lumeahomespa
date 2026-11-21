import type { User } from '@supabase/supabase-js';

/**
 * Decides whether a signed-in Supabase user may access the admin dashboard.
 *
 * A user is an admin when either:
 *  - their `app_metadata.role` is "admin" (set from the Supabase dashboard or
 *    with the service role key; users cannot change app_metadata themselves), or
 *  - their email is listed in the server-only ADMIN_EMAILS env var
 *    (comma-separated).
 *
 * Fails closed: with neither configured, nobody is an admin.
 */
export function isAdminUser(user: User | null | undefined): boolean {
  if (!user) return false;

  if (user.app_metadata?.role === 'admin') return true;

  const email = user.email?.trim().toLowerCase();
  if (!email) return false;

  const allowlist = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return allowlist.includes(email);
}

/** Only allow same-site relative redirect targets, to avoid open redirects. */
export function safeNextPath(next: string | null | undefined, fallback = '/admin-dashboard'): string {
  if (!next || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) {
    return fallback;
  }
  return next;
}
