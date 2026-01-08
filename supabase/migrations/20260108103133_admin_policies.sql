BEGIN;

-- Add policy for admins to read applications
CREATE POLICY "Allow authenticated admins to read applications" ON public.applications
    FOR SELECT TO authenticated
    USING (true);

-- Add policy for admins to update applications (for scoring/status)
CREATE POLICY "Allow authenticated admins to update applications" ON public.applications
    FOR UPDATE TO authenticated
    USING (true);

COMMIT;
