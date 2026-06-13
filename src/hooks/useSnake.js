import { useState, useRef, useCallback, useEffect } from 'react';

const CELL = 16;
const GRID_W = 20;
const GRID_H = 18;

function randomFood(snake) {
  let pos;
  do {
    pos = { x: Math.floor(Math.random() * GRID_W), y: Math.floor(Math.random() * GRID_H) };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
}

export function useSnake(canvasRef, active, getAccentRgb) {
  const [score, setScore]     = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('harsh_snake_hs') || '0'));
  const [gameOver, setGameOver] = useState(false);
  const [running, setRunning] = useState(false);

  const snakeRef    = useRef([{ x: 10, y: 9 }, { x: 9, y: 9 }]);
  const dirRef      = useRef({ x: 1, y: 0 });
  const queueRef    = useRef([]);
  const foodRef     = useRef({ x: 5, y: 5 });
  const scoreRef    = useRef(0);
  const rafRef      = useRef(null);
  const lastRef     = useRef(0);
  const speedRef    = useRef(150);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const accentRgb = getAccentRgb();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // grid
    ctx.strokeStyle = `rgba(${accentRgb}, 0.06)`;
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= GRID_W; x++) {
      ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, GRID_H * CELL); ctx.stroke();
    }
    for (let y = 0; y <= GRID_H; y++) {
      ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(GRID_W * CELL, y * CELL); ctx.stroke();
    }

    // food
    const f = foodRef.current;
    ctx.fillStyle = `rgba(${accentRgb}, 0.9)`;
    ctx.fillRect(f.x * CELL + 2, f.y * CELL + 2, CELL - 4, CELL - 4);

    // snake
    snakeRef.current.forEach((seg, i) => {
      const alpha = i === 0 ? 1 : Math.max(0.3, 1 - i * 0.04);
      ctx.fillStyle = `rgba(${accentRgb}, ${alpha})`;
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });
  }, [canvasRef, getAccentRgb]);

  const step = useCallback((ts) => {
    if (!running) return;
    if (ts - lastRef.current >= speedRef.current) {
      lastRef.current = ts;

      // consume direction queue
      while (queueRef.current.length) {
        const next = queueRef.current.shift();
        if (next.x !== -dirRef.current.x || next.y !== -dirRef.current.y) {
          dirRef.current = next;
          break;
        }
      }

      const head = snakeRef.current[0];
      const newHead = { x: head.x + dirRef.current.x, y: head.y + dirRef.current.y };

      // wall collision
      if (newHead.x < 0 || newHead.x >= GRID_W || newHead.y < 0 || newHead.y >= GRID_H ||
          snakeRef.current.some(s => s.x === newHead.x && s.y === newHead.y)) {
        setRunning(false);
        setGameOver(true);
        if (scoreRef.current > parseInt(localStorage.getItem('harsh_snake_hs') || '0')) {
          localStorage.setItem('harsh_snake_hs', String(scoreRef.current));
          setHighScore(scoreRef.current);
        }
        return;
      }

      const ate = newHead.x === foodRef.current.x && newHead.y === foodRef.current.y;
      snakeRef.current = [newHead, ...snakeRef.current.slice(0, ate ? undefined : -1)];
      if (ate) {
        scoreRef.current += 10;
        setScore(scoreRef.current);
        foodRef.current = randomFood(snakeRef.current);
        speedRef.current = Math.max(70, speedRef.current - 2);
      }
    }
    draw();
    rafRef.current = requestAnimationFrame(step);
  }, [running, draw]);

  useEffect(() => {
    if (running) {
      rafRef.current = requestAnimationFrame(step);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [running, step]);

  const startGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 9 }, { x: 9, y: 9 }];
    dirRef.current   = { x: 1, y: 0 };
    queueRef.current = [];
    foodRef.current  = randomFood(snakeRef.current);
    scoreRef.current = 0;
    speedRef.current = 150;
    setScore(0);
    setGameOver(false);
    setRunning(true);
  }, []);

  const pushDir = useCallback((dir) => {
    queueRef.current.push(dir);
  }, []);

  const handleKey = useCallback((e) => {
    const map = {
      ArrowUp:    { x: 0, y: -1 }, w: { x: 0, y: -1 },
      ArrowDown:  { x: 0, y: 1  }, s: { x: 0, y: 1  },
      ArrowLeft:  { x: -1, y: 0 }, a: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0  }, d: { x: 1, y: 0  },
    };
    const dir = map[e.key];
    if (dir) { e.preventDefault(); pushDir(dir); }
  }, [pushDir]);

  return { score, highScore, gameOver, running, startGame, pushDir, handleKey, CELL, GRID_W, GRID_H };
}
