-- Enable PostGIS for geospatial queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('parent', 'school_admin', 'security', 'traveler', 'super_admin')),
  full_name TEXT NOT NULL,
  phone TEXT,
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'family', 'premium')),
  location_sharing_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Incidents table
CREATE TABLE public.incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('robbery', 'kidnapping', 'accident', 'violence', 'suspicious_activity', 'harassment', 'other')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  title TEXT NOT NULL,
  description TEXT,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address TEXT,
  images TEXT[],
  verified BOOLEAN DEFAULT false,
  anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create spatial index on incidents
CREATE INDEX incidents_location_idx ON public.incidents USING GIST (location);

-- Schools table
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  admin_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  phone TEXT NOT NULL,
  email TEXT,
  verified BOOLEAN DEFAULT false,
  subscription_tier TEXT NOT NULL DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Students table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  grade TEXT,
  parent_user_ids UUID[] NOT NULL,
  pickup_authorized_users TEXT[],
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Check-ins table
CREATE TABLE public.check_ins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  check_in_time TIMESTAMPTZ,
  check_out_time TIMESTAMPTZ,
  checked_in_by TEXT,
  checked_out_by TEXT,
  pickup_person TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bus tracking table
CREATE TABLE public.bus_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  bus_number TEXT NOT NULL,
  driver_name TEXT,
  location GEOGRAPHY(POINT, 4326),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  status TEXT DEFAULT 'inactive' CHECK (status IN ('active', 'inactive')),
  student_ids UUID[],
  route TEXT,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- User locations table (for live tracking)
CREATE TABLE public.user_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  accuracy DECIMAL(10, 2),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX user_locations_user_id_idx ON public.user_locations(user_id);

-- Trips table
CREATE TABLE public.trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  start_location GEOGRAPHY(POINT, 4326) NOT NULL,
  end_location GEOGRAPHY(POINT, 4326) NOT NULL,
  start_latitude DECIMAL(10, 8) NOT NULL,
  start_longitude DECIMAL(11, 8) NOT NULL,
  end_latitude DECIMAL(10, 8) NOT NULL,
  end_longitude DECIMAL(11, 8) NOT NULL,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'active', 'completed', 'emergency')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  share_token TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transport companies table
CREATE TABLE public.transport_companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  routes TEXT[],
  rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  incidents_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('incident', 'checkin', 'checkout', 'sos', 'alert', 'subscription')),
  read BOOLEAN DEFAULT false,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX notifications_user_id_idx ON public.notifications(user_id);
CREATE INDEX notifications_read_idx ON public.notifications(read);

-- Subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('free', 'family', 'premium')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled')),
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  auto_renew BOOLEAN DEFAULT true,
  payment_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bus_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: Can read own data, super_admin can read all
CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Super admin can read all users" ON public.users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Incidents: Anyone authenticated can read, users can insert, admins can update
CREATE POLICY "Anyone can read incidents" ON public.incidents
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create incidents" ON public.incidents
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Super admin can update incidents" ON public.incidents
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'super_admin')
  );

-- User locations: Users can update own, super_admin can read all
CREATE POLICY "Users can update own location" ON public.user_locations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own location" ON public.user_locations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Super admin can read all locations" ON public.user_locations
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Notifications: Users can read own
CREATE POLICY "Users can read own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Add more RLS policies as needed for other tables...
