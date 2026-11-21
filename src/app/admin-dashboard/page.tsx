import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isAdminUser } from '@/lib/auth/admin';
import AdminLayout from './components/AdminLayout';
import AdminDashboardContent from './components/AdminDashboardContent';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  // Second line of defence behind the middleware: never render admin data
  // without a verified admin user.
  const supabase = await createClient();
  if (!supabase) redirect('/admin-login?error=config');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin-login?next=/admin-dashboard');
  if (!isAdminUser(user)) redirect('/admin-login?error=unauthorized');

  return (
    <AdminLayout userEmail={user.email ?? ''}>
      <AdminDashboardContent />
    </AdminLayout>
  );
}
