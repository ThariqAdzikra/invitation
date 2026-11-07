// interactiveFoil.ts — Dynamic Gold Foil Specular Light & 3D Interactive Card Tilting
export function initInteractiveFoil() {
  const cards = document.querySelectorAll<HTMLElement>(
    '.interactive-foil-card, .luxury-card, .couple-profile-card, #master-event-card, .gift-card, .countdown-box'
  );

  cards.forEach((card) => {
    // Add foil overlay element if not exists
    if (!card.querySelector('.foil-overlay')) {
      const foil = document.createElement('div');
      foil.className = 'foil-overlay pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 opacity-0 z-20';
      foil.style.background = 'radial-gradient(380px circle at var(--foil-x, 50%) var(--foil-y, 50%), rgba(184, 147, 82, 0.18), transparent 70%)';
      card.style.position = 'relative';
      card.appendChild(foil);
    }

    const foilEl = card.querySelector<HTMLElement>('.foil-overlay');

    // 3D Perspective setup
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease';

    card.addEventListener('pointerenter', () => {
      if (foilEl) foilEl.style.opacity = '1';
    });

    card.addEventListener('pointermove', (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update light position
      card.style.setProperty('--foil-x', `${x}px`);
      card.style.setProperty('--foil-y', `${y}px`);

      // 3D Tilt calculation (max 6 degrees for subtle luxury feel)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;
    });

    card.addEventListener('pointerleave', () => {
      if (foilEl) foilEl.style.opacity = '0';
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
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
