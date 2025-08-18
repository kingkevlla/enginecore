-- Fix newsletter_subscriptions security issue
-- Remove any existing public read policies and add admin-only read access

-- Drop any existing SELECT policies on newsletter_subscriptions
DROP POLICY IF EXISTS "Anyone can read newsletter subscriptions" ON public.newsletter_subscriptions;
DROP POLICY IF EXISTS "Newsletter subscriptions are publicly readable" ON public.newsletter_subscriptions;
DROP POLICY IF EXISTS "Public can read newsletter subscriptions" ON public.newsletter_subscriptions;

-- Add admin-only read policy for newsletter subscriptions
CREATE POLICY "Admins can read newsletter subscriptions" 
ON public.newsletter_subscriptions 
FOR SELECT 
USING (is_admin(auth.uid()));

-- Ensure the existing INSERT and UPDATE policies remain intact for public newsletter functionality
-- (These policies already exist and allow public subscription/unsubscription)