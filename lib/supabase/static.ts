// Cliente Supabase SEM cookies — para uso em generateStaticParams (build time),
// onde não há requisição HTTP. Usa apenas a anon key e lê dados públicos (RLS).
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}
