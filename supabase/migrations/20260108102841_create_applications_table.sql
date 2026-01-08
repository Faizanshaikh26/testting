BEGIN;

CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    design_category TEXT NOT NULL,
    portfolio_link TEXT,
    resume_url TEXT NOT NULL,
    portfolio_images TEXT[] DEFAULT '{}' NOT NULL,
    answer_collection TEXT NOT NULL,
    answer_project TEXT NOT NULL,
    answer_inspiration TEXT NOT NULL,
    score INTEGER DEFAULT 0,
    label TEXT DEFAULT 'Average',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'selected', 'rejected'))
);

-- Enable RLS
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the application form)
CREATE POLICY "Allow anonymous inserts" ON public.applications
    FOR INSERT TO anon
    WITH CHECK (true);

-- Admin policies will be added in the next step with JWT auth

COMMIT;
