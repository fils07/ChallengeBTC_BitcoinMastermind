function detectPhoneBrand() {
  const userAgent = navigator.userAgent || '';

  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return 'Apple';
  }

  if (/Samsung|Galaxy/i.test(userAgent)) {
    return 'Samsung';
  }

  if (/Pixel|Android/i.test(userAgent)) {
    return 'Android';
  }

  if (/Xiaomi|Redmi|POCO/i.test(userAgent)) {
    return 'Xiaomi';
  }

  if (/OnePlus/i.test(userAgent)) {
    return 'OnePlus';
  }

  if (/Huawei|Honor/i.test(userAgent)) {
    return 'Huawei';
  }

  if (/Oppo|Vivo/i.test(userAgent)) {
    return 'Oppo/Vivo';
  }

  return 'Inconnu';
}

// Incrémenter automatiquement le compteur avec la marque détectée
const brand = detectPhoneBrand();

fetch('/api/counter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ brand })
}).catch(err => console.log('API non disponible', err));
