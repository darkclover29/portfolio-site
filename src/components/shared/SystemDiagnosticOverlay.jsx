import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const DIAGNOSTICS = [
  'INITIALIZING DIAGNOSTIC BYPASS...',
  'SECURITY PROTOCOL OVERRIDE: SUCCESS',
  'ESTABLISHING VFS INTEGRITY LINK...',
  'VFS SHA256 SECTOR INTEGRITY: VERIFIED',
  'ALLOCATING DYNAMIC COMPILER AST STACK...',
  'COMPILER AST TELEMETRY LAYOUT: OK',
  'CALIBRATING ANTIGRAVITY PROPULSION...',
  'ANTIGRAVITY COEFFICIENT: 1.00 [STABLE]',
  'DIAGNOSTIC STATUS: ALL SYSTEMS NOMINAL',
];

export default function SystemDiagnosticOverlay({ onDismiss }) {
  const [phase, setPhase] = useState('scan'); // scan -> active -> fading

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
    <div className={`diag-overlay diag-overlay--${phase}`} onClick={onDismiss}>
      {/* Laser scan line */}
      <div className="diag-scan-line" />

      {/* Grid background effect */}
      <div className="diag-grid-effect" />

      {/* Diagnostic panel */}
      <div className="diag-panel" onClick={e => e.stopPropagation()}>
        <div className="diag-header-row">
          <span className="diag-header-pulse" />
          <h3 className="diag-title">SYSTEM DIAGNOSTIC SCAN</h3>
        </div>

        <div className="diag-terminal">
          {DIAGNOSTICS.map((line, i) => (
            <div key={line} className="diag-terminal-line" style={{ animationDelay: `${0.4 + i * 0.15}s` }}>
              <span className="diag-terminal-prompt">&gt;</span> {line}
            </div>
          ))}
        </div>

        <div className="diag-progress-bar">
          <div className="diag-progress-fill" />
        </div>

        <p className="diag-footer-text">Press Esc or click anywhere to exit</p>
      </div>
    </div>,
    document.body
  );
}
