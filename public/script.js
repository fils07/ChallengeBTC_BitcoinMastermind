function detectPhoneBrand() {
  const userAgent = navigator.userAgent || '';

  if (typeof window !== 'undefined' && window.UAParser) {
    try {
      const parser = new window.UAParser(userAgent);
      const result = parser.getResult();
      const vendor = result.device && result.device.vendor ? result.device.vendor : '';
      const model = result.device && result.device.model ? result.device.model : '';
      const osName = result.os && result.os.name ? result.os.name : '';

      if (vendor && model) {
        return `${vendor} ${model}`;
      }

      if (vendor) {
        return vendor;
      }

      if (model) {
        return model;
      }

      if (osName === 'iOS') {
        return 'iPhone';
      }

      if (osName === 'Android') {
        return 'Android';
      }
    } catch (error) {
      console.warn('UAParser indisponible, fallback activé', error);
    }
  }

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
