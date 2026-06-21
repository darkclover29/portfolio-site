import { useRef, useEffect, useCallback } from 'react';
import { useSnake } from '../../hooks/useSnake.js';

const DIRS = {
  up:    { x: 0, y: -1 },
  down:  { x: 0, y: 1  },
  left:  { x: -1, y: 0 },
  right: { x: 1, y: 0  },
};

export default function SnakeGame({ getAccentRgb }) {
  const canvasRef  = useRef(null);
  const touchRef   = useRef({ x: 0, y: 0 });

  const {
    score, highScore, gameOver, running, madaMada,
    startGame, pushDir, handleKey, CELL, GRID_W, GRID_H,
  } = useSnake(canvasRef, true, getAccentRgb);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // Touch-swipe detection on the canvas wrapper
  const onTouchStart = useCallback((e) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback((e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchRef.current.x;
    const dy = t.clientY - touchRef.current.y;
    if (Math.abs(dx) < 12 && Math.abs(dy) < 12) return; // tap — ignore
    if (Math.abs(dx) >= Math.abs(dy)) {
      pushDir(dx > 0 ? DIRS.right : DIRS.left);
    } else {
      pushDir(dy > 0 ? DIRS.down : DIRS.up);
    }
  }, [pushDir]);

  // Prevent virtual keyboard on D-pad press: preventDefault on pointerdown
  const dpad = useCallback((dir) => (e) => {
    e.preventDefault();
    pushDir(dir);
  }, [pushDir]);

  return (
    <div
      className="snake-container"
      // Prevent keyboard opening when user taps inside the game
      onFocus={(e) => { if (e.target !== document.activeElement) e.preventDefault(); }}
    >
      <div className="snake-scoreboard">
        <span>Score: <b>{score}</b></span>
        <span>Best: <b>{highScore}</b></span>
        {!running && !madaMada && (
          <button
            className="btn-accent"
            type="button"
            onPointerDown={(e) => e.preventDefault()}
            onClick={startGame}
          >
            {gameOver ? 'Restart' : 'Start Game'}
          </button>
        )}
      </div>

      <div
        className="snake-canvas-wrap"
        style={{ position: 'relative', display: 'inline-block', touchAction: 'none' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <canvas
          ref={canvasRef}
          className="snake-canvas"
          width={CELL * GRID_W}
          height={CELL * GRID_H}
          style={{ display: 'block', margin: '0 auto' }}
          tabIndex={-1}          /* prevent keyboard focus */
          aria-label="Snake game canvas"
        />

        {madaMada && (
          <div className="mada-overlay">
            <div className="mada-text">MADA MADA!</div>
            <div className="mada-sub">My magic is never giving up!</div>
            <div className="mada-score">Score saved: {score}</div>
            <div className="mada-hint">Reviving in a moment... (speed increased!)</div>
          </div>
        )}
      </div>

      {gameOver && <div className="snake-gameover">GAME OVER — Score: {score}</div>}

      {/* D-pad: preventDefault stops keyboard from opening on mobile */}
      <div className="dpad" style={{ touchAction: 'none', userSelect: 'none' }}>
        <button type="button" className="dpad-btn dpad-up"    onPointerDown={dpad(DIRS.up)}>&#9650;</button>
        <button type="button" className="dpad-btn dpad-left"  onPointerDown={dpad(DIRS.left)}>&#9668;</button>
        <button type="button" className="dpad-btn dpad-right" onPointerDown={dpad(DIRS.right)}>&#9658;</button>
        <button type="button" className="dpad-btn dpad-down"  onPointerDown={dpad(DIRS.down)}>&#9660;</button>
      </div>

      <p className="snake-hint">Swipe to steer &nbsp;·&nbsp; Arrow keys on desktop</p>
    </div>
  );
}
