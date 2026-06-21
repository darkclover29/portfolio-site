import { useEffect } from 'react';
import { createPortal } from 'react-dom';

// Generate random clover positions once
const CLOVERS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 3,
  duration: 3 + Math.random() * 3,
  size: 18 + Math.random() * 28,
  rotate: Math.random() * 360,
}));

export default function DarkCloverEgg({ onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 6000);
    const handler = (e) => {
      if (e.key === 'Escape' || e.type === 'click') onDismiss();
    };
    window.addEventListener('keydown', handler);
    return () => { clearTimeout(timer); window.removeEventListener('keydown', handler); };
  }, [onDismiss]);

  return createPortal(
    <div className="egg-overlay" onClick={onDismiss}>
      <div className="egg-rain" aria-hidden="true">
        {CLOVERS.map(c => (
          <span
            key={c.id}
            className="egg-clover"
            style={{
              left: `${c.left}%`,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              fontSize: `${c.size}px`,
              '--rot': `${c.rotate}deg`,
            }}
          >🍀</span>
        ))}
      </div>

      <div className="egg-card" onClick={e => e.stopPropagation()}>
        <div className="egg-clover-big">🍀</div>
        <div className="egg-title">darkclover</div>
        <div className="egg-subtitle">Easter egg unlocked</div>
        <p className="egg-desc">
          You found the hidden signature.<br />
          In-game, in code — always darkclover.
        </p>
        <button className="egg-close" onClick={onDismiss}>✕ Close</button>
      </div>
    </div>,
    document.body
  );
}
