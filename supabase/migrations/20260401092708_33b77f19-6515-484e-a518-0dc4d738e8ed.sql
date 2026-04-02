
-- Services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC NOT NULL DEFAULT 0,
  duration INTEGER NOT NULL DEFAULT 30,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Unique constraint to prevent double booking same date+time
CREATE UNIQUE INDEX idx_unique_booking ON public.appointments (date, time) WHERE status != 'cancelled';

-- RLS for services (public read, admin write via service role)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read services"
  ON public.services FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS for appointments (public insert, admin reads all)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert appointments"
  ON public.appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read appointments"
  ON public.appointments FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update appointments"
  ON public.appointments FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Seed initial services
INSERT INTO public.services (name, description, price, duration, active) VALUES
  ('Hair Cut', 'Professional haircut with styling', 30, 30, true),
  ('Beard Trim', 'Clean beard trim and shaping', 15, 20, true),
  ('Facial', 'Deep cleansing facial treatment', 45, 45, true),
  ('Hair Color', 'Full hair coloring service', 80, 90, true),
  ('Hair Spa', 'Relaxing hair spa treatment', 50, 60, true),
  ('Shave', 'Traditional clean shave', 12, 15, true);

-- Salon settings table
CREATE TABLE public.salon_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_enabled BOOLEAN NOT NULL DEFAULT true,
  closed_dates TEXT[] NOT NULL DEFAULT '{}',
  available_slots TEXT[] NOT NULL DEFAULT ARRAY['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'],
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.salon_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read settings"
  ON public.salon_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update settings"
  ON public.salon_settings FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Seed default settings
INSERT INTO public.salon_settings (booking_enabled) VALUES (true);
