import React, { useRef, useEffect, useCallback } from 'react';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  extraScale?: number;
  children?: React.ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

export const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#E2C98A',
  sparkSize = 10,
  sparkRadius = 20,
  sparkCount = 8,
  duration = 450,
  extraScale = 1.2,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const createSparks = useCallback((x: number, y: number) => {
    const now = performance.now();
    for (let i = 0; i < sparkCount; i++) {
      sparksRef.current.push({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
      });
    }
  }, [sparkCount]);

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      let x = 0;
      let y = 0;
      if ('touches' in e && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else if ('clientX' in e) {
        x = (e as MouseEvent).clientX;
        y = (e as MouseEvent).clientY;
      }
      createSparks(x, y);
    };

    window.addEventListener('pointerdown', handleClick);
    return () => window.removeEventListener('pointerdown', handleClick);
  }, [createSparks]);

  useEffect(() => {
    let animId: number;

    const render = (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = time - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const distance = sparkRadius * ease * extraScale;
        const currentSize = sparkSize * (1 - progress);

        const currentX = spark.x + Math.cos(spark.angle) * distance;
        const currentY = spark.y + Math.sin(spark.angle) * distance;

        ctx.save();
        ctx.beginPath();
        ctx.arc(currentX, currentY, Math.max(0.5, currentSize / 2), 0, Math.PI * 2);
        ctx.fillStyle = sparkColor;
        ctx.shadowColor = sparkColor;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = 1 - progress;
        ctx.fill();
        ctx.restore();

        return true;
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [duration, sparkColor, sparkRadius, sparkSize, extraScale]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[99999]"
        aria-hidden="true"
      />
      {children}
    </>
  );
};

export default ClickSpark;
