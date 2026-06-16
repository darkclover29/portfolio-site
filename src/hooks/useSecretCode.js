import { useState, useEffect } from 'react';

const DARKCLOVER = 'darkclover';
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export function useSecretCode() {
  const [triggered, setTriggered] = useState(false);
  const [buf, setBuf] = useState('');

  useEffect(() => {
    const handler = (e) => {
      if (['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;
      const next = (buf + e.key).slice(-DARKCLOVER.length);
      setBuf(next);
      if (next === DARKCLOVER) { setTriggered(true); setBuf(''); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [buf]);

  return { triggered, dismiss: () => setTriggered(false) };
}

export function useKonamiCode() {
  const [activated, setActivated] = useState(false);
  const [buf, setBuf] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      if (['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;
      setBuf(prev => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(',') === KONAMI.join(',')) {
          setActivated(true);
          return [];
        }
        return next;
      });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return { activated, dismiss: () => setActivated(false) };
}
