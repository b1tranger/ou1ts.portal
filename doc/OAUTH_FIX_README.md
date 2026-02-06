# Google OAuth Login Fix

## Problem

Google OAuth login was opening the account selector and asking for permissions, but after granting access:
- Users were not being logged in
- No data was added to the Supabase `profiles` table
- The session was not being established

## Root Cause

The database setup had three issues:

1. **NOT NULL Constraint**: The `profiles` table required `student_id` to be NOT NULL, but OAuth users don't provide this during sign-in
2. **Missing INSERT Policy**: The profiles table lacked an INSERT policy, preventing the trigger from creating profiles
3. **No Fallback Value**: The trigger function didn't handle missing `student_id` from OAuth users

When a Google user signed in, the trigger tried to insert a row with `student_id = NULL`, which violated the constraint and failed silently.

## Solution

### Step 1: Run the SQL Fix

Go to your Supabase project → **SQL Editor** and run the script in `supabase_fix.sql`:

```sql
-- This script will:
-- 1. Make student_id nullable
-- 2. Update the trigger function to use 'OAUTH_USER' as default for OAuth users
-- 3. Add the missing INSERT policy
-- 4. Create profiles for any existing OAuth users
```

### Step 2: Verify the Fix

1. Log out any existing sessions
2. Clear browser cache/cookies for your site
3. Try "Continue with Google" again
4. Check Supabase dashboard → **Authentication → Users** - you should see your user
5. Check **Database → Table Editor → profiles** - you should see a row with your email

### Step 3: Test the Full Flow

1. Sign in with Google - should work immediately
2. Check your profile shows "Google User" as Student ID
3. Try starring a resource - should work
4. Log out and log back in - session should persist

## Expected Behavior After Fix

- ✅ OAuth users can sign in successfully
- ✅ Profile is automatically created with `student_id = 'OAUTH_USER'`
- ✅ UI displays "Google User" as the student ID
- ✅ Users can star/unstar resources
- ✅ Session persists across page reloads

## Code Changes Made

### 1. Database Schema (`DOCUMENTATION.md`)
- Changed `student_id TEXT UNIQUE NOT NULL` to `student_id TEXT`
- Added INSERT policy for service role

### 2. Trigger Function (`DOCUMENTATION.md` & `supabase_fix.sql`)
- Added `COALESCE()` to use 'OAUTH_USER' when student_id is missing
- Uses `SECURITY DEFINER` to bypass RLS during profile creation

### 3. Auth Module (`js/auth.js`)
- Improved `setUser()` to handle missing profiles
- Automatically creates profile if it doesn't exist
- Shows "Google User" instead of "OAUTH_USER" in UI
- Fixed `redirectTo` to use current page URL

## Optional: Add Student ID Later

If you want OAuth users to add their Student ID later, you can:

1. Add a "Profile Settings" page
2. Let users update their `student_id` via:
```javascript
await supabase
  .from('profiles')
  .update({ student_id: newStudentId })
  .eq('id', Auth.currentUser.id);
```

## Troubleshooting

### Still not working?

1. **Check Supabase Logs**: Dashboard → Logs → Check for errors
2. **Check Browser Console**: Look for JavaScript errors
3. **Verify OAuth Config**: 
   - Authentication → Providers → Google should be enabled
   - Redirect URL should be: `https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback`
4. **Check RLS Policies**: All policies should be created as shown above

### Users still can't star resources?

Make sure you have SELECT, INSERT, and DELETE policies on the `stars` table as documented.

## Migration for Existing Users

If you already have users who tried signing in with Google before this fix, run the cleanup query in `supabase_fix.sql` (Step 6). This will create profiles for orphaned auth users.

---

**Last Updated**: February 6, 2026
