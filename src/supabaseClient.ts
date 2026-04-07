import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (supabaseUrl.includes('placeholder')) {
  console.warn('Supabase URL is missing or using placeholder. Please ensure VITE_SUPABASE_URL is set in the Secrets panel.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
