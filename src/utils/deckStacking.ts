// deckStacking.ts — GSAP ScrollTrigger Parallax Layered Card Deck Stacking Engine
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initDeckStacking() {
  const cards = gsap.utils.toArray<HTMLElement>('.stacked-deck-card');
  if (!cards || cards.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Animate each card as the NEXT card scrolls up and layers over it
  cards.forEach((card, i) => {
    const nextCard = cards[i + 1];
    if (!nextCard) return;

    gsap.to(card, {
      scale: 0.96,
      opacity: 0.82,
      y: 28,
      ease: 'none',
      scrollTrigger: {
        trigger: nextCard,
        start: 'top bottom',
        end: 'top top+=90',
        scrub: 1.2,
      }
    });
  });

  // Re-calculate ScrollTrigger metrics when envelope opens or screen resizes
  window.addEventListener('invitationOpened', () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDeckStacking);
  } else {
    initDeckStacking();
  }
}
