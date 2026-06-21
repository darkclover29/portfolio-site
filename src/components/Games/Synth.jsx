import { useRef, useState, useCallback } from 'react';

const KEYS = [
  { note: 'C4',  freq: 261.63, black: false },
  { note: 'C#4', freq: 277.18, black: true  },
  { note: 'D4',  freq: 293.66, black: false },
  { note: 'D#4', freq: 311.13, black: true  },
  { note: 'E4',  freq: 329.63, black: false },
  { note: 'F4',  freq: 349.23, black: false },
  { note: 'F#4', freq: 369.99, black: true  },
  { note: 'G4',  freq: 392.00, black: false },
  { note: 'G#4', freq: 415.30, black: true  },
  { note: 'A4',  freq: 440.00, black: false },
  { note: 'A#4', freq: 466.16, black: true  },
  { note: 'B4',  freq: 493.88, black: false },
  { note: 'C5',  freq: 523.25, black: false },
];

// Fold any frequency into the C4-C5 piano range for key highlighting
function getKeyIdx(freq) {
  if (!freq) return -1;
  let f = freq;
  while (f > 523.25 * 1.05) f /= 2;
  while (f < 261.63 * 0.95) f *= 2;
  let best = -1, bestDiff = Infinity;
  KEYS.forEach((k, i) => {
    const d = Math.abs(k.freq - f);
    if (d < bestDiff) { bestDiff = d; best = i; }
  });
  return bestDiff < 22 ? best : -1;
}

// ─────────────────────────────────────────────────────────────────────────────
//  ANIME SONGS  [freq_hz, duration_ms]  — 0 freq = rest
// ─────────────────────────────────────────────────────────────────────────────

const BC = [  // Black Clover — Haruka Mirai (OP1)
  [392,120],[440,120],[494,120],[523,240],[494,120],[440,120],[392,240],[0,80],
  [330,120],[392,120],[440,120],[494,240],[440,120],[392,120],[330,360],[0,160],
  [392,120],[440,120],[494,120],[587,240],[659,120],[587,120],[523,360],[0,120],
  [494,120],[523,120],[587,120],[659,240],[784,480],[0,200],
  [659,150],[587,120],[523,120],[494,120],[440,240],[392,120],[330,120],[294,120],[330,360],[0,120],
  [392,120],[440,120],[494,120],[523,120],[587,120],[523,120],[494,240],
  [440,120],[494,120],[440,120],[392,480],
];

const UNRAVEL = [  // Tokyo Ghoul — Unravel (piano intro, E minor)
  [494,100],[440,100],[415,100],[370,100],[330,100],[294,100],[330,100],[370,100],[415,200],[0,60],
  [494,100],[440,100],[415,100],[370,100],[330,100],[262,100],[294,100],[330,200],[0,80],
  [370,100],[415,100],[440,100],[494,100],[523,100],[587,100],[659,300],[0,100],
  [587,100],[523,100],[494,100],[440,100],[415,100],[370,100],[330,100],[294,100],[330,300],[0,100],
  // Second motif — builds intensity
  [659,120],[587,120],[523,120],[494,120],[440,240],[0,60],
  [494,120],[523,120],[587,120],[659,120],[784,360],[0,120],
  [659,120],[587,120],[523,120],[494,120],[440,120],[415,120],[370,480],
];

const HIKARU = [  // Your Lie in April — Hikaru Nara (OP1 by Goose house)
  [330,150],[392,150],[440,150],[494,150],[523,300],[494,150],[440,150],[392,300],[0,80],
  [440,150],[494,150],[523,150],[587,300],[659,450],[0,120],
  [523,150],[587,150],[659,150],[587,150],[523,150],[494,150],[440,360],[0,100],
  [392,150],[440,150],[494,150],[440,150],[392,150],[349,150],[330,480],[0,120],
  // Chorus lift
  [659,180],[587,180],[523,180],[587,360],[0,80],
  [659,180],[784,180],[880,360],[784,180],[659,180],[587,480],[0,160],
  [523,150],[587,150],[659,150],[523,150],[440,150],[392,150],[330,500],
];

const GURENGE = [  // Demon Slayer — Gurenge (OP1 by LiSA)
  [392,200],[440,200],[494,200],[440,200],[392,200],[330,200],[294,200],[330,400],[0,100],
  [392,200],[440,200],[494,200],[523,200],[494,200],[440,400],[0,100],
  [659,200],[587,200],[523,200],[494,200],[440,200],[392,400],[0,100],
  [587,200],[523,200],[494,200],[440,200],[392,200],[349,200],[330,500],[0,120],
  // Second hook
  [494,150],[523,150],[587,300],[523,150],[494,150],[440,300],[0,80],
  [392,150],[440,150],[494,150],[440,150],[392,150],[330,150],[294,500],
];

