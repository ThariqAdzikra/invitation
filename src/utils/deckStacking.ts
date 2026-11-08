// deckStacking.ts — GSAP ScrollTrigger 3D Perspective Architectural Section Transitions
// Delivers a non-standard, ultra-luxurious 3D deck stacking & perspective depth transition
// between UnifiedEvent, Location Sanctuary, and Closing Grand Finale.

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

  // Establish 3D spatial perspective on parent section stages
  [eventsSec, locationSec, closingSec].forEach(sec => {
    gsap.set(sec, {
      perspective: 1400,
      transformStyle: 'preserve-3d',
    });
  });

  // =========================================================================
  // TRANSITION 1: UnifiedEvent (#events) -> Location (#location)
  // Outgoing: #master-event-card recedes back into 3D horizon (scale down, tilt, soft blur)
  // Incoming: #venue-sanctuary-stele ascends smoothly from depth into crisp focus
  // =========================================================================
  if (masterEventCard) {
    gsap.to(masterEventCard, {
      scale: 0.93,
      z: -100,
      rotationX: 3.5,
      opacity: 0.42,
      filter: 'blur(1.5px) brightness(0.96)',
      ease: 'power1.out',
      scrollTrigger: {
        trigger: locationSec,
        start: 'top bottom',
        end: 'top 25%',
        scrub: 1.2,
      }
    });
  }

  if (venueCard) {
    gsap.fromTo(venueCard, 
      {
        y: 75,
        scale: 0.96,
        opacity: 0.70,
        filter: 'blur(1px)',
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power1.out',
        scrollTrigger: {
          trigger: locationSec,
          start: 'top 92%',
          end: 'top 28%',
          scrub: 1.2,
        }
      }
    );
  }

  // =========================================================================
  // TRANSITION 2: Location (#location) -> Closing (#closing)
  // Outgoing: #venue-sanctuary-stele recedes back into 3D depth
  // Incoming: .closing-content blossoms into view with warm twilight ambiance
  // =========================================================================
  if (venueCard) {
    gsap.to(venueCard, {
      scale: 0.93,
      z: -100,
      rotationX: 3.5,
      opacity: 0.42,
      filter: 'blur(1.5px) brightness(0.96)',
      ease: 'power1.out',
      scrollTrigger: {
        trigger: closingSec,
        start: 'top bottom',
        end: 'top 25%',
        scrub: 1.2,
      }
    });
  }

  if (closingContent) {
    gsap.fromTo(closingContent,
      {
        y: 65,
        scale: 0.96,
        opacity: 0.65,
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: closingSec,
          start: 'top 88%',
          end: 'top 32%',
          scrub: 1.2,
        }
      }
    );
  }

  // =========================================================================
  // MULTI-PLANE PARALLAX 3D: NATURE DESCENT STAGE CHOREOGRAPHY
  // Canopy Boughs (1.35x speed), River Stream (1.25x speed), Sunset Lake (0.85x)
  // =========================================================================
  const natureStage = document.getElementById('nature-descent-stage');
  const canopyLayer = document.getElementById('nature-canopy-layer');
  const riverLayer = document.getElementById('nature-river-layer');
  const lakeLayer = document.getElementById('nature-lake-layer');

  if (natureStage) {
    // 1. Canopy Boughs Parallax: Emerges as user leaves the sky tunnel, gliding down at 1.35x speed
    if (canopyLayer && eventsSec) {
      gsap.to(canopyLayer, {
        y: 160,
        ease: 'none',
        scrollTrigger: {
          trigger: eventsSec,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        }
      });
    }

    // 2. Meandering River Stream: Courses down smoothly with natural multi-plane depth
    if (riverLayer && eventsSec && closingSec) {
      gsap.fromTo(riverLayer,
        { y: -60 },
        {
          y: 90,
          ease: 'none',
          scrollTrigger: {
            trigger: eventsSec,
            start: 'top bottom',
            endTrigger: closingSec,
            end: 'bottom bottom',
            scrub: 1.0,
          }
        }
      );
    }

    // 3. Sunset Lake Surface: Rises gently to meet the sun and romantic swans in #closing
    if (lakeLayer && closingSec) {
      gsap.fromTo(lakeLayer,
        { y: 70, opacity: 0.65 },
        {
          y: 0,
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: closingSec,
            start: 'top 85%',
            end: 'bottom bottom',
            scrub: 1.2,
          }
        }
      );
    }
  }

  // Secondary handling for any other .section-flow elements
  const otherSections = gsap.utils.toArray<HTMLElement>('.section-flow');
  otherSections.forEach((sec, i) => {
    const nextSec = otherSections[i + 1];
    if (!nextSec) return;
    gsap.to(sec, {
      opacity: 0.85,
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
