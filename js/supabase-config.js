// Supabase Configuration
// Replace these with your actual Supabase project credentials

const SUPABASE_URL = 'https://gcegxwqdztlgqewmvteh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjZWd4d3FkenRsZ3Fld212dGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMDE3NzgsImV4cCI6MjA4NTg3Nzc3OH0.cbeNnZCIQwubQ1ETjvydVruLpjkacCjX-3PCs6xcdQg';

// Initialize Supabase client
try {
    // Check if Supabase library is loaded
    if (typeof supabase === 'undefined') {
        throw new Error('Supabase library not loaded. Make sure the CDN script is included before this file.');
    }
    
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase client initialized successfully');
} catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    window.supabaseClient = null;
}
