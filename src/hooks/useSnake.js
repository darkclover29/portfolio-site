import { useState, useRef, useCallback, useEffect } from 'react';

const CELL   = 16;
const GRID_W = 20;
const GRID_H = 18;

function randomFood(snake) {
  let pos;
  do {
    pos = { x: Math.floor(Math.random() * GRID_W), y: Math.floor(Math.random() * GRID_H) };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
}

export function useSnake(canvasRef, _active, getAccentRgb) {
  const [score,     setScore]     = useState(0);
  const [highScore, setHighScore] = useState(() =>
    parseInt(localStorage.getItem('harsh_snake_hs') || '0')
  );
  const [gameOver,  setGameOver]  = useState(false);
  const [running,   setRunning]   = useState(false);
  const [madaMada,  setMadaMada]  = useState(false);

  // ── All mutable game state in refs so the loop is stable ──
  const snakeRef     = useRef([{ x: 10, y: 9 }, { x: 9, y: 9 }]);
  const dirRef       = useRef({ x: 1, y: 0 });
  const queueRef     = useRef([]);
  const foodRef      = useRef({ x: 5, y: 5 });
  const scoreRef     = useRef(0);
  const rafRef       = useRef(null);
  const lastRef      = useRef(0);
  const speedRef     = useRef(150);
  const runningRef   = useRef(false);
  const revivedRef   = useRef(false);
  const pendingRevRef= useRef(false); // prevents double revive
  const accentRef    = useRef(getAccentRgb);

  // Keep accent getter current without destabilising loop
  useEffect(() => { accentRef.current = getAccentRgb; }, [getAccentRgb]);

  // ── Stable RAF loop — created ONCE, never recreated ────────
  // All game state read from refs; React state updated only for UI
  const loop = useCallback((ts) => {
    const canvas = canvasRef.current;

    if (runningRef.current && ts - lastRef.current >= speedRef.current) {
      lastRef.current = ts;

      // Drain direction queue (skip 180-degree reversal)
      while (queueRef.current.length) {
        const next = queueRef.current.shift();
        if (next.x !== -dirRef.current.x || next.y !== -dirRef.current.y) {
          dirRef.current = next;
          break;
        }
      }

      const head = snakeRef.current[0];
      const nx   = head.x + dirRef.current.x;
      const ny   = head.y + dirRef.current.y;
      const wall = nx < 0 || nx >= GRID_W || ny < 0 || ny >= GRID_H;
      const self = snakeRef.current.some(s => s.x === nx && s.y === ny);

      if (wall || self) {
        runningRef.current = false;
        setRunning(false);

        if (!revivedRef.current && !pendingRevRef.current) {
          revivedRef.current  = true;
          pendingRevRef.current = true;
          setMadaMada(true);

          setTimeout(() => {
            // Inline revive — no stale closure, pure ref mutation
            snakeRef.current   = [{ x: 10, y: 9 }, { x: 9, y: 9 }];
            dirRef.current     = { x: 1, y: 0 };
            queueRef.current   = [];
            foodRef.current    = randomFood(snakeRef.current);
            speedRef.current   = Math.max(60, speedRef.current * 0.8);
            lastRef.current    = 0;
            pendingRevRef.current = false;
            runningRef.current = true;
            setRunning(true);
            setMadaMada(false);
            setGameOver(false);
          }, 2500);
        } else if (!pendingRevRef.current) {
          // Second death
          setGameOver(true);
          const s  = scoreRef.current;
          const hs = parseInt(localStorage.getItem('harsh_snake_hs') || '0');
          if (s > hs) {
            localStorage.setItem('harsh_snake_hs', String(s));
            setHighScore(s);
          }
        }
      } else {
        const newHead = { x: nx, y: ny };
        const ate     = nx === foodRef.current.x && ny === foodRef.current.y;
        snakeRef.current = [newHead, ...snakeRef.current.slice(0, ate ? undefined : -1)];
        if (ate) {
          scoreRef.current += 10;
          setScore(scoreRef.current);
          foodRef.current  = randomFood(snakeRef.current);
          speedRef.current = Math.max(70, speedRef.current - 2);
        }
      }
    }

    // ── Draw every frame (idle shows last state) ──────────────
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const rgb = accentRef.current?.() || '0,255,65';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = `rgba(${rgb}, 0.06)`;
      ctx.lineWidth   = 0.5;
      for (let x = 0; x <= GRID_W; x++) {
        ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, GRID_H * CELL); ctx.stroke();
      }
      for (let y = 0; y <= GRID_H; y++) {
        ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(GRID_W * CELL, y * CELL); ctx.stroke();
      }

      // Food
      const f = foodRef.current;
      ctx.fillStyle = `rgba(${rgb}, 0.9)`;
      ctx.fillRect(f.x * CELL + 2, f.y * CELL + 2, CELL - 4, CELL - 4);

      // Snake body
      snakeRef.current.forEach((seg, i) => {
        const alpha = i === 0 ? 1 : Math.max(0.3, 1 - i * 0.04);
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
      });
    }

    rafRef.current = requestAnimationFrame(loop);
  }, [canvasRef]); // stable — only depends on canvasRef

  // Mount once, clean up on unmount
  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [loop]); // loop is stable → this runs exactly once

  const startGame = useCallback(() => {
    snakeRef.current      = [{ x: 10, y: 9 }, { x: 9, y: 9 }];
    dirRef.current        = { x: 1, y: 0 };
    queueRef.current      = [];
    foodRef.current       = randomFood(snakeRef.current);
    scoreRef.current      = 0;
    speedRef.current      = 150;
    lastRef.current       = 0;
    revivedRef.current    = false;
    pendingRevRef.current = false;
    runningRef.current    = true;
    setScore(0);
    setGameOver(false);
    setMadaMada(false);
    setRunning(true);
  }, []);

  const pushDir = useCallback((dir) => { queueRef.current.push(dir); }, []);

  const handleKey = useCallback((e) => {
    const map = {
      ArrowUp:    { x: 0, y: -1 }, w: { x: 0, y: -1 },
      ArrowDown:  { x: 0, y:  1 }, s: { x: 0, y:  1 },
      ArrowLeft:  { x: -1, y: 0 }, a: { x: -1, y: 0 },
      ArrowRight: { x:  1, y: 0 }, d: { x:  1, y: 0 },
    };
    const dir = map[e.key];
    if (dir) { e.preventDefault(); pushDir(dir); }
  }, [pushDir]);

  return { score, highScore, gameOver, running, madaMada, startGame, pushDir, handleKey, CELL, GRID_W, GRID_H };
}
