-- Create admin users table for role-based access
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin',
  permissions JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on admin users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Admin users can manage their own records
CREATE POLICY "Admin users can view their own record" ON public.admin_users
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admin users can update their own record" ON public.admin_users
  FOR UPDATE USING (auth.uid() = user_id);

-- Create function to check admin access
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = _user_id
      AND is_active = true
  )
$$;

-- Update products table policies for admin access
CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (public.is_admin(auth.uid()));

-- Update categories table policies for admin access
CREATE POLICY "Admins can manage categories" ON public.categories
  FOR ALL USING (public.is_admin(auth.uid()));

-- Create website settings table for content management
CREATE TABLE public.website_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on website settings
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- Public can read website settings
CREATE POLICY "Website settings are viewable by everyone" ON public.website_settings
  FOR SELECT USING (true);

-- Only admins can manage website settings
CREATE POLICY "Admins can manage website settings" ON public.website_settings
  FOR ALL USING (public.is_admin(auth.uid()));

-- Create storage bucket for admin uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('admin-uploads', 'admin-uploads', true);

-- Create storage policies for admin uploads
CREATE POLICY "Admins can upload files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'admin-uploads' AND 
    public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can view uploaded files" ON storage.objects
  FOR SELECT USING (bucket_id = 'admin-uploads');

CREATE POLICY "Admins can update uploaded files" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'admin-uploads' AND 
    public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can delete uploaded files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'admin-uploads' AND 
    public.is_admin(auth.uid())
  );

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_website_settings_updated_at
  BEFORE UPDATE ON public.website_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();