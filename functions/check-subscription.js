const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async function (event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }

  try {
    const email = event.queryStringParameters.email;
    if (!email) throw new Error('Email is required');

    const { data, error } = await supabase
      .from('users')
      .select('subscription')
      .eq('token_identifier', email)
      .maybeSingle(); // ✅ handles zero or one result gracefully

    if (error) throw error;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ active: data?.subscription === 'active' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
