import { useEffect } from 'react';

const SEL = '.project-card,.stat-card,.highlight-card,.exp-card,.edu-card,.cert-card';
const MAX = 8;

export default function CardTilt() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let cur = null;

    const onMove = (e) => {
      const el = e.target.closest(SEL);
      if (!el) {
        if (cur) { cur.style.transition = 'transform 0.5s ease'; cur.style.transform = ''; cur = null; }
        return;
      }
      if (cur && cur !== el) { cur.style.transition = 'transform 0.5s ease'; cur.style.transform = ''; }
      cur = el;
      const r  = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
      const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
      el.style.transition = 'transform 0.08s ease';
      el.style.transform  = `perspective(700px) rotateX(${-dy * MAX}deg) rotateY(${dx * MAX}deg) scale(1.025)`;
    };

    const onLeave = (e) => {
      const el = e.target.closest(SEL);
      if (el) { el.style.transition = 'transform 0.5s ease'; el.style.transform = ''; }
    };

    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mouseleave', onLeave, true);
    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseleave', onLeave, true);
      if (cur) { cur.style.transform = ''; }
    };
  }, []);

  return null;
}
