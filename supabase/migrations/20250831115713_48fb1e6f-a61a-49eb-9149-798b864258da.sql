-- Add missing Used Engines category
INSERT INTO public.categories (id, name, description, slug, is_active)
VALUES ('66666666-6666-6666-6666-666666666666', 'Used Engines', 'Quality pre-owned engines with warranty', 'used-engines', true)
ON CONFLICT (id) DO NOTHING;