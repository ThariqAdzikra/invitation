import React, { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  baseAlpha: number;
  alphaSpeed: number;
  alphaOffset: number;
  speedY: number;
  driftX: number;
  driftSpeed: number;
}

const STAR_COLORS = ['#C5A059', '#F3E3B6', '#E2C98A', '#FAF8F5', '#8A6D3B'];

export const CelestialCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let animId: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initStars();
    };

    const initStars = () => {
      // Density: ~1 star per 25000 px^2 on mobile, more on desktop
      const count = Math.floor((width * height) / 22000);
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() < 0.2 ? Math.random() * 1.6 + 1.2 : Math.random() * 1.0 + 0.5,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          baseAlpha: Math.random() * 0.55 + 0.25,
          alphaSpeed: Math.random() * 0.002 + 0.001,
          alphaOffset: Math.random() * Math.PI * 2,
          speedY: -(Math.random() * 0.22 + 0.08),
          driftX: Math.random() * 0.6 + 0.2,
          driftSpeed: Math.random() * 0.0015 + 0.0005,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    resize();

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min(time - lastTime, 50);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Draw stars
      const mouse = mouseRef.current;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Move upward slowly
        star.y += star.speedY * (delta / 16);
        star.x += Math.sin(time * star.driftSpeed + star.alphaOffset) * (star.driftX * 0.15);

        // Repel gently from mouse
        if (mouse.active) {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90 && dist > 0) {
            const force = (1 - dist / 90) * 0.8;
            star.x += (dx / dist) * force;
            star.y += (dy / dist) * force;
          }
        }

        // Wrap around borders
        if (star.y < -10) {
          star.y = height + 10;
          star.x = Math.random() * width;
        } else if (star.y > height + 10) {
          star.y = -10;
        }
        if (star.x < -10) star.x = width + 10;
        else if (star.x > width + 10) star.x = -10;

        // Pulsating alpha
        const currentAlpha = Math.max(
          0.1,
          Math.min(0.95, star.baseAlpha + Math.sin(time * star.alphaSpeed + star.alphaOffset) * 0.35)
        );

        ctx.save();
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        if (star.size > 1.4) {
          ctx.shadowColor = star.color;
          ctx.shadowBlur = 6;
        }
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

export default CelestialCanvas;
