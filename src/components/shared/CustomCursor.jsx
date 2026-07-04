/**
 * CustomCursor — premium cursor for the GUI view only.
 *
 * Features:
 *  • mix-blend-difference dot  → auto-inverts color based on background
 *  • Velocity-stretch ring     → morphs into an ellipse in direction of travel
 *  • Click ripple burst        → concentric ring emanates outward on click
 *  • Idle sonar pulse          → ring breathes when cursor is still for 1.5 s
 *  • Live accent sync          → MutationObserver keeps ring color in sync with theme
 */
import { useEffect, useRef } from 'react';

const CLICKABLE = 'a,button,[role="button"],input,select,textarea,.project-card,.stat-card,.tech-badge,.exp-card,.edu-card,.cert-card';

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);

  useEffect(() => {
    // Skip on touch/stylus-only devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.classList.add('has-custom-cursor');
    const dot   = dotRef.current;
    const ring  = ringRef.current;
    if (!dot || !ring) return;

    // ── Position & velocity state ──────────────────────────────
    let mx = 0, my = 0;         // mouse (dot snaps instantly)
    let rx = 0, ry = 0;         // ring (lerped)
    let vx = 0, vy = 0;         // velocity (decays each frame)
    let ringScale = 1;          // ring scale (lerped in RAF, not CSS transition)
    let targetScale = 1;
    let rafId, idleTimer;
    let isIdle = false;

    // ── Mouse move ─────────────────────────────────────────────
    const onMove = (e) => {
      vx += (e.clientX - mx) * 0.6;   // accumulate velocity
      vy += (e.clientY - my) * 0.6;
      mx = e.clientX;
      my = e.clientY;

      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';

      if (isIdle) {
        isIdle = false;
        ring.classList.remove('idle');
      }
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isIdle = true;
        ring.classList.add('idle');
      }, 1500);
    };

    // ── RAF loop — ring lerp + velocity stretch ─────────────────
    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      // Decay velocity
      vx *= 0.75;
      vy *= 0.75;

      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';

      // Lerp scale (hover expansion) — keeps it in sync with position lerp
      ringScale += (targetScale - ringScale) * 0.12;

      // Velocity stretch — only when not scaled up and not idle
      const speed = Math.hypot(vx, vy);
      if (speed > 0.8 && targetScale === 1 && !isIdle) {
        const angle    = Math.atan2(vy, vx);
        const stretch  = Math.min(1 + speed * 0.022, 1.55) * ringScale;
        const compress = Math.max(1 / (stretch / ringScale), 0.68) * ringScale;
        ring.style.transform = `translate(-50%,-50%) rotate(${angle}rad) scaleX(${stretch}) scaleY(${compress})`;
      } else if (!isIdle) {
        ring.style.transform = `translate(-50%,-50%) scale(${ringScale})`;
      }

      rafId = requestAnimationFrame(loop);
    };
    loop();

    // ── Hover: expand only (no label text) ────────────────────
    const onOver = (e) => {
      const isClickable = e.target.closest(CLICKABLE);

      if (isClickable) {
        targetScale = 1.5;
        dot.classList.add('hovering');
      } else {
        targetScale = 1;
        dot.classList.remove('hovering');
      }
    };

    const onOut = () => {
      targetScale = 1;
      dot.classList.remove('hovering');
    };

    // ── Click ripple ───────────────────────────────────────────
    const onClick = (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'cursor-ripple';
      ripple.style.cssText = `left:${e.clientX}px;top:${e.clientY}px`;
      document.body.appendChild(ripple);
      // Double-ripple for depth
      const ripple2 = document.createElement('div');
      ripple2.className = 'cursor-ripple cursor-ripple--2';
      ripple2.style.cssText = `left:${e.clientX}px;top:${e.clientY}px`;
      document.body.appendChild(ripple2);
      setTimeout(() => { ripple.remove(); ripple2.remove(); }, 700);
    };

    // ── Live accent color sync (theme changes) ─────────────────
    const syncAccent = () => {
      const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim();
      if (accent) ring.style.borderColor = accent;
    };
    const themeObserver = new MutationObserver(syncAccent);
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    syncAccent();

    // ── Event listeners ────────────────────────────────────────
    document.addEventListener('mousemove', onMove,  { passive: true });
    document.addEventListener('mouseover',  onOver);
    document.addEventListener('mouseout',   onOut);
    document.addEventListener('click',      onClick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(idleTimer);
      themeObserver.disconnect();
      document.body.classList.remove('has-custom-cursor');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.removeEventListener('click',      onClick);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="custom-cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}
