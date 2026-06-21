export default async (req, context) => {
  const ORS_KEY = process.env.ORS_KEY;

  const body = await req.text();

  const response = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
    method: 'POST',
    headers: {
      'Authorization': ORS_KEY,
      'Content-Type': 'application/json',
    },
    body,
  });

  const data = await response.text();
  return new Response(data, {
    status: response.status,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const config = { path: '/api/routing' };
