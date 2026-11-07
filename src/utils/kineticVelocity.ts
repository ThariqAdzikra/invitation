// kineticVelocity.ts — Kinetic Horizontal Ticker (Zero Skew on Scroll — Clean & Stable)
import gsap from 'gsap';

export function initKineticVelocity() {
  const tickers = document.querySelectorAll<HTMLElement>('.kinetic-ticker-track');
  if (tickers.length === 0) return;

  const lenis = (window as any).__lenis;
  let tickerOffset = 0;
  const baseTickerSpeed = 0.35;

  if (lenis) {
    lenis.on('scroll', (e: { velocity: number }) => {
      // Gently nudge ribbon track in direction of scroll without skewing cards
      tickerOffset += e.velocity * 0.25;
    });
  }

  // GSAP Ticker for smooth continuous horizontal ribbon track
  gsap.ticker.add(() => {
    tickerOffset += baseTickerSpeed;
    if (tickerOffset < 0) tickerOffset += 50000;
    tickers.forEach((t) => {
      t.style.transform = `translate3d(-${(tickerOffset % 50).toFixed(3)}%, 0, 0)`;
    });
  });
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKineticVelocity);
  } else {
    initKineticVelocity();
  }
}

