/*
  # Add Admin Subscription

  1. Changes
    - Adds an active subscription for admin user (prince2jobs@gmail.com)
    - Sets up permanent access to premium features
  
  2. Notes
    - This is for development/testing purposes
    - The subscription will not expire
*/

-- First, get the user_id for prince2jobs@gmail.com
DO $$
DECLARE
  v_user_id text;
BEGIN
  -- Get the user_id from the users table
  SELECT user_id INTO v_user_id
  FROM users
  WHERE email = 'prince2jobs@gmail.com';

  -- Insert subscription if user exists
  IF v_user_id IS NOT NULL THEN
    INSERT INTO subscriptions (
      user_id,
      stripe_id,
      status,
      price_id,
      interval,
      currency,
      amount,
      current_period_start,
      current_period_end,
      created_at,
      updated_at,
      metadata
    )
    VALUES (
      v_user_id,
      'admin_sub_' || v_user_id,
      'active',
      'admin_price',
      'year',
      'gbp',
      0,
      EXTRACT(EPOCH FROM NOW())::bigint,
      EXTRACT(EPOCH FROM NOW() + INTERVAL '100 years')::bigint,
      NOW(),
      NOW(),
      jsonb_build_object(
        'type', 'admin',
        'notes', 'Permanent admin access'
      )
    )
    ON CONFLICT (stripe_id) DO NOTHING;
  END IF;
END;
$$;