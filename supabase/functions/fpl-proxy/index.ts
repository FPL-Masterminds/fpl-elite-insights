import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const FPL_API_BASE = 'https://fantasy.premierleague.com/api';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// List of realistic browser User-Agents to rotate through
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15'
];

// Get a random User-Agent
const getRandomUserAgent = () => userAgents[Math.floor(Math.random() * userAgents.length)];

// Function to get session cookies
async function getSessionCookies() {
  const userAgent = getRandomUserAgent();
  
  // First visit the login page to get initial cookies
  const loginResponse = await fetch('https://users.premierleague.com', {
    headers: {
      'User-Agent': userAgent,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1'
    }
  });

  // Then visit the main FPL site to get additional cookies
  const mainPageResponse = await fetch('https://fantasy.premierleague.com', {
    headers: {
      'User-Agent': userAgent,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Cookie': loginResponse.headers.get('set-cookie') || ''
    }
  });

  const allCookies = [
    loginResponse.headers.get('set-cookie'),
    mainPageResponse.headers.get('set-cookie')
  ].filter(Boolean).join('; ');

  return {
    cookies: allCookies,
    userAgent
  };
}

serve(async (req) => {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
  }

  try {
    // Get the endpoint from the URL
    const url = new URL(req.url);
    const endpoint = url.searchParams.get('endpoint');

    if (!endpoint) {
      throw new Error('No endpoint specified');
    }

    const fullUrl = `${FPL_API_BASE}${endpoint}`;
    console.log('Fetching FPL data from:', fullUrl);

    // Get session cookies and user agent
    const { cookies, userAgent } = await getSessionCookies();
    
    // Add headers that FPL API expects
    const headers = {
      'User-Agent': userAgent,
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Referer': 'https://fantasy.premierleague.com/',
      'Origin': 'https://fantasy.premierleague.com',
      'Connection': 'keep-alive',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'Cookie': cookies
    };

    // Add a small random delay to mimic human behavior (between 1-3 seconds)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Fetch data from FPL API with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch(fullUrl, {
        headers,
        signal: controller.signal
      });
      
      clearTimeout(timeout);

      if (!response.ok) {
        console.error('FPL API error:', {
          status: response.status,
          statusText: response.statusText,
          url: fullUrl
        });
        
        throw new Error(`FPL API responded with status: ${response.status} (${response.statusText})`);
      }

      const data = await response.json();
      console.log('Successfully fetched data from FPL API');

      return new Response(
        JSON.stringify(data),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
          },
          status: 200 
        }
      );
    } catch (fetchError) {
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timed out after 30 seconds');
      }
      throw fetchError;
    }

  } catch (error) {
    console.error('Error in FPL proxy:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    return new Response(
      JSON.stringify({
        error: error.message,
        type: error.name,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.name === 'AbortError' ? 504 : 500
      }
    );
  }
});