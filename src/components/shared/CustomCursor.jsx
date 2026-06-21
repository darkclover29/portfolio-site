import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.body.classList.add('has-custom-cursor');

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0, rafId;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    };

    const loop = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      rafId = requestAnimationFrame(loop);
    };
    loop();

    const expand = (e) => {
      if (e.target.closest('a,button,[role="button"],input,select,.project-card,.stat-card,.tech-badge,.exp-card,.edu-card,.cert-card')) {
        ring.classList.add('custom-cursor-ring--hover');
        dot.classList.add('custom-cursor-dot--hover');
      }
    };
    const shrink = () => {
      ring.classList.remove('custom-cursor-ring--hover');
      dot.classList.remove('custom-cursor-dot--hover');
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover',  expand);
    document.addEventListener('mouseout',   shrink);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.classList.remove('has-custom-cursor');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover',  expand);
      document.removeEventListener('mouseout',   shrink);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="custom-cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}
