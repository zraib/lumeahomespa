'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Loader2 } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import { useAuth } from '@/contexts/AuthContext';
import { safeNextPath } from '@/lib/auth/admin';

const ERROR_MESSAGES: Record<string, string> = {
  unauthorized: 'This account does not have admin access.',
  config: 'Sign-in is not configured yet. Please contact the site administrator.',
};

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, signOut, user, configured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(() => {
    const code = searchParams.get('error');
    return code ? ERROR_MESSAGES[code] ?? 'Something went wrong. Please try again.' : null;
  });

  const next = safeNextPath(searchParams.get('next'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      // The middleware re-checks admin rights on the next request.
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed. Please try again.');
      setSubmitting(false);
    }
  };

  const handleSwitchAccount = async () => {
    await signOut();
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <AppLogo src="/assets/images/logo-lh-1777721812389.png" size={48} />
          <h1 className="mt-4 text-xl font-bold text-foreground">Admin sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">LumeaHomeSpa staff only</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4">
          {error && (
            <div role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          {user && (
            <div className="text-xs text-muted-foreground">
              Signed in as <span className="font-medium text-foreground">{user.email}</span>.{' '}
              <button type="button" onClick={handleSwitchAccount} className="underline hover:text-foreground">
                Use another account
              </button>
            </div>
          )}

          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-foreground mb-1">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !configured}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
