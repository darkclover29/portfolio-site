import { useState, useEffect, useRef } from 'react';

const MAX_POINTS = 60;

function randBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export function useSysMon(active) {
  const [cpuData, setCpuData]   = useState(() => Array(MAX_POINTS).fill(0));
  const [ramData, setRamData]   = useState(() => Array(MAX_POINTS).fill(0));
  const [cpuVal, setCpuVal]     = useState(0);
  const [ramVal, setRamVal]     = useState(0);
  const cpuTrend = useRef(30);
  const ramTrend = useRef(50);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      cpuTrend.current = Math.max(5, Math.min(95, cpuTrend.current + randBetween(-8, 8)));
      ramTrend.current = Math.max(20, Math.min(85, ramTrend.current + randBetween(-3, 3)));
      const cpu = Math.round(cpuTrend.current + randBetween(-5, 5));
      const ram = Math.round(ramTrend.current + randBetween(-2, 2));
      setCpuVal(cpu);
      setRamVal(ram);
      setCpuData(prev => [...prev.slice(1), cpu]);
      setRamData(prev => [...prev.slice(1), ram]);
    }, 800);
    return () => clearInterval(id);
  }, [active]);

  return { cpuData, ramData, cpuVal, ramVal, MAX_POINTS };
}
