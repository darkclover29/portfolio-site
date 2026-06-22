import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IDLE_MS = 10_000;

export default function HireMeCTA({ onNavigate }) {
  const [visible, setVisible]     = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const reset = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (dismissed) return;
    let timer = setTimeout(() => setVisible(true), IDLE_MS);

    const activity = () => {
      setVisible(false);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(true), IDLE_MS);
    };

    const events = ['mousemove', 'keydown', 'pointerdown', 'scroll', 'touchstart'];
    events.forEach(e => window.addEventListener(e, activity, { passive: true }));
    return () => {
      clearTimeout(timer);
      events.forEach(e => window.removeEventListener(e, activity));
    };
  }, [dismissed]);

  const dismiss = () => { setDismissed(true); setVisible(false); };

  const hire = () => {
    dismiss();
    onNavigate?.('contact');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="hire-cta"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 340, damping: 26 }}
        >
          <span className="hire-cta-dot" />
          <span className="hire-cta-text">Available for work</span>
          <button className="hire-cta-btn" onClick={hire}>Hire me</button>
          <button className="hire-cta-close" onClick={dismiss} aria-label="Dismiss">
            <i className="fas fa-xmark" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
