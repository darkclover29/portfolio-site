import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: '> Scanning for unknown signature...', delay: 0 },
  { text: '> Pattern match: ████████████ FOUND', delay: 520 },
  { text: '> Cross-referencing identity matrix...', delay: 980 },
  { text: '> ACCESS GRANTED — identity: darkclover', delay: 1500, accent: true },
  { text: '> Decrypting personal payload...', delay: 2000 },
  { text: '> Done. Welcome to the other side.', delay: 2480, dim: true },
];

const FACTS = [
  { icon: '🎮', label: 'Currently playing', value: 'Black Myth Wukong' },
  { icon: '🎧', label: 'Soundtrack', value: 'Lo-fi × Metal (it works)' },
  { icon: '📺', label: 'Watching', value: 'Oshi No Ko' },
  { icon: '☕', label: 'Fuel', value: 'Coffee × 3 / day' },
  { icon: '🌙', label: 'Peak hours', value: '11 PM – 3 AM' },
  { icon: '🔤', label: 'Editor font', value: 'JetBrains Mono' },
];

function BootLine({ text, accent, dim, index }) {
  const [visible, setVisible] = useState(false);
  const [chars, setChars] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    setVisible(true);
    let i = 0;
    const tick = () => {
      i += 1;
      setChars(text.slice(0, i));
      if (i < text.length) timerRef.current = setTimeout(tick, 18);
    };
    timerRef.current = setTimeout(tick, 40);
    return () => clearTimeout(timerRef.current);
  }, [text]);

  if (!visible) return null;
  return (
    <div
      className={`dc-boot-line${accent ? ' dc-boot-accent' : ''}${dim ? ' dc-boot-dim' : ''}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <span>{chars}</span>
      {chars.length < text.length && <span className="dc-boot-cursor">▋</span>}
    </div>
  );
}

export default function DarkCloverEgg({ onDismiss }) {
  const [phase, setPhase] = useState('boot'); // 'boot' | 'reveal' | 'exit'
  const [visibleLines, setVisibleLines] = useState([]);
  const phaseRef = useRef('boot');

  // Schedule each boot line appearance
  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay)
    );
    // Reveal the profile card after last line + short pause
    const revealTimer = setTimeout(() => {
      setPhase('reveal');
      phaseRef.current = 'reveal';
    }, BOOT_LINES[BOOT_LINES.length - 1].delay + 900);
    // Auto-dismiss
    const dismissTimer = setTimeout(() => {
      if (phaseRef.current !== 'exit') {
        setPhase('exit');
        phaseRef.current = 'exit';
        setTimeout(onDismiss, 600);
      }
    }, 13000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(revealTimer);
      clearTimeout(dismissTimer);
    };
  }, [onDismiss]);

  // ESC to dismiss
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') handleDismiss();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const handleDismiss = () => {
    if (phaseRef.current === 'exit') return;
    setPhase('exit');
    phaseRef.current = 'exit';
    setTimeout(onDismiss, 500);
  };

  return createPortal(
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="dc-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.35 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          onClick={handleDismiss}
        >
          {/* Scanlines */}
          <div className="dc-scanlines" aria-hidden="true" />

          {/* Boot terminal */}
          <div className="dc-terminal" onClick={e => e.stopPropagation()}>
            <div className="dc-term-bar">
              <span className="dc-term-dot dc-dot-red" />
              <span className="dc-term-dot dc-dot-yellow" />
              <span className="dc-term-dot dc-dot-green" />
              <span className="dc-term-title">darkclover — bash — 80×24</span>
            </div>
            <div className="dc-term-body">
              {BOOT_LINES.map((line, i) =>
                visibleLines.includes(i) && (
                  <BootLine key={i} index={i} {...line} />
                )
              )}
            </div>
          </div>

          {/* Profile card — slides in after boot */}
          <AnimatePresence>
            {phase === 'reveal' && (
              <motion.div
                className="dc-card"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                onClick={e => e.stopPropagation()}
              >
                <div className="dc-card-header">
                  <div className="dc-glitch-wrap" aria-label="DARKCLOVER">
                    <span className="dc-glitch" data-text="DARKCLOVER">DARKCLOVER</span>
                  </div>
                  <p className="dc-card-sub">the person behind the portfolio</p>
                </div>

                <div className="dc-divider" />

                <div className="dc-facts">
                  {FACTS.map(f => (
                    <div key={f.label} className="dc-fact">
                      <span className="dc-fact-icon">{f.icon}</span>
                      <div className="dc-fact-text">
                        <span className="dc-fact-label">{f.label}</span>
                        <span className="dc-fact-value">{f.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="dc-divider" />

                <div className="dc-card-footer">
                  <a
                    href="https://github.com/darkclover29"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dc-footer-link"
                    onClick={e => e.stopPropagation()}
                  >
                    <i className="fa-brands fa-github" /> darkclover29
                  </a>
                  <button className="dc-close-btn" onClick={handleDismiss}>
                    ESC to exit
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="dc-hint">Press ESC or click outside to close</div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
