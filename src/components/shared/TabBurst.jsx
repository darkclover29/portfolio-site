/**
 * TabBurst — canvas particle burst on tab switch.
 * Call burst(x, y) with the clicked button's center coords.
 * Exported as a ref-forwarded imperative component.
 */
import { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';

const PARTICLE_COUNT = 22;

function spawnParticles(ctx, x, y, color) {
  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.4;
    const speed = 1.5 + Math.random() * 3.5;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 0.03 + Math.random() * 0.03,
      r: 2 + Math.random() * 3,
    });
  }
  return particles;
}

const TabBurst = forwardRef(function TabBurst(_, ref) {
  const canvasRef  = useRef(null);
  const rafRef     = useRef(null);
  const partsRef   = useRef([]);
  const colorRef   = useRef('#ffffff');

  // Sync canvas size
  useEffect(() => {
    const resize = () => {
      if (canvasRef.current) {
        canvasRef.current.width  = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    const loop = () => {
      if (partsRef.current.length === 0) {
        rafRef.current = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      partsRef.current = partsRef.current.filter(p => p.life > 0);
      for (const p of partsRef.current) {
        p.x   += p.vx;
        p.y   += p.vy;
        p.vy  += 0.12; // gravity
        p.vx  *= 0.97;
        p.life -= p.decay;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle   = colorRef.current;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    // expose loop starter
    canvasRef._startLoop = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(loop);
    };

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  useImperativeHandle(ref, () => ({
    burst(x, y, accentColor = '#ffffff') {
      colorRef.current = accentColor;
      partsRef.current = [
        ...partsRef.current,
        ...spawnParticles(null, x, y, accentColor),
      ];
      // kick off loop if not running
      const canvas = canvasRef.current;
      const ctx    = canvas?.getContext('2d');
      if (!ctx || rafRef.current) return;
      const loop = () => {
        if (partsRef.current.length === 0) {
          rafRef.current = null;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        partsRef.current = partsRef.current.filter(p => p.life > 0);
        for (const p of partsRef.current) {
          p.x   += p.vx;
          p.y   += p.vy;
          p.vy  += 0.12;
          p.vx  *= 0.97;
          p.life -= p.decay;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillStyle   = colorRef.current;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    }
  }));

  return (
    <canvas
      ref={canvasRef}
      className="tab-burst-canvas"
      aria-hidden="true"
    />
  );
});

export default TabBurst;
