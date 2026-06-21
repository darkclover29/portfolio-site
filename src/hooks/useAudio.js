import { useRef, useCallback, useEffect, useState } from 'react';

const BGM_KEY   = 'harsh_portfolio_bgm';
const MECH_KEY  = 'harsh_portfolio_mech';

export function useAudio() {
  const ctxRef        = useRef(null);
  const masterRef     = useRef(null);
  const analyserRef   = useRef(null);  // exported for AudioVisualizer

  const [muted,     setMuted]     = useState(true);
  const [mechKeys,  setMechKeys]  = useState(() => {
    try { return localStorage.getItem(MECH_KEY) === '1'; } catch { return false; }
  });
  const [bgmTrack, setBgmTrack] = useState(() => {
    try { return localStorage.getItem(BGM_KEY) || 'classic'; } catch { return 'classic'; }
  });

  // Bootstrap audio context + master gain + analyser on first use
  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const ctx     = new (window.AudioContext || window.webkitAudioContext)();
      const master  = ctx.createGain();
      const analyser = ctx.createAnalyser();
      analyser.fftSize        = 64;
      analyser.smoothingTimeConstant = 0.8;
      master.connect(analyser);
      analyser.connect(ctx.destination);
      ctxRef.current    = ctx;
      masterRef.current = master;
      analyserRef.current = analyser;
    }
    return ctxRef.current;
  }, []);

  // Internal: connect oscillator chain to master (not directly to ctx.destination)
  const dst = useCallback(() => masterRef.current, []);

  const playTone = useCallback((freq, type = 'sine', dur = 0.1, vol = 0.1, force = false) => {
    if (muted && !force) return;
    try {
      const ctx  = getCtx();
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(dst() || ctx.destination);
      osc.type = type; osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + dur + 0.01);
    } catch {}
  }, [muted, getCtx, dst]);

  const playKeypress = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx(); const now = ctx.currentTime; const d = dst() || ctx.destination;
      const c1 = ctx.createOscillator(), g1 = ctx.createGain();
      c1.type = 'triangle'; c1.frequency.setValueAtTime(1600, now);
      c1.frequency.exponentialRampToValueAtTime(600, now + 0.012);
      g1.gain.setValueAtTime(0.08, now); g1.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
      c1.connect(g1); g1.connect(d); c1.start(now); c1.stop(now + 0.02);
      const c2 = ctx.createOscillator(), g2 = ctx.createGain();
      c2.type = 'sine'; c2.frequency.setValueAtTime(130, now);
      c2.frequency.linearRampToValueAtTime(50, now + 0.02);
      g2.gain.setValueAtTime(0.12, now); g2.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
      c2.connect(g2); g2.connect(d); c2.start(now); c2.stop(now + 0.03);
    } catch {}
  }, [muted, getCtx, dst]);

  // Mechanical click — plays even when BGM is muted if mechKeys enabled
  const playMechKey = useCallback(() => {
    if (!mechKeys) return;
    try {
      const ctx = getCtx(); const now = ctx.currentTime; const d = dst() || ctx.destination;
      // Sharp attack "clack"
      const buf  = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.015), ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      const src  = ctx.createBufferSource();
      src.buffer = buf;
      const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 2000;
      const gain = ctx.createGain(); gain.gain.setValueAtTime(0.3, now);
      src.connect(hp); hp.connect(gain); gain.connect(d);
      src.start(now);
      // Sub thump
      const sub = ctx.createOscillator(), subG = ctx.createGain();
      sub.type = 'sine'; sub.frequency.setValueAtTime(180, now);
      sub.frequency.exponentialRampToValueAtTime(60, now + 0.02);
      subG.gain.setValueAtTime(0.1, now); subG.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
      sub.connect(subG); subG.connect(d); sub.start(now); sub.stop(now + 0.03);
    } catch { /* fallback */ try { playTone(800, 'square', 0.01, 0.04, true); } catch {} }
  }, [mechKeys, getCtx, dst, playTone]);

  const playEnter  = useCallback(() => playTone(800, 'triangle', 0.12, 0.1),  [playTone]);
  const playError  = useCallback(() => { playTone(110, 'sawtooth', 0.3, 0.18); playTone(113, 'sawtooth', 0.3, 0.18); }, [playTone]);
  const playChime  = useCallback(() => { playTone(880, 'sine', 0.15, 0.12); playTone(883, 'sine', 0.15, 0.12); }, [playTone]);
  const playClick  = useCallback(() => playTone(380, 'triangle', 0.06, 0.05), [playTone]);
  const playHover  = useCallback(() => playTone(1200, 'sine', 0.02, 0.015),   [playTone]);
  const playSynth  = useCallback((freq) => playTone(freq, 'sawtooth', 0.25, 0.08), [playTone]);

  const playFlip = useCallback((toGui) => {
    if (muted) return;
    try {
      const ctx = getCtx(); const now = ctx.currentTime; const d = dst() || ctx.destination;
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(toGui ? 180 : 440, now);
      osc.frequency.linearRampToValueAtTime(toGui ? 440 : 180, now + 0.3);
      gain.gain.setValueAtTime(0.08, now); gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      osc.connect(gain); gain.connect(d); osc.start(now); osc.stop(now + 0.4);
    } catch {}
  }, [muted, getCtx, dst]);

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      const next = !prev;
      if (ctxRef.current) {
        if (next) ctxRef.current.suspend?.();
        else      ctxRef.current.resume?.();
      }
      if (!next) getCtx();
      return next;
    });
  }, [getCtx]);

  const toggleMechKeys = useCallback(() => {
    setMechKeys(prev => {
      const next = !prev;
      try { localStorage.setItem(MECH_KEY, next ? '1' : '0'); } catch {}
      if (next) getCtx(); // init audio context
      return next;
    });
  }, [getCtx]);

  const changeBgm = useCallback((track) => {
    setBgmTrack(track);
    try { localStorage.setItem(BGM_KEY, track); } catch {}
  }, []);

  // BGM sequencer — all oscillators routed through master gain
  useEffect(() => {
    if (muted || bgmTrack === 'off') return;
    const ctx = getCtx();
    const d   = masterRef.current || ctx.destination;
    const tracks = {
      classic:   { chords: [[220,261.63,329.63,440],[174.61,220,261.63,349.23],[130.81,164.81,196,261.63],[196,246.94,293.66,392]], type:'triangle', speed:180, vol:0.035, decay:0.15 },
      synthwave: { chords: [[146.83,174.61,220,293.66],[116.54,146.83,174.61,233.08],[130.81,164.81,196,261.63],[110,130.81,164.81,220]], type:'sawtooth', speed:130, vol:0.02, decay:0.11 },
      ambient:   { chords: [[110,164.81,220,329.63],[87.31,130.81,174.61,261.63],[130.81,196,261.63,392],[98,146.83,196,293.66]], type:'sine', speed:1500, vol:0.045, decay:1.8 },
    };
    let ci = 0, ni = 0, tid;
    function tick() {
      const t = tracks[bgmTrack] || tracks.classic;
      const now = ctx.currentTime;
      try {
        if (bgmTrack === 'ambient') {
          t.chords[ci].forEach(freq => {
            const o1 = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain();
            o1.type = 'sine'; o1.frequency.setValueAtTime(freq, now);
            o2.type = 'sine'; o2.frequency.setValueAtTime(freq + 1.5, now);
            g.gain.setValueAtTime(0.001, now);
            g.gain.linearRampToValueAtTime(t.vol, now + 0.6);
            g.gain.exponentialRampToValueAtTime(0.0001, now + t.decay);
            o1.connect(g); o2.connect(g); g.connect(d);
            o1.start(now); o2.start(now); o1.stop(now + t.decay + 0.2); o2.stop(now + t.decay + 0.2);
          });
          ci = (ci + 1) % t.chords.length;
        } else {
          const freq = t.chords[ci][ni];
          const lead = ctx.createOscillator(), sub = ctx.createOscillator(), g = ctx.createGain();
          lead.type = t.type; lead.frequency.setValueAtTime(freq, now);
          sub.type  = 'triangle'; sub.frequency.setValueAtTime(freq / 2, now);
          g.gain.setValueAtTime(t.vol, now); g.gain.exponentialRampToValueAtTime(0.0001, now + t.decay);
          lead.connect(g); sub.connect(g); g.connect(d);
          lead.start(now); sub.start(now); lead.stop(now + t.decay + 0.05); sub.stop(now + t.decay + 0.05);
          ni = (ni + 1) % 4;
          if (ni === 0) ci = (ci + 1) % t.chords.length;
        }
      } catch {}
      tid = setTimeout(tick, t.speed);
    }
    tick();
    return () => clearTimeout(tid);
  }, [muted, bgmTrack, getCtx]);

  return {
    muted, toggleMute,
    bgmTrack, changeBgm,
    mechKeys, toggleMechKeys,
    analyserRef,                    // for AudioVisualizer
    playKeypress, playMechKey,
    playEnter, playError, playChime, playClick, playHover, playSynth, playFlip, playTone,
  };
}
