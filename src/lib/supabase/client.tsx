// Placeholder until Supabase is wired up. Returns null so callers must handle
// the "not configured" case explicitly.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SupabaseClient = any;

export function createClient(...args: unknown[]): SupabaseClient | null {
  console.warn('Placeholder: createClient is not implemented yet.', args);
  return null;
}
