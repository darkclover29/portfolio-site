import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()アイウエオカキクケコサシスセソタチツテトナニヌネノ';

export default function MatrixOverlay({ onExit }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx    = canvas.getContext('2d');
    const fs     = 14;
    const cols   = Math.floor(canvas.width / fs);
    const drops  = Array.from({ length: cols }, () => Math.random() * -canvas.height / fs);
    const speeds = Array.from({ length: cols }, () => 0.5 + Math.random() * 1.5);
    let   rafId;

    const tick = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y  = drops[i] * fs;

        // Lead character — bright white
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${fs}px 'JetBrains Mono', monospace`;
        ctx.fillText(ch, i * fs, y);

        // Trail — green
        const trailCh = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillStyle = '#00ff41';
        ctx.font = `${fs}px 'JetBrains Mono', monospace`;
        ctx.fillText(trailCh, i * fs, y - fs);

        // Dim trail further up
        if (Math.random() > 0.98) {
          ctx.fillStyle = 'rgba(0,200,50,0.4)';
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * fs, y - fs * 2);
        }

        drops[i] += speeds[i];
        if (drops[i] * fs > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.random() * -20;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    tick();

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return createPortal(
    <div className="matrix-overlay" onClick={onExit} role="dialog" aria-label="Matrix rain — click to exit">
      <canvas ref={canvasRef} className="matrix-overlay-canvas" />
      <div className="matrix-overlay-ui">
        <div className="matrix-overlay-title">SYSTEM BREACH DETECTED</div>
        <div className="matrix-overlay-sub">harsh@portfolio — hacker mode active</div>
        <div className="matrix-overlay-hint">[ click anywhere to exit ]</div>
      </div>
    </div>,
    document.body
  );
}
