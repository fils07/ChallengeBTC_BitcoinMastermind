// État global persistent pendant la durée de vie de cette fonction
let clickCount = 0;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // POST = incrémenter
  if (req.method === 'POST') {
    clickCount++;
    console.log(`✓ Click enregistré! Total: ${clickCount}`);
    res.status(200).json({ count: clickCount });
  }
  // GET = lire
  else if (req.method === 'GET') {
    console.log(`→ Compteur demandé. Total: ${clickCount}`);
    res.status(200).json({ count: clickCount });
  }
  else {
    res.status(405).end();
  }
}
