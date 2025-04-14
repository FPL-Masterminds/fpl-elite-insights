/*
  # Fix User Policies
  
  1. Changes
    - Adds uniquely named policies for user data management
    - Ensures users can insert and update their own data
    - Adds subscription table policies
  
  2. Security
    - Users can only manage their own data
    - Maintains existing service role policies
*/

-- Drop existing policies if they exist
DO $$
BEGIN
    -- Drop user insert policy if it exists
    IF EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'users'
        AND policyname = 'Allow insert for authenticated users'
    ) THEN
        DROP POLICY "Allow insert for authenticated users" ON public.users;
    END IF;
END
$$;

-- Add uniquely named policies
CREATE POLICY "users_insert_own_data" ON public.users
FOR INSERT TO authenticated
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "users_update_own_data" ON public.users
FOR UPDATE TO authenticated
USING (auth.uid()::text = user_id);

CREATE POLICY "subscriptions_insert_own_data" ON public.subscriptions
FOR INSERT TO authenticated
WITH CHECK (auth.uid()::text = user_id);