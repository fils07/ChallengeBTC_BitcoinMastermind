// Incrémenter automatiquement le compteur
fetch('/api/counter', { method: 'POST' })
  .catch(err => console.log('API non disponible'));
