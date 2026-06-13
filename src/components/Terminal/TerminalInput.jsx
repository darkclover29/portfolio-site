import { useState, useRef, useCallback, useEffect } from 'react';

export default function TerminalInput({ pwd, history, histIdx, setHistIdx, onSubmit, allCommands, playKeypress }) {
  const [value, setValue] = useState('');
  const [ghost, setGhost] = useState('');
  const inputRef = useRef(null);

  const computeGhost = useCallback((val) => {
    if (!val.trim()) { setGhost(''); return; }
    const parts = val.split(/\s+/);
    const first = parts[0];
    if (parts.length === 1) {
      const match = allCommands.find(c => c.startsWith(first) && c !== first);
      setGhost(match ? match.slice(first.length) : '');
    } else {
      setGhost('');
    }
  }, [allCommands]);

  const handleChange = (e) => {
    setValue(e.target.value);
    computeGhost(e.target.value);
    playKeypress?.();
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      onSubmit(value);
      setValue('');
      setGhost('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (ghost) { setValue(v => v + ghost); setGhost(''); }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      if (history[next]) { setValue(history[next]); setGhost(''); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setValue(next === -1 ? '' : history[next] || '');
      setGhost('');
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      onSubmit('clear');
    }
  }, [value, ghost, history, histIdx, setHistIdx, onSubmit, playKeypress]);

  // focus on click anywhere in terminal
  useEffect(() => {
    const el = inputRef.current?.closest('.terminal-body');
    if (!el) return;
    const focus = () => inputRef.current?.focus();
    el.addEventListener('click', focus);
    return () => el.removeEventListener('click', focus);
  }, []);

  // auto-focus on mobile viewport resize
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const handler = () => {
      if (vv.height < window.innerHeight * 0.75) {
        setTimeout(() => inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
      }
    };
    vv.addEventListener('resize', handler);
    return () => vv.removeEventListener('resize', handler);
  }, []);

  return (
    <div className="terminal-input-row">
      <span className="prompt-label">
        <span className="prompt-user">harsh@portfolio</span>
        <span className="prompt-sep">:</span>
        <span className="prompt-dir">{pwd}</span>
        <span className="prompt-sep">$</span>
      </span>
      <div className="terminal-input-wrap">
        <input
          ref={inputRef}
          className="terminal-input"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal input"
        />
        {ghost && <span className="terminal-ghost" aria-hidden>{ghost}</span>}
      </div>
    </div>
  );
}
