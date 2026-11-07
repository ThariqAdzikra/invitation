// interactiveFoil.ts — Subtle Metallic Foil Specular Sheen (Flat & Completely Stable — Zero 3D Tilt)
export function initInteractiveFoil() {
  const cards = document.querySelectorAll<HTMLElement>(
    '.interactive-foil-card, .luxury-card, .couple-profile-card, #master-event-card, .gift-card, .countdown-box'
  );

  cards.forEach((card) => {
    // Add foil overlay element if not exists
    if (!card.querySelector('.foil-overlay')) {
      const foil = document.createElement('div');
      foil.className = 'foil-overlay pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 opacity-0 z-20';
      foil.style.background = 'radial-gradient(360px circle at var(--foil-x, 50%) var(--foil-y, 50%), rgba(184, 147, 82, 0.10), transparent 70%)';
      card.style.position = 'relative';
      card.appendChild(foil);
    }

    const foilEl = card.querySelector<HTMLElement>('.foil-overlay');

    // Cards remain 100% flat, stationary and grounded — no 3D tilt
    card.style.transform = 'none';

    card.addEventListener('pointerenter', () => {
      if (foilEl) foilEl.style.opacity = '1';
    });

    card.addEventListener('pointermove', (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update specular highlight position smoothly without moving or tilting the card
      card.style.setProperty('--foil-x', `${x}px`);
      card.style.setProperty('--foil-y', `${y}px`);
    });

    card.addEventListener('pointerleave', () => {
      if (foilEl) foilEl.style.opacity = '0';
      card.style.transform = 'none';
    });
  });
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractiveFoil);
  } else {
    initInteractiveFoil();
  }
}

