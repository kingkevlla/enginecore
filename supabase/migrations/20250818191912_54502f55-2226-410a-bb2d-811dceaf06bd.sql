-- Update admin user creation to work without email verification
-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS create_admin_from_signup_trigger ON auth.users;

-- Update function to handle immediate admin creation
CREATE OR REPLACE FUNCTION public.create_admin_from_signup()
RETURNS TRIGGER AS $$
BEGIN
    -- Create admin user for any email that contains "admin" or ends with "@admin.com"
    IF NEW.email LIKE '%admin%' OR NEW.email LIKE '%@admin.com' THEN
        INSERT INTO public.admin_users (user_id, role, is_active, permissions)
        VALUES (NEW.id, 'admin', true, '{"full_access": true}'::jsonb)
        ON CONFLICT (user_id) DO UPDATE SET
            role = 'admin',
            is_active = true,
            permissions = '{"full_access": true}'::jsonb,
            updated_at = now();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public', 'auth';

-- Recreate trigger on auth.users table
CREATE TRIGGER create_admin_from_signup_trigger
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.create_admin_from_signup();