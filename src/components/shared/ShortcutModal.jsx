/**
 * ShortcutModal — keyboard shortcut cheatsheet, opened via ? key.
 */
import { useEffect } from 'react';

const SHORTCUTS = [
  {
    section: 'Navigation',
    rows: [
      { keys: ['1','2','3','4','5','6'], desc: 'Switch to tab (About/Skills/Exp/Projects/Edu/Contact)' },
      { keys: ['G'], desc: 'Go to GUI dashboard' },
      { keys: ['T'], desc: 'Go to terminal / CLI' },
      { keys: ['←', '→'], desc: 'Previous / next tab' },
    ],
  },
  {
    section: 'Dashboard',
    rows: [
      { keys: ['Cmd/Ctrl', 'K'], desc: 'Open command palette' },
      { keys: ['?'], desc: 'Show this shortcuts panel' },
      { keys: ['Esc'], desc: 'Close any overlay' },
    ],
  },
  {
    section: 'Terminal',
    rows: [
      { keys: ['↑', '↓'], desc: 'Navigate command history' },
      { keys: ['Tab'], desc: 'Autocomplete command' },
      { keys: ['Ctrl', 'L'], desc: 'Clear terminal (type clear)' },
    ],
  },
  {
    section: 'Easter eggs',
    rows: [
      { keys: ['🍀'], desc: 'Click the clover (top-right) for a surprise' },
      { keys: ['↑↑↓↓←→←→BA'], desc: 'Konami code' },
      { keys: ['darkclover'], desc: 'Type in terminal' },
    ],
  },
];

export default function ShortcutModal({ onClose }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' || e.key === '?') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="shortcut-overlay" onClick={onClose}>
      <div className="shortcut-modal" onClick={e => e.stopPropagation()}>
        <h2 className="shortcut-modal-title">
          <i className="fas fa-keyboard" /> Keyboard Shortcuts
        </h2>

        {SHORTCUTS.map(sec => (
          <div className="shortcut-section" key={sec.section}>
            <div className="shortcut-section-label">{sec.section}</div>
            {sec.rows.map((row, i) => (
              <div className="shortcut-row" key={i}>
                <span className="shortcut-desc">{row.desc}</span>
                <span className="shortcut-keys">
                  {row.keys.map((k, j) => (
                    <span key={j}>
                      <kbd>{k}</kbd>
                      {j < row.keys.length - 1 && <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: '0 2px' }}>+</span>}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        ))}

        <p className="shortcut-close-hint">Press <kbd>?</kbd> or <kbd>Esc</kbd> to close</p>
      </div>
    </div>
  );
}
