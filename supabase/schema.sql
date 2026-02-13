-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Public profiles for users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text unique not null,
  full_name text,
  role text check (role in ('professional', 'patient')) not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- PATIENT DETAILS (Extended profile for patients including history & consent)
create table public.patient_details (
  id uuid references public.profiles(id) not null primary key,
  date_of_birth date,
  phone text,
  address text,
  emergency_contact jsonb, -- { name, phone, relation }
  medical_history jsonb, -- { surgeries, medications, allergies, conditions }
  consent_telemedicine boolean default false,
  consent_privacy boolean default false,
  updated_at timestamptz default now()
);

-- PLANS (The main clinical object)
create table public.plans (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.profiles(id) not null,
  professional_id uuid references public.profiles(id) not null,
  version integer default 1,
  title text not null,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- PLAN ITEMS (Exercises/Tasks within a plan)
create table public.plan_items (
  id uuid default uuid_generate_v4() primary key,
  plan_id uuid references public.plans(id) on delete cascade not null,
  title text not null,
  description text,
  dose text, -- e.g. "3x10 repetitions"
  video_url text, -- URL to reference video
  created_at timestamptz default now()
);

-- PLAN PROGRESS (Patient inputs for specific items)
create table public.plan_progress (
  id uuid default uuid_generate_v4() primary key,
  plan_item_id uuid references public.plan_items(id) not null,
  patient_id uuid references public.profiles(id) not null,
  completed_at timestamptz default now(),
  pain_level integer check (pain_level >= 0 and pain_level <= 10),
  comments text,
  video_evidence_url text
);

-- CONSULTATIONS
create table public.consultations (
  id uuid default uuid_generate_v4() primary key,
  professional_id uuid references public.profiles(id) not null,
  patient_id uuid references public.profiles(id) not null,
  scheduled_at timestamptz not null,
  status text check (status in ('scheduled', 'completed', 'cancelled')) default 'scheduled',
  meeting_link text,
  created_at timestamptz default now()
);

-- AVAILABILITY (Professional schedule slots)
create table public.availability (
  id uuid default uuid_generate_v4() primary key,
  professional_id uuid references public.profiles(id) not null,
  day_of_week integer check (day_of_week between 0 and 6), -- 0 = Sunday
  start_time time not null,
  end_time time not null,
  is_recurring boolean default true,
  specific_date date, -- For one-off availability
  created_at timestamptz default now()
);

-- MESSAGES
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  sender_id uuid references public.profiles(id) not null,
  receiver_id uuid references public.profiles(id) not null,
  content text,
  attachments text[], -- Array of URLs
  is_read boolean default false,
  created_at timestamptz default now()
);

-- RLS POLICIES (Placeholder - strict security should be enabled)
alter table public.profiles enable row level security;
alter table public.plans enable row level security;
alter table public.plan_items enable row level security;
alter table public.plan_progress enable row level security;
alter table public.consultations enable row level security;
alter table public.messages enable row level security;

-- Simple policies for dev (allow read/write for authenticated users for now, refine later)
create policy "Allow authenticated read access" on public.profiles for select using (auth.role() = 'authenticated');
create policy "Allow individual insert/update own profile" on public.profiles for insert with check (auth.uid() = id);
