import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

const SLICEABLE = '.project-card,.stat-card,.highlight-card,.contact-card,.tech-badge,.exp-card,.edu-card,.skill-bar,.cert-card,.bento-card';

const REFACTOR_OPERATIONS = [
  { style: 'Refactoring',   form: 'Extract Method' },
  { style: 'Refactoring',   form: 'Inline Function' },
  { style: 'Refactoring',   form: 'Rename Variable' },
  { style: 'Optimization',  form: 'Dead Code Elimination' },
  { style: 'Optimization',  form: 'Loop Unrolling' },
  { style: 'Optimization',  form: 'Constant Folding' },
  { style: 'Compilation',   form: 'Lexical Scoping Verification' },
  { style: 'Compilation',   form: 'AST Graph Generation' },
  { style: 'Security',      form: 'Sanitize User Inputs' },
  { style: 'Performance',   form: 'Async Operations Parallelization' },
  { style: 'System Design', form: 'Dependency Injection' },
  { style: 'System Design', form: 'Loose Coupling Calibration' },
];

let idCounter = 0;

// ── Spark + trail canvas (mouse + touch) ──────────────────────
function useActionCanvas(active) {
  const canvasRef = useRef(null);
  const sparks    = useRef([]);
  const trailPts  = useRef([]);  // shared trail points for touch
  const rafRef    = useRef(null);

  useEffect(() => {
    if (!active) return;

    // Mouse trail
    const onMouseMove = (e) => {
      trailPts.current.push({ x: e.clientX, y: e.clientY, t: Date.now() });
      for (let i = 0; i < 3; i++) {
        sparks.current.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 2.5,
          vy: -1.5 - Math.random() * 2.5,
          life: 1,
          r: 1.5 + Math.random() * 2.5,
        });
      }
    };

    // Touch trail + sparks
    const onTouch = (e) => {
      for (const t of e.changedTouches) {
        trailPts.current.push({ x: t.clientX, y: t.clientY, t: Date.now() });
        for (let i = 0; i < 5; i++) {
          sparks.current.push({
            x: t.clientX + (Math.random() - 0.5) * 10,
            y: t.clientY + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 3.5,
            vy: -2 - Math.random() * 3,
            life: 1,
            r: 2 + Math.random() * 3,
          });
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove',  onTouch,     { passive: true });
    window.addEventListener('touchstart', onTouch,     { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove',  onTouch);
      window.removeEventListener('touchstart', onTouch);
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const ctx = canvas.getContext('2d');

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      // ── Trail ──
      const trail = trailPts.current.filter(p => now - p.t < 320);
      trailPts.current = trail;
      if (trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          const age   = now - trail[i].t;
          const alpha = Math.max(0, 1 - age / 320);
          const w     = alpha * 4;
          
          // Green glowing neon trail
          ctx.beginPath();
          ctx.moveTo(trail[i-1].x, trail[i-1].y);
          ctx.lineTo(trail[i].x,   trail[i].y);
          ctx.strokeStyle = `rgba(74,222,128,${alpha * 0.9})`;
          ctx.lineWidth   = w;
          ctx.lineCap     = 'round';
          ctx.lineJoin    = 'round';
          ctx.shadowColor = 'rgba(74,222,128,0.6)';
          ctx.shadowBlur  = 8;
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(trail[i-1].x, trail[i-1].y);
          ctx.lineTo(trail[i].x,   trail[i].y);
          ctx.strokeStyle = `rgba(167,243,208,${alpha * 0.6})`;
          ctx.lineWidth   = w * 0.35;
          ctx.shadowBlur  = 0;
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }

      // ── Sparks ──
      sparks.current = sparks.current.filter(s => s.life > 0);
      for (const s of sparks.current) {
        s.x  += s.vx;
        s.y  += s.vy;
        s.vy += 0.12;
        s.life -= 0.045;
        const a = Math.max(0, s.life);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * a, 0, Math.PI * 2);
        // Cyan/Green sparks
        ctx.fillStyle = `rgba(74,${200 + (1-a)*55},${128 + (1-a)*127},${a * 0.9})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize); };
  }, [active]);

  return canvasRef;
}

export default function RefactorSlicerOverlay({ active, onDeactivate }) {
  const canvasRef   = useActionCanvas(active);
  const restoreMap  = useRef(new Map());
  const [announcements, setAnnouncements] = useState([]);
  const [slashEffects,  setSlashEffects]  = useState([]);
  const [ripples,       setRipples]       = useState([]);

  // ── Shared slash logic ────────────────────────────────────────
  const doSlash = useCallback((el) => {
    const rect = el.getBoundingClientRect();
    const id   = ++idCounter;
    setSlashEffects(s => [...s, { id, rect }]);
    setTimeout(() => setSlashEffects(s => s.filter(v => v.id !== id)), 650);

    const form = REFACTOR_OPERATIONS[Math.floor(Math.random() * REFACTOR_OPERATIONS.length)];
    const aId  = ++idCounter;
    setAnnouncements(a => [...a, { id: aId, ...form }]);
    setTimeout(() => setAnnouncements(a => a.filter(v => v.id !== aId)), 1800);

    el.classList.add('sliced');
    if (restoreMap.current.has(el)) clearTimeout(restoreMap.current.get(el));
    const tid = setTimeout(() => { el.classList.remove('sliced'); restoreMap.current.delete(el); }, 2200);
    restoreMap.current.set(el, tid);
  }, []);

  // ── Mouse click ───────────────────────────────────────────────
  const handleClick = useCallback((e) => {
    const el = e.target.closest(SLICEABLE);
    if (!el) return;
    doSlash(el);
  }, [doSlash]);

  // ── Touch: ripple + slash ─────────────────────────────────────
  const touchStartRef = useRef(null);

  const handleTouchStart = useCallback((e) => {
    const touch = e.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, t: Date.now() };

    const rId = ++idCounter;
    setRipples(r => [...r, { id: rId, x: touch.clientX, y: touch.clientY }]);
    setTimeout(() => setRipples(r => r.filter(v => v.id !== rId)), 700);
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const touch = e.changedTouches[0];
    const start = touchStartRef.current;
    if (!start) return;

    const dx   = touch.clientX - start.x;
    const dy   = touch.clientY - start.y;
    const dist = Math.hypot(dx, dy);
    const dt   = Date.now() - start.t;

    // Quick tap
    if (dt < 300 && dist < 20) {
      const el = document.elementFromPoint(touch.clientX, touch.clientY)?.closest(SLICEABLE);
      if (el) doSlash(el);
    }

    // Swipe gesture
    if (dist > 40 && dt < 400) {
      const steps = Math.ceil(dist / 12);
      const slashed = new Set();
      for (let i = 0; i <= steps; i++) {
        const px = start.x + (dx / steps) * i;
        const py = start.y + (dy / steps) * i;
        const el = document.elementFromPoint(px, py)?.closest(SLICEABLE);
        if (el && !slashed.has(el)) { slashed.add(el); doSlash(el); }
      }
    }

    touchStartRef.current = null;
  }, [doSlash]);

  useEffect(() => {
    window.addEventListener('click',      handleClick);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend',   handleTouchEnd);
    const currentRestoreMap = restoreMap.current;
    return () => {
      window.removeEventListener('click',      handleClick);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend',   handleTouchEnd);
      // Cleanup all sliced classes and timers on unmount
      currentRestoreMap.forEach((tid, el) => { clearTimeout(tid); el.classList.remove('sliced'); });
      currentRestoreMap.clear();
    };
  }, [handleClick, handleTouchStart, handleTouchEnd]);

  if (!active) return null;

  return createPortal(
    <>
      <canvas ref={canvasRef} className="ref-trail-canvas" aria-hidden="true" />

      {ripples.map(r => (
        <div
          key={r.id}
          className="ref-touch-ripple"
          style={{ left: r.x, top: r.y }}
          aria-hidden="true"
        />
      ))}

      {/* Mode badge */}
      <div className="ref-mode-badge">
        <span className="ref-badge-icon">🛠️</span>
        <span>Refactor Slicer Mode</span>
        <button type="button" className="ref-deactivate-btn" onClick={onDeactivate} title="Exit Refactoring">
          <i className="fas fa-terminal" />
        </button>
      </div>

      {slashEffects.map(s => (
        <div
          key={s.id}
          className="ref-slash-effect"
          style={{ left: s.rect.left, top: s.rect.top, width: s.rect.width, height: s.rect.height }}
          aria-hidden="true"
        />
      ))}

      {announcements.map((a, i) => (
        <div
          key={a.id}
          className="ref-form-popup"
          style={{ bottom: `${84 + i * 72}px` }}
          data-style={a.style}
        >
          <div className="ref-form-style">{a.style}</div>
          <div className="ref-form-name">{a.form}</div>
        </div>
      ))}
    </>,
    document.body
  );
}
