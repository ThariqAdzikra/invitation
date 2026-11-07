// kineticVelocity.ts — Kinetic Scroll Velocity Skew & Ticker Acceleration Engine
import gsap from 'gsap';

export function initKineticVelocity() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const lenis = (window as any).__lenis;
  if (!lenis) {
    // Retry once Lenis has initialized
    setTimeout(initKineticVelocity, 250);
    return;
  }

  const targets = document.querySelectorAll<HTMLElement>('.kinetic-velocity-target');
  const tickers = document.querySelectorAll<HTMLElement>('.kinetic-ticker-track');

  let currentSkew = 0;
  let targetSkew = 0;
  let tickerOffset = 0;
  const baseTickerSpeed = 0.35;

  lenis.on('scroll', (e: { velocity: number }) => {
    // Clamp velocity skew between -4.5deg and 4.5deg for subtle haute-couture motion
    targetSkew = Math.max(-4.5, Math.min(4.5, e.velocity * 0.12));
    // Accelerate ticker in direction of scroll
    tickerOffset += e.velocity * 0.35;
  });

  // GSAP Ticker for 60fps buttery-smooth lerp & continuous track motion
  gsap.ticker.add(() => {
    // Lerp skew with smooth damping
    currentSkew += (targetSkew - currentSkew) * 0.12;
    targetSkew *= 0.88; // decay to 0

    if (Math.abs(currentSkew) > 0.005) {
      targets.forEach((el) => {
        el.style.setProperty('--velocity-skew', `${currentSkew.toFixed(3)}deg`);
      });
    }

    // Advance kinetic ticker ribbon
    if (tickers.length > 0) {
      tickerOffset += baseTickerSpeed;
      if (tickerOffset < 0) tickerOffset += 50000;
      tickers.forEach((t) => {
        t.style.transform = `translate3d(-${(tickerOffset % 50).toFixed(3)}%, 0, 0)`;
      });
    }
  });
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKineticVelocity);
  } else {
    initKineticVelocity();
  }
}
