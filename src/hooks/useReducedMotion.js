import { useState, useEffect } from 'react';

/**
 * Returns true if the user has requested reduced motion via OS/browser settings.
 * All JS-driven decorative effects should be gated behind this.
 */
export function useReducedMotion() {
  const mq = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;
  const [reduced, setReduced] = useState(mq ? mq.matches : false);
  useEffect(() => {
    if (!mq) return;
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []); // eslint-disable-line
  return reduced;
}
