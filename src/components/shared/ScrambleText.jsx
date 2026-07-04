import { useState, useRef, useCallback } from 'react';
import { useFx } from '../../hooks/useFx.js';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

/**
 * ScrambleText — on hover, scrambles chars then resolves to real text.
 * Renders as plain text unless FX mode (easter egg) is on, so labels
 * stay readable by default.
 * Usage: <ScrambleText text="Contact Me" />
 * Or wrap children: <ScrambleText>Contact Me</ScrambleText>
 */
export default function ScrambleText({ text, children, className = '', tag: Tag = 'span', ...props }) {
  const fxOn = useFx();
  const label = text || (typeof children === 'string' ? children : '');
  const [display, setDisplay] = useState(label);
  const rafRef = useRef(null);
  const iterRef = useRef(0);

  const scramble = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    iterRef.current = 0;
    const totalIter = label.length * 2;

    const tick = () => {
      iterRef.current += 0.6;
      const resolved = Math.floor(iterRef.current / 2);
      setDisplay(
        label.split('').map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i < resolved) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      if (iterRef.current < totalIter) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(label);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [label]);

  const reset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setDisplay(label);
  }, [label]);

  if (!fxOn) {
    return <Tag className={className} {...props}>{label}</Tag>;
  }

  return (
    <Tag
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      style={{ fontVariantNumeric: 'tabular-nums', ...props.style }}
      {...props}
    >
      {display}
    </Tag>
  );
}
