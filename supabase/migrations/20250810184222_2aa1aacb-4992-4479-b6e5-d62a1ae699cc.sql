-- Create a function to setup admin user
CREATE OR REPLACE FUNCTION setup_admin_user(admin_email TEXT, admin_user_id UUID DEFAULT NULL)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_uuid UUID;
BEGIN
    -- If user_id is provided, use it; otherwise try to find by email
    IF admin_user_id IS NOT NULL THEN
        user_uuid := admin_user_id;
    ELSE
        -- This won't work for finding auth users, but we'll handle it differently
        user_uuid := NULL;
    END IF;
    
    -- Insert or update admin user record
    IF user_uuid IS NOT NULL THEN
        INSERT INTO public.admin_users (user_id, role, is_active, permissions)
        VALUES (user_uuid, 'admin', true, '{"full_access": true}'::jsonb)
        ON CONFLICT (user_id) 
        DO UPDATE SET 
            role = 'admin',
            is_active = true,
            permissions = '{"full_access": true}'::jsonb,
            updated_at = now();
    END IF;
END;
$$;

-- Create a simple admin signup page function
CREATE OR REPLACE FUNCTION public.create_admin_from_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
    -- Check if this is the admin email
    IF NEW.email = 'admin@engineparts.com' THEN
        INSERT INTO public.admin_users (user_id, role, is_active, permissions)
        VALUES (NEW.id, 'admin', true, '{"full_access": true}'::jsonb);
    END IF;
    RETURN NEW;
END;
$$;

-- Create trigger for auto-admin creation
CREATE OR REPLACE TRIGGER on_admin_signup
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.create_admin_from_signup();