import { useRef, useEffect, useMemo } from 'react';
import { useSysMon } from '../../../hooks/useSysMon.js';

function LineChart({ data, color, max = 100, height = 80 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width } = canvas;
    ctx.clearRect(0, 0, width, height);

    // fill
    ctx.beginPath();
    ctx.moveTo(0, height);
    data.forEach((v, i) => {
      ctx.lineTo((i / (data.length - 1)) * width, height - (v / max) * height);
    });
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = color.replace('1)', '0.15)');
    ctx.fill();

    // line
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (v / max) * height;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, [data, color, max, height]);

  return <canvas ref={canvasRef} width={300} height={height} style={{ width: '100%', height }} />;
}

export default function SysMonTab({ active, getAccentRgb }) {
  const { cpuData, ramData, cpuVal, ramVal } = useSysMon(active);
  const accent = `rgba(${getAccentRgb?.() || '59,241,59'}, 1)`;

  // Derive 4-core loads from cpuVal with slight variance
  const coreLoads = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => {
      const variance = (Math.sin(Date.now() / 1000 + i) * 12) + (Math.random() * 8 - 4);
      return Math.max(2, Math.min(99, Math.round(cpuVal + variance)));
    });
  }, [cpuVal]);

  return (
    <div className="tab-panel" id="sysmon-panel">
      <h2 className="tab-title"><i className="fas fa-tachometer-alt" /> System Monitor</h2>
      <div className="sysmon-grid">
        <div className="sysmon-card">
          <div className="sysmon-header">
            <span><i className="fas fa-microchip" /> CPU Usage</span>
            <span className="sysmon-val">{cpuVal}%</span>
          </div>
          <LineChart data={cpuData} color={accent} />

          {/* 4-Core Threads Grid */}
          <div className="sysmon-cores-container">
            <span className="sysmon-cores-title">Core Threads (Logical Processors)</span>
            <div className="sysmon-cores-grid">
              {coreLoads.map((load, idx) => (
                <div key={idx} className="sysmon-core-row">
                  <span className="sysmon-core-label">CPU{idx}</span>
                  <div className="sysmon-core-bar-bg">
                    <div 
                      className="sysmon-core-bar-fill" 
                      style={{ 
                        width: `${load}%`, 
                        background: `rgba(${getAccentRgb?.() || '59,241,59'}, 0.85)`,
                        boxShadow: `0 0 8px rgba(${getAccentRgb?.() || '59,241,59'}, 0.4)`
                      }} 
                    />
                  </div>
                  <span className="sysmon-core-val">{load}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sysmon-card">
          <div className="sysmon-header">
            <span><i className="fas fa-memory" /> RAM Usage</span>
            <span className="sysmon-val">{ramVal}%</span>
          </div>
          <LineChart data={ramData} color={accent} />
        </div>
      </div>
      <div className="sysmon-info">
        <div className="sysmon-info-item"><i className="fas fa-server" /> Simulated telemetry — updates every 800ms</div>
        <div className="sysmon-info-item"><i className="fas fa-clock" /> Data window: 60s</div>
      </div>
    </div>
  );
}
