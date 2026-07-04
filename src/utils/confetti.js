/**
 * Shared confetti animation — import and call fireConfetti() anywhere.
 * Respects prefers-reduced-motion: returns immediately if the user prefers reduced motion.
 */
export function fireConfetti(count = 80) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99999;width:100%;height:100%';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#fff';
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width, y: -10,
    vx: (Math.random() - 0.5) * 6, vy: Math.random() * 4 + 2,
    color: [accent, '#4ade80', '#38bdf8', '#f472b6', '#facc15'][Math.floor(Math.random() * 5)],
    size: Math.random() * 8 + 4,
    rot: Math.random() * 360, rotV: (Math.random() - 0.5) * 8,
    life: 1,
  }));
  let raf;
  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.12;
      p.rot += p.rotV; p.life -= 0.012;
      if (p.life <= 0 || p.y > canvas.height) return;
      alive = true;
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    if (alive) raf = requestAnimationFrame(tick);
    else { cancelAnimationFrame(raf); canvas.remove(); }
  };
  raf = requestAnimationFrame(tick);
}
