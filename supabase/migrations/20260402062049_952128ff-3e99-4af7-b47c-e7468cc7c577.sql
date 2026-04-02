
DROP POLICY IF EXISTS "Anyone can update settings" ON public.salon_settings;

CREATE POLICY "Admins can update settings"
ON public.salon_settings FOR UPDATE
TO authenticated
USING (public.is_admin(auth.email()))
WITH CHECK (public.is_admin(auth.email()));
