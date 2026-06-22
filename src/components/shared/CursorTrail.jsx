/**
 * CursorTrail — subtle fading dot trail on desktop.
 * Canvas-based, ~20 dots max, smooth decay. GUI only.
 */
import { useEffect, useRef } from 'react';

const MAX_DOTS = 20;
const DOT_LIFE = 0.06; // decay per frame

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const dots   = [];
    let rafId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMove = (e) => {
      dots.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (dots.length > MAX_DOTS) dots.shift();
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        d.life -= DOT_LIFE;
        if (d.life <= 0) { dots.splice(i, 1); continue; }
        const r = d.life * 3.5;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(var(--accent-rgb, 255,255,255), ${d.life * 0.45})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-trail-canvas" aria-hidden="true" />;
}
