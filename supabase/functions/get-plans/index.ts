import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.6.0?target=deno";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
  }

  try {
    // Get Stripe key and validate
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('Stripe key is not configured');
    }

    // Create Stripe instance
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // First get active products
    const products = await stripe.products.list({
      active: true,
      limit: 1,
      type: 'service'
    });

    if (!products.data.length) {
      throw new Error('No active products found');
    }

    // Get prices for the active product
    const prices = await stripe.prices.list({
      active: true,
      product: products.data[0].id,
      type: 'recurring',
      recurring: { interval: 'month' },
      limit: 1
    });

    // Check if we have any prices
    if (!prices.data.length) {
      throw new Error('No active prices found for the product');
    }

    // Return just the monthly price
    return new Response(
      JSON.stringify(prices.data),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        status: 200
      }
    );

  } catch (error) {
    // Log the error for debugging
    console.error('Error in get-plans:', {
      message: error.message,
      stack: error.stack,
      type: error.type
    });

    // Return a user-friendly error
    return new Response(
      JSON.stringify({
        error: 'Failed to get subscription plans',
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 200 // Return 200 to handle errors in frontend
      }
    );
  }
});