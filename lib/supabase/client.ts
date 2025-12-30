import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const supabase = createClientComponentClient();

// For use in client components
export function useSupabase() {
    return supabase;
}
