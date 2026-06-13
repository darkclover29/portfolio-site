import { useEffect, useRef } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]|/\\';

export default function MatrixCanvas({ visible, getAccentRgb }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const dropsRef  = useRef([]);
  const lastRef   = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !visible) return;

    const ctx    = canvas.getContext('2d');
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols    = Math.floor(canvas.width / 14);
      dropsRef.current = Array(cols).fill(1).map(() => Math.random() * -100);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (ts) => {
      if (ts - lastRef.current < 50) { rafRef.current = requestAnimationFrame(draw); return; }
      lastRef.current = ts;
      const rgb = getAccentRgb?.() || '59,241,59';
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `rgba(${rgb}, 0.85)`;
      ctx.font = '13px monospace';
      dropsRef.current.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, i * 14, y * 14);
        if (y * 14 > canvas.height && Math.random() > 0.975) {
          dropsRef.current[i] = 0;
        } else {
          dropsRef.current[i]++;
        }
      });
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [visible, getAccentRgb]);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: visible ? 1 : 0, pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
