import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [prog, setProg]       = useState(0);

  useEffect(() => {
    const el = document.querySelector('.dash-content');
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const max = scrollHeight - clientHeight;
      const p   = max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0;
      setProg(p);
      setVisible(scrollTop > 160);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const goTop = () => document.querySelector('.dash-content')?.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  // SVG ring maths
  const r = 17;
  const circ = 2 * Math.PI * r;
  const offset = circ - (prog / 100) * circ;

  return (
    <button className="scroll-top-btn" onClick={goTop} aria-label="Scroll to top" title="Back to top">
      <svg className="scroll-ring-svg" viewBox="0 0 42 42">
        <circle className="scroll-ring-bg"  cx="21" cy="21" r={r} />
        <circle className="scroll-ring-arc" cx="21" cy="21" r={r}
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <i className="fas fa-arrow-up" style={{ fontSize: '0.8rem', position: 'relative', zIndex: 1 }} />
    </button>
  );
}
