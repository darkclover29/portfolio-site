import { useState, useEffect } from 'react';

/**
 * Shared IST clock component — displays current India Standard Time.
 * Accepts an optional className for the wrapper element.
 */
export default function ISTClock({ className = 'sidebar-clock' }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
      }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <div className={className} aria-label={`Current time in India: ${time}`}>{time} IST</div>;
}
