import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
  if (import.meta.env.PROD) {
    throw new Error(
      'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in production.'
    );
  }
  console.warn('Supabase credentials not configured. Supabase features will be unavailable.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
