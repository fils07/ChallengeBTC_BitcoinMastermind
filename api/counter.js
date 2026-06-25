// État global persistent pendant la durée de vie de cette fonction
let clickCount = 0;
const brandCounts = {};

function parseBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch (error) {
      return {};
    }
  }

  return {};
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const body = parseBody(req);

  // POST = incrémenter
  if (req.method === 'POST') {
    clickCount++;
    const brandName = typeof body.brand === 'string' && body.brand.trim()
      ? body.brand.trim()
      : 'Inconnu';

    brandCounts[brandName] = (brandCounts[brandName] || 0) + 1;
    console.log(`✓ Visite enregistrée! Total: ${clickCount}, Marque: ${brandName}`);
    res.status(200).json({ count: clickCount, brands: { ...brandCounts } });
  }
  // GET = lire
  else if (req.method === 'GET') {
    console.log(`→ Compteur demandé. Total: ${clickCount}`);
    res.status(200).json({ count: clickCount, brands: { ...brandCounts } });
  }
  else {
    res.status(405).end();
  }
}
