(function () {
  function fallbackImage(title) {
    const label = String(title || 'Aetheris').replace(/[<>]/g, '').slice(0, 40);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0b0d12"/><stop offset="100%" stop-color="#4a1623"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><rect x="80" y="80" width="1040" height="640" fill="none" stroke="#d9b36d" stroke-opacity="0.35"/><text x="600" y="390" fill="#f0cd88" text-anchor="middle" font-family="Georgia,serif" font-size="36">${label}</text><text x="600" y="435" fill="#c8cfdb" text-anchor="middle" font-family="Arial,sans-serif" font-size="16">Image unavailable - fallback visual</text></svg>`;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach((img) => {
      const inHero = img.closest('.hero-art, .hero');
      if (!img.getAttribute('loading') && !inHero) {
        img.setAttribute('loading', 'lazy');
      }
      img.addEventListener('error', () => {
        if (img.dataset.fallbackDone === '1') return;
        img.dataset.fallbackDone = '1';
        img.src = fallbackImage(img.alt || 'Aetheris Visual');
      });
    });
  });
})();
