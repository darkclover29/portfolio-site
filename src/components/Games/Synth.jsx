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

export default function Synth({ playSynth }) {
  return (
    <div className="synth-container">
      <p className="synth-hint">Click keys to play tones</p>
      <div className="synth-keyboard">
        {KEYS.map(k => (
          <button
            key={k.note}
            className={`synth-key ${k.black ? 'synth-key--black' : 'synth-key--white'}`}
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
