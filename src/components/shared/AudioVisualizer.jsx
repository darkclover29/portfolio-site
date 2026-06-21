import { useRef, useEffect } from 'react';

export default function AudioVisualizer({ analyserRef, active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    let rafId;

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      ctx2d.clearRect(0, 0, W, H);

      const analyser = analyserRef?.current;
      const accentRaw = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim() || '#00ff41';

      if (!analyser || !active) {
        // flat idle line
        ctx2d.strokeStyle = accentRaw + '44';
        ctx2d.lineWidth = 1;
        ctx2d.beginPath();
        ctx2d.moveTo(0, H / 2);
        ctx2d.lineTo(W, H / 2);
        ctx2d.stroke();
        return;
      }

      const bins = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(bins);

      // draw waveform bars
      const barW = W / bins.length;
      bins.forEach((v, i) => {
        const barH = (v / 255) * H;
        const alpha = 0.4 + (v / 255) * 0.6;
        ctx2d.fillStyle = accentRaw + Math.round(alpha * 255).toString(16).padStart(2, '0');
        ctx2d.fillRect(i * barW, H - barH, Math.max(1, barW - 1), barH);
      });
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [analyserRef, active]);

  return (
    <canvas
      ref={canvasRef}
      width={96}
      height={24}
      className="audio-vis-canvas"
      title="Audio visualizer"
      aria-hidden="true"
    />
  );
}
