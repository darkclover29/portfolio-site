import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function InteractiveConstellation({ onDeactivate }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const requestRef = useRef(null);
  const particlesRef = useRef([]);
  const ripplesRef = useRef([]);
  const lastTouchPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // 1. Dynamic Particle Sizing based on Viewport (Optimized for Mobile/Tablet)
    const getParticleCount = () => {
      const w = window.innerWidth;
      if (w < 480) return 32;       // Phone
      if (w < 768) return 55;       // Tablet
      return 85;                    // Desktop
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Re-initialize particles if count changes substantially to adapt layout
      const count = getParticleCount();
      if (particlesRef.current.length !== count) {
        const particles = [];
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            radius: 1.2 + Math.random() * 1.8,
          });
        }
        particlesRef.current = particles;
      }
    };
    
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // 2. Mobile/Tablet Touch Interaction Ripples
    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        ripplesRef.current.push({
          x: touch.clientX,
          y: touch.clientY,
          radius: 4,
          maxRadius: 80,
          alpha: 1.0,
        });
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
        lastTouchPos.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const dx = touch.clientX - lastTouchPos.current.x;
        const dy = touch.clientY - lastTouchPos.current.y;
        
        // Spawn drag ripples occasionally to create a constellation trail
        if (Math.hypot(dx, dy) > 28) {
          ripplesRef.current.push({
            x: touch.clientX,
            y: touch.clientY,
            radius: 4,
            maxRadius: 50,
            alpha: 0.7,
          });
          lastTouchPos.current = { x: touch.clientX, y: touch.clientY };
        }
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      const pts = particlesRef.current;

      const accentRgb = (getComputedStyle(document.body).getPropertyValue('--accent-rgb') || '74, 222, 128').trim();

      // Update and draw particles
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb}, 0.6)`;
        ctx.shadowColor = `rgba(${accentRgb}, 0.25)`;
        ctx.shadowBlur = 3;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Update and draw touch ripples (Tactile response for mobile/tablets)
      const ripples = ripplesRef.current;
      ripplesRef.current = ripples.filter(r => r.alpha > 0.05);

      for (let i = 0; i < ripplesRef.current.length; i++) {
        const r = ripplesRef.current[i];
        r.radius += 2.0;
        r.alpha -= 0.022;

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${accentRgb}, ${r.alpha * 0.35})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Connect expanding ripple field to particles
        for (let j = 0; j < pts.length; j++) {
          const p = pts[j];
          const dx = p.x - r.x;
          const dy = p.y - r.y;
          const dist = Math.hypot(dx, dy);
          if (dist < r.radius + 20 && dist > r.radius - 20) {
            ctx.beginPath();
            ctx.moveTo(r.x, r.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(${accentRgb}, ${r.alpha * 0.2})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw normal connections (Mouse proximity or Touch drag point proximity)
      const connectionDist = window.innerWidth < 768 ? 95 : 120;
      const mouseDist = window.innerWidth < 768 ? 120 : 160;

      for (let i = 0; i < pts.length; i++) {
        const p1 = pts[i];

        if (mouse.x > 0) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouseDist) {
            const alpha = (1 - dist / mouseDist) * 0.4;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${accentRgb}, ${alpha})`;
            ctx.lineWidth = 0.95;
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < pts.length; j++) {
          const p2 = pts[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${accentRgb}, ${alpha})`;
            ctx.lineWidth = 0.55;
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
      window.removeEventListener('touchstart', handleTouchStart);
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
          zIndex: 8,
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
