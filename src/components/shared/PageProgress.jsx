/**
 * PageProgress — thin accent bar at top that fills 0→100% then fades out on load.
 */
import { useEffect, useState } from 'react';

export default function PageProgress() {
  const [width, setWidth]   = useState(0);
  const [visible, setVis]   = useState(true);

  useEffect(() => {
    // Animate to 80% quickly, then jump to 100% on load
    let raf;
    let w = 0;
    const tick = () => {
      w = Math.min(w + (80 - w) * 0.08 + 0.5, 80);
      setWidth(w);
      if (w < 79.9) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      cancelAnimationFrame(raf);
      setWidth(100);
      setTimeout(() => setVis(false), 500);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', finish);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="page-progress-bar"
      style={{ width: `${width}%`, opacity: width >= 100 ? 0 : 1 }}
      aria-hidden="true"
    />
  );
}
