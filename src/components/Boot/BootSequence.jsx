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
  { text: 'Loading kernel modules…',                           delay: 350,  color: 'muted' },
  { text: 'Mounting virtual file system…',                     delay: 700,  color: 'muted' },
  { text: '[  OK  ] Started portfolio service daemon.',        delay: 1050, color: 'ok'    },
  { text: '[  OK  ] Connected to harshtiwari493@gmail.com',    delay: 1350, color: 'ok'    },
  { text: '[  OK  ] Loaded 4 projects, 16 skills, 2 roles.',   delay: 1650, color: 'ok'    },
  { text: 'Initializing UI renderer…',                         delay: 1950, color: 'muted' },
  { text: '[ WARN ] Matrix rain canvas: experimental mode.',   delay: 2250, color: 'warn'  },
  { text: '[  OK  ] Theme engine ready — matrix theme active.',delay: 2550, color: 'ok'    },
  { text: '>>> SYSTEM READY. Welcome, visitor.',               delay: 2900, color: 'accent'},
];

export default function BootSequence({ onDone }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [logoVisible, setLogoVisible]   = useState(false);
  const [fading, setFading]             = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    // Fade in logo quickly
    const logoTimer = setTimeout(() => setLogoVisible(true), 80);

    // Schedule each boot line
    const timers = BOOT_LINES.map(({ text, delay, color }, i) =>
      setTimeout(() => {
        setVisibleLines(prev => [...prev, { text, color, i }]);
      }, delay + 300)
    );

    // After last line, pause then fade out
    const lastDelay = BOOT_LINES[BOOT_LINES.length - 1].delay + 300;
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, lastDelay + 800);

    const doneTimer = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone();
      }
    }, lastDelay + 1200);

    return () => {
      clearTimeout(logoTimer);
      timers.forEach(clearTimeout);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []); // eslint-disable-line

  return (
    <div className={`boot-overlay${fading ? ' boot-overlay--fade' : ''}`}>
      <div className="boot-inner">
        <pre className={`boot-ascii${logoVisible ? ' boot-ascii--visible' : ''}`}>
          {ASCII_LOGO}
        </pre>
        <div className="boot-name">HARSH TIWARI // PORTFOLIO OS</div>

        <div className="boot-lines">
          {visibleLines.map(({ text, color, i }) => (
            <div key={i} className={`boot-line boot-line--${color}`}>
              <span className="boot-line-text">{text}</span>
            </div>
          ))}
          <div className="boot-cursor" />
        </div>

        <div className="boot-bar-wrap">
          <div
            className="boot-bar-fill"
            style={{
              width: visibleLines.length
                ? `${Math.min(100, (visibleLines.length / BOOT_LINES.length) * 100)}%`
                : '0%',
            }}
          />
        </div>
        <div className="boot-pct">
          {Math.min(100, Math.round((visibleLines.length / BOOT_LINES.length) * 100))}%
        </div>
      </div>
    </div>
  );
}
