import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const WARNINGS = [
  'DEMONIC INFUSION: 100%',
  'ANTI-MAGIC DETECTED',
  'GRIMOIRE: 5-LEAF UNLOCKED',
  'ASTA AWAKENED',
  'DEVIL UNION: ACTIVE',
];

export default function DemonForm({ onDismiss }) {
  const [phase, setPhase] = useState('slash'); // slash -> active -> fading

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('active'), 600);
    const t2 = setTimeout(() => setPhase('fading'), 4000);
    const t3 = setTimeout(onDismiss, 4600);
    const esc = (e) => { if (e.key === 'Escape') onDismiss(); };
    window.addEventListener('keydown', esc);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      window.removeEventListener('keydown', esc);
    };
  }, [onDismiss]);

  return createPortal(
    <div className={`demon-overlay demon-overlay--${phase}`} onClick={onDismiss}>

      {/* The slash */}
      <div className="demon-slash" />

      {/* Left dark half */}
      <div className="demon-half demon-half--left" />

      {/* Warning panel */}
      <div className="demon-panel" onClick={e => e.stopPropagation()}>
        <div className="demon-icon">
          <span className="demon-eye">👁</span>
        </div>
        <div className="demon-warnings">
          {WARNINGS.map((w, i) => (
            <div key={w} className="demon-warn-line" style={{ animationDelay: `${0.6 + i * 0.15}s` }}>
              <span className="demon-warn-bullet">&#9632;</span> {w}
            </div>
          ))}
        </div>
        <div className="demon-bar">
          <div className="demon-bar-fill" />
        </div>
        <p className="demon-sub">Click anywhere or press Esc to dismiss</p>
      </div>
    </div>,
    document.body
  );
}
