import { useEffect, useRef } from 'react';

const COUNT = 75;

function randBetween(a, b) { return a + Math.random() * (b - a); }

class Ember {
  constructor(W, H, init) {
    this.W = W; this.H = H;
    this.reset(init);
  }

  reset(init = false) {
    this.x     = randBetween(0, this.W);
    this.y     = init ? randBetween(0, this.H) : this.H + randBetween(5, 20);
    this.vx    = randBetween(-0.3, 0.3);
    this.vy    = -randBetween(0.3, 1.0);          // float upward
    this.r     = randBetween(1.2, 3.5);
    this.life  = 0;
    this.maxL  = randBetween(280, 550);
    this.red   = Math.random() > 0.25;             // mostly red, some dark-orange
    this.wobble= randBetween(0, Math.PI * 2);
  }

  update(mx, my) {
    // Gentle sine wobble
    this.wobble += 0.025;
    this.x += this.vx + Math.sin(this.wobble) * 0.15;
    this.y += this.vy;

    // Cursor repulsion  — scatter within 90px
    const dx   = this.x - mx;
    const dy   = this.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    if (dist < 90) {
      const force = Math.pow((90 - dist) / 90, 2) * 3.5;
      this.vx += (dx / dist) * force;
      this.vy += (dy / dist) * force;
    }

    // Damping — drift back to gentle upward float
    this.vx *= 0.93;
    this.vy  = this.vy * 0.93 + (-randBetween(0.3, 0.7)) * 0.07;
    this.life++;

    // Die if off-screen or expired
    return this.y < -15 || this.life >= this.maxL;
  }

  draw(ctx) {
    const t     = this.life / this.maxL;
    const alpha = (t < 0.15 ? t / 0.15 : t > 0.75 ? (1 - t) / 0.25 : 1) * 0.75;
    if (alpha <= 0) return;

    // Glow halo
    const hue = this.red ? 0 : 18;
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 4);
    grad.addColorStop(0,   `hsla(${hue},100%,55%,${alpha * 0.9})`);
    grad.addColorStop(0.5, `hsla(${hue},90%,35%,${alpha * 0.4})`);
    grad.addColorStop(1,   `hsla(${hue},80%,20%,0)`);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * 4, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Bright core
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${hue},100%,80%,${alpha})`;
    ctx.fill();
  }
}

export default function AshParticles({ active }) {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -999, y: -999 });

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      // rebuild particle positions on resize
      embers.forEach(e => { e.W = canvas.width; e.H = canvas.height; });
    };

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const embers = Array.from({ length: COUNT },
      () => new Ember(canvas.width, canvas.height, true)
    );

    const ctx = canvas.getContext('2d');
    let rafId;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;

      for (let i = 0; i < embers.length; i++) {
        const dead = embers[i].update(mx, my);
        if (dead) {
          embers[i] = new Ember(canvas.width, canvas.height, false);
        } else {
          embers[i].draw(ctx);
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    tick();

    const onMouse = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onTouch = (e) => {
      const t = e.touches[0];
      if (t) mouseRef.current = { x: t.clientX, y: t.clientY };
    };
    const onLeave = () => { mouseRef.current = { x: -999, y: -999 }; };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('touchmove', onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('touchmove', onTouch);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  );
}
