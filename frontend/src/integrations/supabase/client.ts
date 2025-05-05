
import { createClient } from '@supabase/supabase-js';

// These should be replaced with actual environment variables in a real environment
// For development, we'll use placeholder values that will be replaced later
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper for authentication errors
export const getErrorMessage = (error: any): string => {
  return error?.message || error?.error_description || 'An unknown error occurred';
};
