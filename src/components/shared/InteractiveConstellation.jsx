import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const NUM_PARTICLES = 90;
const CONNECTION_DISTANCE = 120;
const MOUSE_DISTANCE = 160;

export default function InteractiveConstellation({ onDeactivate }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const requestRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const particles = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 1.2 + Math.random() * 1.8,
      });
    }
    particlesRef.current = particles;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      const pts = particlesRef.current;

      // Fetch dynamic theme accent color from document body CSS variable
      const accentRgb = (getComputedStyle(document.body).getPropertyValue('--accent-rgb') || '74, 222, 128').trim();

      // Update and draw particles
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off borders
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb}, 0.65)`;
        ctx.shadowColor = `rgba(${accentRgb}, 0.3)`;
        ctx.shadowBlur = 3;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw connections
      for (let i = 0; i < pts.length; i++) {
        const p1 = pts[i];

        // Connection to mouse
        if (mouse.x > 0) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_DISTANCE) {
            const alpha = (1 - dist / MOUSE_DISTANCE) * 0.4;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${accentRgb}, ${alpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }

        // Connections to other particles
        for (let j = i + 1; j < pts.length; j++) {
          const p2 = pts[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${accentRgb}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return createPortal(
    <>
      <canvas
        ref={canvasRef}
        className="constellation-canvas"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 8, // overlay background but behind foreground cards/modals
        }}
      />
      <div className="constellation-badge">
        <span className="constellation-badge-pulse" />
        <span className="constellation-badge-text">Interactive Constellation Mode</span>
        <button
          type="button"
          className="constellation-deactivate-btn"
          onClick={onDeactivate}
          title="Disable Constellation"
        >
          ✕
        </button>
      </div>
    </>,
    document.body
  );
}
