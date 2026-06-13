import { useRef, useEffect } from 'react';
import { useSnake } from '../../hooks/useSnake.js';

const DIRS = {
  up:    { x: 0, y: -1 },
  down:  { x: 0, y: 1  },
  left:  { x: -1, y: 0 },
  right: { x: 1, y: 0  },
};

export default function SnakeGame({ getAccentRgb }) {
  const canvasRef = useRef(null);
  const { score, highScore, gameOver, running, startGame, pushDir, handleKey, CELL, GRID_W, GRID_H } = useSnake(canvasRef, true, getAccentRgb);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div className="snake-container">
      <div className="snake-scoreboard">
        <span>Score: <b>{score}</b></span>
        <span>Best: <b>{highScore}</b></span>
        {!running && (
          <button className="btn-accent" onClick={startGame}>
            {gameOver ? 'Restart' : 'Start Game'}
          </button>
        )}
      </div>
      <canvas
        ref={canvasRef}
        className="snake-canvas"
        width={CELL * GRID_W}
        height={CELL * GRID_H}
        style={{ display: 'block', margin: '0 auto' }}
      />
      {gameOver && <div className="snake-gameover">GAME OVER — Score: {score}</div>}
      <div className="dpad">
        <button className="dpad-btn dpad-up"    onPointerDown={() => pushDir(DIRS.up)}>▲</button>
        <button className="dpad-btn dpad-left"  onPointerDown={() => pushDir(DIRS.left)}>◀</button>
        <button className="dpad-btn dpad-right" onPointerDown={() => pushDir(DIRS.right)}>▶</button>
        <button className="dpad-btn dpad-down"  onPointerDown={() => pushDir(DIRS.down)}>▼</button>
      </div>
    </div>
  );
}
