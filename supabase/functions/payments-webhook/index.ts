import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.6.0?target=deno";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the stripe signature from headers
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      throw new Error('No stripe signature found');
    }

    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      throw new Error('Webhook secret not configured');
    }

    // Get the raw body
    const body = await req.text();
    console.log('Received webhook body:', body);

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Verify the webhook
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('⚠️ Webhook signature verification failed:', err.message);
      return new Response(
        JSON.stringify({ error: 'Webhook signature verification failed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
    );

    console.log('Processing webhook event:', event.type);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('Checkout session completed:', session);

        // Get subscription ID from the session
        const subscriptionId = session.subscription;
        if (!subscriptionId) {
          throw new Error('No subscription ID in session');
        }

        // Get user ID from metadata
        const userId = session.metadata?.user_id;
        if (!userId) {
          throw new Error('No user ID in session metadata');
        }

        // Create subscription record
        const { error: subscriptionError } = await supabaseClient
          .from('subscriptions')
          .upsert({
            user_id: userId,
            stripe_id: subscriptionId,
            status: 'active',
            price_id: session.metadata?.price_id,
            quantity: 1,
            cancel_at_period_end: false,
            created_at: new Date().toISOString(),
            current_period_start: new Date(session.created * 1000).toISOString(),
            current_period_end: new Date(session.expires_at * 1000).toISOString(),
            ended_at: null,
            cancel_at: null,
            canceled_at: null,
            trial_start: null,
            trial_end: null
          });

        if (subscriptionError) {
          console.error('Error creating subscription:', subscriptionError);
          throw subscriptionError;
        }

        break;
      }
      // Add other event handlers as needed
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});