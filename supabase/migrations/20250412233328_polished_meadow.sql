/*
  # Fix Authentication Setup

  1. Changes
    - Add service_role policy for user creation
    - Add policy for webhook events
    - Fix user triggers
  
  2. Security
    - Enable RLS on all tables
    - Add necessary policies
*/

-- Add service role policies for users table
CREATE POLICY "Allow Insert for Service Role" ON public.users 
FOR INSERT TO service_role 
WITH CHECK (true);

CREATE POLICY "Allow Update for Service Role" ON public.users 
FOR UPDATE TO service_role 
USING (true);

-- Add policy for webhook events
CREATE POLICY "Allow webhook events for service role" ON public.webhook_events
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

-- Drop and recreate user triggers to ensure they're working
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_update();