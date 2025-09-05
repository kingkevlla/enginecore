-- Create the missing "all-products" category
INSERT INTO public.categories (
  id,
  name,
  description,
  slug,
  is_active,
  sort_order
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'All Products',
  'Complete selection of all automotive engines, parts, and accessories',
  'all-products',
  true,
  0
) ON CONFLICT (slug) DO NOTHING;