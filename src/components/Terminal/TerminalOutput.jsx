import { useEffect, useRef } from 'react';

export default function TerminalOutput({ lines }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div className="terminal-output" role="log" aria-live="polite">
      {lines.map(l => (
        <div key={l.id} className={[`terminal-line terminal-line--${l.type}`, l.glitch ? 'terminal-line--glitch' : ''].filter(Boolean).join(' ')}>
          {l.type === 'ascii'
            ? <pre className="ascii-art">{l.text}</pre>
            : <span dangerouslySetInnerHTML={{ __html: l.html || l.text || '' }} />
          }
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