const AOT = [  // Attack on Titan — Guren no Yumiya (OP1 by Linked Horizon)
  [330,160],[330,160],[392,160],[440,160],[330,160],[330,160],[392,320],[0,80],
  [330,160],[330,160],[392,160],[440,160],[494,320],[440,160],[392,320],[0,100],
  [523,160],[523,160],[587,160],[659,160],[523,160],[523,160],[587,320],[0,80],
  [659,200],[587,200],[523,200],[494,200],[440,200],[392,500],[0,120],
  // Climax
  [784,200],[740,200],[659,200],[587,200],[659,400],[0,80],
  [784,200],[880,200],[988,400],[880,200],[784,200],[659,500],
];

const NARUTO = [  // Naruto — Blue Bird (OP3 by Ikimono-gakari)
  [330,200],[294,200],[262,200],[247,200],[262,200],[294,200],[330,400],[0,100],
  [392,200],[349,200],[330,200],[294,200],[330,200],[294,200],[262,400],[0,100],
  [523,150],[494,150],[440,150],[415,150],[440,300],[392,300],[0,80],
  [523,200],[494,200],[440,200],[392,200],[440,200],[415,200],[392,500],[0,120],
  // Hook
  [659,180],[587,180],[523,180],[587,360],[0,80],
  [659,180],[784,180],[880,360],[784,180],[659,180],[587,180],[523,500],
];

const SONGS = [
  { label: 'Black Clover — Haruka Mirai',        notes: BC       },
  { label: 'Tokyo Ghoul — Unravel',              notes: UNRAVEL  },
  { label: 'Your Lie in April — Hikaru Nara',    notes: HIKARU   },
  { label: 'Demon Slayer — Gurenge',             notes: GURENGE  },
  { label: 'Attack on Titan — Guren no Yumiya',  notes: AOT      },
  { label: 'Naruto — Blue Bird',                 notes: NARUTO   },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Synth({ playSynth }) {
  const [playing,   setPlaying]   = useState(false);
  const [songIdx,   setSongIdx]   = useState(0);
  const [activeKey, setActiveKey] = useState(-1);
  const timersRef = useRef([]);
  const ctxRef    = useRef(null);

  const stopMelody = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    try { ctxRef.current?.close(); } catch {}
    ctxRef.current = null;
    setPlaying(false);
    setActiveKey(-1);
  }, []);

  const playNote = useCallback((freq, dur, ctx) => {
    if (!freq || !ctx) return;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur / 1000 - 0.01);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + dur / 1000);
  }, []);

  const playMelody = useCallback(() => {
    if (playing) { stopMelody(); return; }
    setPlaying(true);

    let ctx;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      ctxRef.current = ctx;
    } catch { setPlaying(false); return; }

    const notes = SONGS[songIdx].notes;
    let t = 0;

    notes.forEach(([freq, dur]) => {
      const tId = setTimeout(() => {
        setActiveKey(getKeyIdx(freq));
        playNote(freq, dur, ctx);
      }, t);
      timersRef.current.push(tId);
      t += dur + 8;
    });

    const endId = setTimeout(() => {
      setPlaying(false);
      setActiveKey(-1);
      try { ctx.close(); } catch {}
    }, t + 200);
    timersRef.current.push(endId);
  }, [playing, songIdx, stopMelody, playNote]);

  return (
    <div className="synth-container">
      {/* Controls row */}
      <div className="synth-header">
        <select
          className="synth-song-select"
          value={songIdx}
          onChange={e => { stopMelody(); setSongIdx(Number(e.target.value)); }}
          disabled={playing}
          title="Choose anime song"
        >
          {SONGS.map((s, i) => (
            <option key={i} value={i}>{s.label}</option>
          ))}
        </select>

        <button
          type="button"
          className={`synth-play-btn ${playing ? 'synth-play-btn--stop' : ''}`}
          onClick={playMelody}
          title={playing ? 'Stop' : 'Play'}
        >
          <i className={`fas fa-${playing ? 'stop' : 'play'}`} />
          {playing ? ' Stop' : ' Play'}
        </button>
      </div>

      {/* Now-playing ticker */}
      {playing && (
        <div className="synth-now-playing">
          <span className="synth-eq">&#9646;&#9646;&#9646;</span>
          {SONGS[songIdx].label} &mdash; 8-bit
        </div>
      )}

      {!playing && <p className="synth-hint">Click keys or auto-play a song</p>}

      {/* Piano keyboard */}
      <div className="synth-keyboard">
        {KEYS.map((k, i) => (
          <button
            key={k.note}
            type="button"
            className={[
              'synth-key',
              k.black ? 'synth-key--black' : 'synth-key--white',
              activeKey === i ? 'synth-key--active' : '',
            ].filter(Boolean).join(' ')}
            onPointerDown={() => playSynth?.(k.freq)}
            title={k.note}
          >
            <span className="synth-note">{k.black ? '' : k.note}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
