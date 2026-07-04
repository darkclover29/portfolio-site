import { useState, useEffect, useRef } from 'react';

const ASCII_LOGO = `
  ██╗  ██╗████████╗
  ██║  ██║╚══██╔══╝
  ███████║   ██║
  ██╔══██║   ██║
  ██║  ██║   ██║
  ╚═╝  ╚═╝   ╚═╝
`;

const BOOT_LINES = [
  { text: 'BIOS v2.1.4 — Portfolio OS Initializing…',         delay: 0,    color: 'muted' },
  { text: 'Loading kernel modules…',                           delay: 100,  color: 'muted' },
  { text: 'Mounting virtual file system…',                     delay: 200,  color: 'muted' },
  { text: '[  OK  ] Started portfolio service daemon.',        delay: 300,  color: 'ok'    },
  { text: '[  OK  ] Connected to harshtiwari493@gmail.com',    delay: 400,  color: 'ok'    },
  { text: '[  OK  ] Loaded 4 projects, 16 skills, 2 roles.',   delay: 500,  color: 'ok'    },
  { text: 'Initializing UI renderer…',                         delay: 600,  color: 'muted' },
  { text: '[ WARN ] Matrix rain canvas: experimental mode.',   delay: 700,  color: 'warn'  },
  { text: '[  OK  ] Theme engine ready — matrix theme active.',delay: 800,  color: 'ok'    },
  { text: '>>> SYSTEM READY. Welcome, visitor.',               delay: 950,  color: 'accent'},
];

const BOOT_SEEN_KEY = 'ht_boot_seen';

export default function BootSequence({ onDone }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [logoVisible, setLogoVisible]   = useState(false);
  const [fading, setFading]             = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (!doneRef.current) {
      doneRef.current = true;
      sessionStorage.setItem(BOOT_SEEN_KEY, '1');
      onDone();
    }
  };

  useEffect(() => {
    // Skip entirely if prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      finish();
      return;
    }

    // Fade in logo quickly
    const logoTimer = setTimeout(() => setLogoVisible(true), 30);

    // Schedule each boot line
    const timers = BOOT_LINES.map(({ text, delay, color }, i) =>
      setTimeout(() => {
        setVisibleLines(prev => [...prev, { text, color, i }]);
      }, delay + 100)
    );

    // After last line, pause then fade out
    const lastDelay = BOOT_LINES[BOOT_LINES.length - 1].delay + 100;
    const fadeTimer = setTimeout(() => setFading(true), lastDelay + 300);
    const doneTimer = setTimeout(finish, lastDelay + 500);

    return () => {
      clearTimeout(logoTimer);
      timers.forEach(clearTimeout);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []); // eslint-disable-line

  if (doneRef.current) return null;

  return (
    <div className={`boot-overlay${fading ? ' boot-overlay--fade' : ''}`} role="status" aria-label="Loading portfolio">
      <div className="boot-inner">
        <pre className={`boot-ascii${logoVisible ? ' boot-ascii--visible' : ''}`} aria-hidden="true">
          {ASCII_LOGO}
        </pre>
        <div className="boot-name">HARSH TIWARI // PORTFOLIO OS</div>

        <div className="boot-lines" aria-live="polite" aria-atomic="false">
          {visibleLines.map(({ text, color, i }) => (
            <div key={i} className={`boot-line boot-line--${color}`}>
              <span className="boot-line-text">{text}</span>
            </div>
          ))}
          <div className="boot-cursor" aria-hidden="true" />
        </div>

        <div className="boot-bar-wrap" aria-hidden="true">
          <div
            className="boot-bar-fill"
            style={{
              width: visibleLines.length
                ? `${Math.min(100, (visibleLines.length / BOOT_LINES.length) * 100)}%`
                : '0%',
            }}
          />
        </div>
        <div className="boot-pct" aria-hidden="true">
          {Math.min(100, Math.round((visibleLines.length / BOOT_LINES.length) * 100))}%
        </div>

        <button
          className="boot-skip-btn"
          onClick={finish}
          aria-label="Skip boot sequence"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
