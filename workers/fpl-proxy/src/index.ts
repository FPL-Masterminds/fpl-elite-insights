const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
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

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    try {
      const url = new URL(request.url);
      const endpoint = url.pathname.replace('/api', '');
      
      if (!endpoint) {
        throw new Error('No endpoint specified');
      }

      const userAgent = getRandomUserAgent();
      const fullUrl = `${env.FPL_API_BASE}${endpoint}`;

      // Add headers that FPL API expects
      const headers = {
        'User-Agent': userAgent,
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://fantasy.premierleague.com/',
        'Origin': 'https://fantasy.premierleague.com',
        'Connection': 'keep-alive'
      };

      // Add a small random delay (100-300ms)
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));

      const response = await fetch(fullUrl, { headers });

      if (!response.ok) {
        throw new Error(`FPL API responded with status: ${response.status}`);
      }

      const data = await response.json();

      // Return the data with CORS headers and caching
      return new Response(JSON.stringify(data), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
        }
      });

    } catch (error) {
      return new Response(
        JSON.stringify({
          error: error.message,
          timestamp: new Date().toISOString()
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: 500
        }
      );
    }
  }
};