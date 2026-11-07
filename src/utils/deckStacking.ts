// deckStacking.ts — GSAP ScrollTrigger Organic Editorial Section Transitions
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initSectionTransitions() {
  const sections = gsap.utils.toArray<HTMLElement>('.section-flow');
  if (!sections || sections.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Add subtle organic depth and parallax float as each varied section enters and leaves
  sections.forEach((sec, i) => {
    const nextSec = sections[i + 1];
    if (!nextSec) return;

    // As next section enters, gently relax the current section with subtle depth
    gsap.to(sec, {
      opacity: 0.88,
      y: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: nextSec,
        start: 'top bottom',
        end: 'top center',
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
    document.addEventListener('DOMContentLoaded', initSectionTransitions);
  } else {
    initSectionTransitions();
  }
}
