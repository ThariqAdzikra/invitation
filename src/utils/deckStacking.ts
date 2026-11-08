// deckStacking.ts — Architectural Section Transitions & Depth Perspective
// Ensures 100% crystal-clear readability for Event, Venue Sanctuary, and Closing Grand Finale.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initSectionTransitions() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const eventsSec = document.getElementById('events');
  const locationSec = document.getElementById('location');
  const closingSec = document.getElementById('closing');

  const masterEventCard = document.getElementById('master-event-card');
  const venueCard = document.getElementById('venue-sanctuary-stele');
  const closingContent = document.querySelector('.closing-content') as HTMLElement;

  if (!eventsSec || !locationSec || !closingSec) return;

  // Establish spatial depth perspective on parent sections
  [eventsSec, locationSec, closingSec].forEach(sec => {
    gsap.set(sec, {
      perspective: 1200,
      transformStyle: 'preserve-3d',
    });
  });

  // Ensure all cards are crystal clear and fully opaque by default
  if (masterEventCard) {
    gsap.set(masterEventCard, { opacity: 1, filter: 'none', transformOrigin: 'center center' });
    
    // Smooth subtle parallax depth only as Location enters the upper screen
    gsap.to(masterEventCard, {
      scale: 0.97,
      y: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: locationSec,
        start: 'top 50%',
        end: 'top top',
        scrub: 1,
      }
    });
  }

  // Venue Sanctuary Card: Enters with graceful elevation, settling into 100% crisp focus
  if (venueCard) {
    gsap.fromTo(venueCard, 
      {
        y: 40,
        opacity: 0.85,
      },
      {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: locationSec,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 1,
        }
      }
    );

    // Subtle gentle exit parallax when moving into Closing
    gsap.to(venueCard, {
      scale: 0.97,
      y: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: closingSec,
        start: 'top 50%',
        end: 'top top',
        scrub: 1,
      }
    });
  }

  // Closing Content: Smoothly blossoms into warm twilight ambiance
  if (closingContent) {
    gsap.fromTo(closingContent,
      {
        y: 35,
        opacity: 0.85,
      },
      {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: closingSec,
          start: 'top 85%',
          end: 'top 45%',
          scrub: 1,
        }
      }
    );
  }

  // Re-calculate ScrollTrigger metrics on invitation opening or resize
  window.addEventListener('invitationOpened', () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSectionTransitions);
  } else {
    initSectionTransitions();
  }
}
