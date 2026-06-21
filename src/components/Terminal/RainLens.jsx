/**
 * RainLens — canvas-2D magnifying glass over the matrix rain.
 * Pure Canvas API, zero extra dependencies.
 * Reads pixels from MatrixCanvas, redraws them with fisheye zoom + chromatic aberration.
 */
import { useEffect, useRef } from 'react';

const D    = 140;   // lens diameter px
const R    = D / 2; // radius
const ZOOM = 1.5;   // magnification

export default function RainLens() {
  const lensRef = useRef(null);
  const posRef  = useRef({ x: -500, y: -500 });
  const rafRef  = useRef(null);

  useEffect(() => {
    const lens = lensRef.current;
    const ctx  = lens.getContext('2d');
    lens.width  = D;
    lens.height = D;

    // Find the MatrixCanvas (first canvas inside .terminal-view)
    const getSrc = () => document.querySelector('.matrix-canvas');

    const draw = () => {
      const src = getSrc();
      const { x, y } = posRef.current;

      if (src && x > 0) {
        ctx.clearRect(0, 0, D, D);

        const cropW = D / ZOOM;
        const cropH = D / ZOOM;
        const sx    = x - cropW / 2;
        const sy    = y - cropH / 2;

        // ── clip to circle ──────────────────────────────
        ctx.save();
        ctx.beginPath();
        ctx.arc(R, R, R - 1, 0, Math.PI * 2);
        ctx.clip();

        // ── base image (green channel / main) ───────────
        ctx.globalAlpha = 1;
        ctx.drawImage(src, sx, sy, cropW, cropH, 0, 0, D, D);

        // ── chromatic aberration: red shifted left ───────
        ctx.globalAlpha   = 0.28;
        ctx.globalCompositeOperation = 'screen';
        ctx.filter = 'saturate(4) hue-rotate(-30deg)';
        ctx.drawImage(src, sx - 2.5, sy, cropW, cropH, 0, 0, D, D);

        // ── chromatic aberration: blue shifted right ──────
        ctx.filter = 'saturate(4) hue-rotate(180deg)';
        ctx.drawImage(src, sx + 2.5, sy, cropW, cropH, 0, 0, D, D);

        ctx.filter = 'none';
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
        ctx.restore();

        // ── glass surface radial gradient ────────────────
        ctx.save();
        ctx.beginPath();
        ctx.arc(R, R, R - 1, 0, Math.PI * 2);
        ctx.clip();
        const grd = ctx.createRadialGradient(R * 0.55, R * 0.4, 0, R, R, R);
        grd.addColorStop(0,   'rgba(255,255,255,0.07)');
        grd.addColorStop(0.5, 'rgba(255,255,255,0.01)');
        grd.addColorStop(1,   'rgba(0,0,0,0.18)');
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.restore();

        // ── rim highlight ────────────────────────────────
        ctx.beginPath();
        ctx.arc(R, R, R - 1, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.22)';
        ctx.lineWidth   = 1.5;
        ctx.stroke();

        // ── outer drop shadow via box-shadow on element ──
        // (handled by CSS, not canvas)
      }

      // Move canvas to follow cursor (set via CSS left/top)
      lens.style.left = `${x - R}px`;
      lens.style.top  = `${y - R}px`;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Track cursor relative to the terminal-view container
  useEffect(() => {
    const view = document.querySelector('.terminal-view');
    if (!view) return;

    const onMove = (e) => {
      const rect = view.getBoundingClientRect();
      posRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    view.addEventListener('mousemove', onMove, { passive: true });
    return () => view.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <canvas
      ref={lensRef}
      width={D}
      height={D}
      style={{
        position:      'absolute',
        width:         D,
        height:        D,
        borderRadius:  '50%',
        pointerEvents: 'none',
        zIndex:        2,
        willChange:    'left, top',
        boxShadow:     '0 0 0 1px rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.55)',
        left:          -500,
        top:           -500,
      }}
    />
  );
}
