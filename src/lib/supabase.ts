import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database schema for reference:
/*
create table analytics (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  object_detection jsonb,
  activity_recognition jsonb,
  anomaly_detection jsonb,
  device_id uuid references devices(id),
  officer_id uuid references officers(id)
);

create table devices (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  type text not null,
  status text not null,
  battery_level integer,
  signal_strength integer,
  connection_type text not null,
  stream_url text,
  ble_id text
);

create table officers (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  badge_number text not null,
  department text not null
);

create table stream_connections (
  id uuid default uuid_generate_v4() primary key,
  url text not null,
  status text not null,
  last_ping timestamp with time zone default timezone('utc'::text, now()) not null
);
*/