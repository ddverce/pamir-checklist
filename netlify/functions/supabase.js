export default async (req, context) => {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  const url = new URL(req.url);
  const path = url.searchParams.get('path') || '';
  const targetUrl = SUPABASE_URL + path;

  const body = req.method !== 'GET' ? await req.text() : undefined;

  const response = await fetch(targetUrl, {
    method: req.method,
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json',
      'Prefer': req.headers.get('Prefer') || 'return=minimal',
    },
    body,
  });

  const data = await response.text();
  return new Response(data, {
    status: response.status,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const config = { path: '/api/supabase' };
