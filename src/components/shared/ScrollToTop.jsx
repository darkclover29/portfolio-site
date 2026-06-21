import { useState, useEffect, useRef } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [pullY,   setPullY]   = useState(0);
  const [pulling, setPulling] = useState(false);
  const startY = useRef(null);

  useEffect(() => {
    const getEl = () => document.querySelector('.dash-content');

    const onScroll = () => {
      const el = getEl();
      if (el) setVisible(el.scrollTop > 220);
    };

    // Attach after a tick so .dash-content exists
    const id = setTimeout(() => {
      const el = getEl();
      if (el) el.addEventListener('scroll', onScroll, { passive: true });
    }, 200);

    return () => {
      clearTimeout(id);
      const el = getEl();
      if (el) el.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Pull-to-refresh
  useEffect(() => {
    const getEl = () => document.querySelector('.dash-content');

    const onTouchStart = (e) => {
      const el = getEl();
      if (el && el.scrollTop === 0) startY.current = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (startY.current === null) return;
      const el = getEl();
      if (!el || el.scrollTop > 0) { startY.current = null; return; }
      const dy = e.touches[0].clientY - startY.current;
      if (dy > 0) { setPulling(true); setPullY(Math.min(dy * 0.45, 72)); }
    };
    const onTouchEnd = () => {
      if (pullY > 58) window.location.reload();
      startY.current = null;
      setPulling(false);
      setPullY(0);
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove',  onTouchMove,  { passive: true });
    window.addEventListener('touchend',   onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, [pullY]);

  const scrollTop = () => document.querySelector('.dash-content')?.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {pulling && (
        <div className="ptr-bar" style={{ height: pullY }}>
          <span className={`ptr-label${pullY > 58 ? ' ptr-label--ready' : ''}`}>
            {pullY > 58 ? '↺ Release to refresh' : '↓ Pull to refresh'}
          </span>
        </div>
      )}
      {visible && (
        <button className="scroll-top-btn" onClick={scrollTop} aria-label="Scroll to top" title="Back to top">
          ↑
        </button>
      )}
    </>
  );
}
