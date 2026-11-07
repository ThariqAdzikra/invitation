// interactiveFoil.ts — Dynamic Gold Foil Specular Light Sheen for Luxury Cards
export function initInteractiveFoil() {
  const cards = document.querySelectorAll<HTMLElement>('.luxury-card, .couple-profile-card, #master-event-card, .gift-card');

  cards.forEach((card) => {
    // Add foil overlay element if not exists
    if (!card.querySelector('.foil-overlay')) {
      const foil = document.createElement('div');
      foil.className = 'foil-overlay pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500 opacity-0';
      foil.style.background = 'radial-gradient(350px circle at var(--foil-x, 50%) var(--foil-y, 50%), rgba(184, 147, 82, 0.16), transparent 65%)';
      card.style.position = 'relative';
      card.appendChild(foil);
    }

    const foilEl = card.querySelector<HTMLElement>('.foil-overlay');

    card.addEventListener('pointerenter', () => {
      if (foilEl) foilEl.style.opacity = '1';
    });

    card.addEventListener('pointermove', (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--foil-x', `${x}px`);
      card.style.setProperty('--foil-y', `${y}px`);
    });

    card.addEventListener('pointerleave', () => {
      if (foilEl) foilEl.style.opacity = '0';
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
