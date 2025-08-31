-- Disable email confirmation requirement for immediate login
-- This allows users to login immediately without email verification

-- Update auth config to disable email confirmation
UPDATE auth.config SET 
  enable_confirmations = false,
  enable_signup = true
WHERE true;

-- Also ensure we don't require email confirmation for existing users
UPDATE auth.users SET 
  email_confirmed_at = now(),
  confirmed_at = now()
WHERE email_confirmed_at IS NULL;