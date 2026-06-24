import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function DigitalGlitchOverlay({ onDismiss }) {
  const [glitchText, setGlitchText] = useState('ESTABLISHING SECURE COMMS...');
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onDismiss();
    };
    window.addEventListener('keydown', handleKeyDown);

    const timer = setTimeout(() => {
      onDismiss();
    }, 4200);

    const messages = [
      'BYPASS SECURE GATEWAY... OK',
      'ESTABLISHING AST LINK... ACTIVE',
      'INJECTING SYSTEM TELEMETRY... 100%',
      'MATRIX LINK ACTIVE // NOMINAL'
    ];
    let msgIdx = 0;
    const intervalText = setInterval(() => {
      if (msgIdx < messages.length) {
        setGlitchText(messages[msgIdx]);
        msgIdx++;
      }
    }, 900);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      clearInterval(intervalText);
    };
  }, [onDismiss]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fs = 15;
    const cols = Math.floor(canvas.width / fs);
    const drops = Array.from({ length: cols }, () => Math.random() * -canvas.height / fs);
    const speeds = Array.from({ length: cols }, () => 1 + Math.random() * 2);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 15, 12, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fs}px 'JetBrains Mono', monospace`;
      const accentRgb = (getComputedStyle(document.body).getPropertyValue('--accent-rgb') || '74, 222, 128').trim();

      for (let i = 0; i < cols; i++) {
        const ch = Math.random() > 0.5 ? '1' : '0';
        const y = drops[i] * fs;

        ctx.fillStyle = '#ffffff';
        ctx.fillText(ch, i * fs, y);

        ctx.fillStyle = `rgba(${accentRgb}, 0.55)`;
        ctx.fillText(ch, i * fs, y - fs);

        drops[i] += speeds[i];
        if (drops[i] * fs > canvas.height && Math.random() > 0.98) {
          drops[i] = Math.random() * -10;
        }
      }

      if (Math.random() > 0.94) {
        ctx.fillStyle = `rgba(${accentRgb}, 0.15)`;
        ctx.fillRect(0, Math.random() * canvas.height, canvas.width, 2 + Math.random() * 5);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return createPortal(
    <div className="glitch-overlay" onClick={onDismiss}>
      <div className="glitch-scanlines" />
      <div className="glitch-crt-bend" />
      <canvas ref={canvasRef} className="glitch-canvas" />

      <div className="glitch-panel" onClick={e => e.stopPropagation()}>
        <div className="glitch-header">
          <span className="glitch-indicator-dot" />
          <span>SYSTEM DECRYPT STATUS</span>
        </div>
        <div className="glitch-message-box">
          <h2 className="glitch-message-text" data-text={glitchText}>{glitchText}</h2>
        </div>
        <p className="glitch-hint">Click anywhere or press Esc to bypass</p>
      </div>
    </div>,
    document.body
  );
}
