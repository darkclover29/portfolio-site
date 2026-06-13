import { useRef, useEffect } from 'react';
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
