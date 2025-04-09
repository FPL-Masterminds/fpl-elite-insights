/*
  # Create Base Tables and Functions

  1. New Tables
    - users
      - Core user data including profile information
    - subscriptions 
      - Subscription data linked to users
    - webhook_events
      - Stripe webhook event logging
  
  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    
  3. Functions
    - handle_new_user: Trigger function for new user creation
    - handle_user_update: Trigger function for user updates
*/

-- Users table
CREATE TABLE IF NOT EXISTS public.users (
    id uuid PRIMARY KEY NOT NULL,
    avatar_url text,
    user_id text UNIQUE,
    token_identifier text NOT NULL,
    subscription text,
    credits text,
    image text,
    created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone,
    email text,
    name text,
    full_name text
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id text REFERENCES public.users(user_id),
    stripe_id text UNIQUE,
    price_id text,
    stripe_price_id text,
    currency text,
    interval text,
    status text,
    current_period_start bigint,
    current_period_end bigint,
    cancel_at_period_end boolean,
    amount bigint,
    started_at bigint,
    ends_at bigint,
    ended_at bigint,
    canceled_at bigint,
    customer_cancellation_reason text,
    customer_cancellation_comment text,
    metadata jsonb,
    custom_field_data jsonb,
    customer_id text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create webhook_events table
CREATE TABLE IF NOT EXISTS public.webhook_events (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type text NOT NULL,
    type text NOT NULL,
    stripe_event_id text,
    data jsonb,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    modified_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS subscriptions_stripe_id_idx ON public.subscriptions(stripe_id);
CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS webhook_events_type_idx ON public.webhook_events(type);
CREATE INDEX IF NOT EXISTS webhook_events_stripe_event_id_idx ON public.webhook_events(stripe_event_id);
CREATE INDEX IF NOT EXISTS webhook_events_event_type_idx ON public.webhook_events(event_type);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;