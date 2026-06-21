import { useState, useRef, useCallback, useEffect } from 'react';

export default function TerminalInput({ pwd, history, histIdx, setHistIdx, onSubmit, allCommands, playKeypress, playMechKey, gameActive }) {
  const [value, setValue] = useState('');
  const [ghost, setGhost] = useState('');
  const inputRef = useRef(null);

  const computeGhost = useCallback((val) => {
    if (!val.trim()) { setGhost(''); return; }
    const parts = val.split(/\s+/);
    if (parts.length === 1) {
      const first = parts[0];
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
    playMechKey?.();
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      onSubmit(value);
      setValue('');
      setGhost('');
      // Blur immediately on mobile — dismisses keyboard before game overlay renders
      // Re-focus happens automatically if no game opens (user taps terminal again)
      const isMobile = window.matchMedia('(pointer: coarse)').matches;
      if (isMobile) {
        inputRef.current?.blur();
        document.activeElement?.blur();
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (ghost) { setValue(value + ghost); setGhost(''); }
    } else if (e.key === 'Escape') {
      setGhost('');
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
  }, [value, ghost, history, histIdx, setHistIdx, onSubmit]);

  // Also blur when game becomes active (belt-and-suspenders)
  useEffect(() => {
    if (gameActive) {
      inputRef.current?.blur();
      document.activeElement?.blur();
    }
  }, [gameActive]);

  // Click anywhere in terminal body focuses input (unless game is open)
  useEffect(() => {
    const el = inputRef.current?.closest('.terminal-body');
    if (!el) return;
    const focus = (e) => {
      if (gameActive) return;
      if (e.target.closest('.game-overlay')) return;
      inputRef.current?.focus();
    };
    el.addEventListener('click', focus);
    return () => el.removeEventListener('click', focus);
  }, [gameActive]);

  // Scroll input into view when mobile keyboard opens
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const handler = () => {
      if (vv.height < window.innerHeight * 0.75)
        setTimeout(() => inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    };
    vv.addEventListener('resize', handler);
    return () => vv.removeEventListener('resize', handler);
  }, []);

  return (
    <div className="terminal-input-block">
      <div className="terminal-input-row">
        <span className="prompt-label">
          <span className="prompt-user">harsh@portfolio</span>
          <span className="prompt-sep">:</span>
          <span className="prompt-dir">{pwd}</span>
          <span className="prompt-sep">$</span>
        </span>
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
          inputMode="text"
          tabIndex={gameActive ? -1 : 0}
          readOnly={gameActive}
        />
      </div>
      {ghost && !gameActive && (
        <div className="terminal-suggestion" role="tooltip" aria-live="polite">
          <span className="tsug-typed">{value}</span>
          <span className="tsug-ghost">{ghost}</span>
          <kbd className="tsug-key">Tab</kbd>
        </div>
      )}
    </div>
  );
}
