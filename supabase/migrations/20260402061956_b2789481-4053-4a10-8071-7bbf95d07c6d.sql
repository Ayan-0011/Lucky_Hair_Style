
-- Create admins table
CREATE TABLE public.admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE
);

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Only authenticated users who are admins can read the admins table
CREATE OR REPLACE FUNCTION public.is_admin(_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admins WHERE email = _email
  )
$$;

CREATE POLICY "Only admins can read admins table"
ON public.admins FOR SELECT
TO authenticated
USING (public.is_admin(auth.email()));

-- Update services policies: allow admin to insert, update, delete
CREATE POLICY "Admins can insert services"
ON public.services FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.email()));

CREATE POLICY "Admins can update services"
ON public.services FOR UPDATE
TO authenticated
USING (public.is_admin(auth.email()))
WITH CHECK (public.is_admin(auth.email()));

CREATE POLICY "Admins can delete services"
ON public.services FOR DELETE
TO authenticated
USING (public.is_admin(auth.email()));

-- Drop the overly permissive appointment update policy
DROP POLICY IF EXISTS "Anyone can update appointments" ON public.appointments;

-- Only admins can update appointments
CREATE POLICY "Admins can update appointments"
ON public.appointments FOR UPDATE
TO authenticated
USING (public.is_admin(auth.email()))
WITH CHECK (public.is_admin(auth.email()));

-- Only admins can delete appointments
CREATE POLICY "Admins can delete appointments"
ON public.appointments FOR DELETE
TO authenticated
USING (public.is_admin(auth.email()));
