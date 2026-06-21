import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

const SLICEABLE = '.project-card,.stat-card,.highlight-card,.contact-card,.tech-badge,.exp-card,.edu-card,.skill-bar,.cert-card';

const BREATHING_FORMS = [
  { style: 'Water Breathing',   form: 'First Form: Water Surface Slash' },
  { style: 'Water Breathing',   form: 'Second Form: Water Wheel'        },
  { style: 'Water Breathing',   form: 'Tenth Form: Constant Flux'       },
  { style: 'Flame Breathing',   form: 'First Form: Unknowing Fire'      },
  { style: 'Flame Breathing',   form: 'Ninth Form: Rengoku'             },
  { style: 'Thunder Breathing', form: 'First Form: Thunderclap and Flash'},
  { style: 'Thunder Breathing', form: 'Sixth Form: Rumble and Flash'    },
  { style: 'Wind Breathing',    form: 'First Form: Dust Whirlwind Cutter'},
  { style: 'Stone Breathing',   form: 'First Form: Serpentinite Bipolar'},
  { style: 'Mist Breathing',    form: 'Third Form: Scattering Mist Splash'},
  { style: 'Insect Breathing',  form: 'Butterfly Dance: Caprice'        },
  { style: 'Sound Breathing',   form: 'First Form: Roar'                },
  { style: 'Moon Breathing',    form: 'First Form: Dark Moon, Evening Palace'},
  { style: 'Sun Breathing',     form: 'Hinokami Kagura: Dance'          },
];

let idCounter = 0;

// ── Spark + trail canvas (mouse + touch) ──────────────────────
function useActionCanvas(active) {
  const canvasRef = useRef(null);
  const sparks    = useRef([]);
  const trailPts  = useRef([]);  // shared trail points for touch
  const rafRef    = useRef(null);

  // Expose trailPts so caller can push touch points into trail
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
          ctx.beginPath();
          ctx.moveTo(trail[i-1].x, trail[i-1].y);
          ctx.lineTo(trail[i].x,   trail[i].y);
          ctx.strokeStyle = `rgba(220,20,60,${alpha * 0.9})`;
          ctx.lineWidth   = w;
          ctx.lineCap     = 'round';
          ctx.lineJoin    = 'round';
          ctx.shadowColor = 'rgba(220,20,60,0.6)';
          ctx.shadowBlur  = 8;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(trail[i-1].x, trail[i-1].y);
          ctx.lineTo(trail[i].x,   trail[i].y);
          ctx.strokeStyle = `rgba(255,140,140,${alpha * 0.6})`;
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
        ctx.fillStyle = `rgba(255,${60 + (1-a)*120},60,${a * 0.9})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize); };
  }, [active]);

  return canvasRef;
}

export default function DemonCursorOverlay({ active, onDeactivate }) {
  const canvasRef   = useActionCanvas(active);
  const restoreMap  = useRef(new Map());
  const [announcements, setAnnouncements] = useState([]);
  const [slashEffects,  setSlashEffects]  = useState([]);
  const [ripples,       setRipples]       = useState([]); // mobile tap ripples

  // ── Shared slash logic ────────────────────────────────────────
  const doSlash = useCallback((el, x, y) => {
    const rect = el.getBoundingClientRect();
    const id   = ++idCounter;
    setSlashEffects(s => [...s, { id, rect }]);
    setTimeout(() => setSlashEffects(s => s.filter(v => v.id !== id)), 650);

    const form = BREATHING_FORMS[Math.floor(Math.random() * BREATHING_FORMS.length)];
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
    doSlash(el, e.clientX, e.clientY);
  }, [doSlash]);

  // ── Touch: ripple + slash ─────────────────────────────────────
  const touchStartRef = useRef(null);

  const handleTouchStart = useCallback((e) => {
    const touch = e.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, t: Date.now() };

    // Ripple at tap point
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

    // Quick tap (< 300ms, < 20px move) → slash tapped card
    if (dt < 300 && dist < 20) {
      const el = document.elementFromPoint(touch.clientX, touch.clientY)?.closest(SLICEABLE);
      if (el) doSlash(el, touch.clientX, touch.clientY);
    }

    // Swipe gesture (> 40px, < 400ms) → slash any card under the swipe path
    if (dist > 40 && dt < 400) {
      const steps = Math.ceil(dist / 12);
      const slashed = new Set();
      for (let i = 0; i <= steps; i++) {
        const px = start.x + (dx / steps) * i;
        const py = start.y + (dy / steps) * i;
        const el = document.elementFromPoint(px, py)?.closest(SLICEABLE);
        if (el && !slashed.has(el)) { slashed.add(el); doSlash(el, px, py); }
      }
    }

    touchStartRef.current = null;
  }, [doSlash]);

  useEffect(() => {
    if (!active) return;
    window.addEventListener('click',      handleClick);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend',   handleTouchEnd);
    return () => {
      window.removeEventListener('click',      handleClick);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend',   handleTouchEnd);
    };
  }, [active, handleClick, handleTouchStart, handleTouchEnd]);

  // Cleanup on deactivate
  useEffect(() => {
    if (!active) {
      restoreMap.current.forEach((tid, el) => { clearTimeout(tid); el.classList.remove('sliced'); });
      restoreMap.current.clear();
      setAnnouncements([]);
      setSlashEffects([]);
      setRipples([]);
    }
  }, [active]);

  if (!active) return null;

  return createPortal(
    <>
      {/* Combined trail + spark canvas */}
      <canvas ref={canvasRef} className="ds-trail-canvas" aria-hidden="true" />

      {/* Touch tap ripples */}
      {ripples.map(r => (
        <div
          key={r.id}
          className="ds-touch-ripple"
          style={{ left: r.x, top: r.y }}
          aria-hidden="true"
        />
      ))}

      {/* Mode badge */}
      <div className="ds-mode-badge">
        <span className="ds-badge-icon">⚔️</span>
        <span>Demon Slayer Mode</span>
        <button type="button" className="ds-deactivate-btn" onClick={onDeactivate} title="Restore Magic">
          <i className="fas fa-wand-magic-sparkles" />
        </button>
      </div>

      {/* Slash effects */}
      {slashEffects.map(s => (
        <div
          key={s.id}
          className="ds-slash-effect"
          style={{ left: s.rect.left, top: s.rect.top, width: s.rect.width, height: s.rect.height }}
          aria-hidden="true"
        />
      ))}

      {/* Colour-coded breathing form popups */}
      {announcements.map((a, i) => (
        <div
          key={a.id}
          className="ds-form-popup"
          style={{ bottom: `${84 + i * 72}px` }}
          data-style={a.style}
        >
          <div className="ds-form-style">{a.style}</div>
          <div className="ds-form-name">{a.form}</div>
        </div>
      ))}
    </>,
    document.body
  );
}
