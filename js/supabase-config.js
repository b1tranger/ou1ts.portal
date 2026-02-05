// Supabase Configuration
// Replace these with your actual Supabase project credentials

const SUPABASE_URL = 'https://gcegxwqdztlgqewmvteh.supabase.co'; // e.g., 'https://xxxxx.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_d-xz8wy09y1AGeVmS1_dZw_ysR_zzgL'; // Your anon/public key

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other modules
window.supabaseClient = supabase;
