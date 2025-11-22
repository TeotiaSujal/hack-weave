-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  bio TEXT,
  skills TEXT[] DEFAULT '{}',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create teams table
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  hackathon_id TEXT,
  hackathon_name TEXT,
  leader_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  max_members INTEGER DEFAULT 5,
  open_roles TEXT[] DEFAULT '{}',
  required_skills TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on teams
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- Teams policies
CREATE POLICY "Teams are viewable by everyone"
  ON public.teams FOR SELECT
  USING (true);

CREATE POLICY "Team leaders can create teams"
  ON public.teams FOR INSERT
  WITH CHECK (auth.uid() = leader_id);

CREATE POLICY "Team leaders can update own teams"
  ON public.teams FOR UPDATE
  USING (auth.uid() = leader_id);

CREATE POLICY "Team leaders can delete own teams"
  ON public.teams FOR DELETE
  USING (auth.uid() = leader_id);

-- Create team_members table
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Enable RLS on team_members
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Team members policies
CREATE POLICY "Team members are viewable by everyone"
  ON public.team_members FOR SELECT
  USING (true);

CREATE POLICY "Users can join teams"
  ON public.team_members FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave teams"
  ON public.team_members FOR DELETE
  USING (auth.uid() = user_id);

-- Create team_join_requests table
CREATE TABLE public.team_join_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Enable RLS on team_join_requests
ALTER TABLE public.team_join_requests ENABLE ROW LEVEL SECURITY;

-- Team join requests policies
CREATE POLICY "Join requests are viewable by team leaders and requesters"
  ON public.team_join_requests FOR SELECT
  USING (
    auth.uid() = user_id OR 
    auth.uid() IN (SELECT leader_id FROM public.teams WHERE id = team_id)
  );

CREATE POLICY "Users can create join requests"
  ON public.team_join_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own join requests"
  ON public.team_join_requests FOR DELETE
  USING (auth.uid() = user_id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER teams_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();