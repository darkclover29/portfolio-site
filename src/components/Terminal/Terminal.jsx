import { useState, useEffect } from 'react';
import TerminalOutput from './TerminalOutput.jsx';
import TerminalInput from './TerminalInput.jsx';
import NanoEditor from './NanoEditor.jsx';
import MatrixCanvas from '../shared/MatrixCanvas.jsx';
import AudioVisualizer from '../shared/AudioVisualizer.jsx';
import SnakeGame from '../Games/SnakeGame.jsx';
import Synth from '../Games/Synth.jsx';
import { useTerminal } from '../../hooks/useTerminal.js';

export default function Terminal({
  vfs, theme, setTheme,
  muted, toggleMute, bgmTrack, changeBgm,
  mechKeys, toggleMechKeys, analyserRef,
  getAccentRgb, onFlipToGui,
  playKeypress, playMechKey, playEnter, playError, playClick, playSynth,
  toggleAntiMagic,
  openMatrixOverlay,
}) {
  const [matrixOn, setMatrixOn] = useState(true);
  const [game, setGame]         = useState(null);

  // Blur any focused input when a game opens — prevents mobile keyboard popup
  useEffect(() => {
    if (game) {
      const id = setTimeout(() => {
        if (document.activeElement && document.activeElement !== document.body) {
          document.activeElement.blur();
        }
      }, 50);
      return () => clearTimeout(id);
    }
  }, [game]);

  const terminal = useTerminal({ vfs, playKeypress, playEnter, playError });

  const vfsHooks = {
    ...vfs,
    setTheme,
    flipToGui:      onFlipToGui,
    toggleMatrix:   () => setMatrixOn(v => !v),
    openGame:       setGame,
    toggleAntiMagic,
    toggleMechKeys,
    openMatrixOverlay,
  };

  const handleSubmit = (raw) => terminal.execute(raw, vfsHooks);

  return (
    <div className="terminal-view">
      <MatrixCanvas visible={matrixOn} getAccentRgb={getAccentRgb} />

      <div className="terminal-window">
        <div className="terminal-titlebar">
          <div className="win-dots">
            <span className="win-dot win-dot--red" />
            <span className="win-dot win-dot--yellow" />
            <span className="win-dot win-dot--green" />
          </div>
          <span className="terminal-title">harsh@portfolio — terminal</span>

          <div className="terminal-titlebar-right">
            <span className="titlebar-vis-wrap">
              <AudioVisualizer analyserRef={analyserRef} active={!muted} />
            </span>

            <button
              className={`icon-btn ${mechKeys ? 'icon-btn--active' : ''}`}
              title={mechKeys ? 'Mech keys ON' : 'Mech keys OFF'}
              onClick={toggleMechKeys}
              onPointerDown={e => e.preventDefault()}
            >
              <i className="fas fa-keyboard" />
            </button>

            <button
              className="icon-btn"
              title={muted ? 'Unmute' : 'Mute'}
              onClick={toggleMute}
              onPointerDown={e => e.preventDefault()}
            >
              <i className={`fas fa-${muted ? 'volume-mute' : 'volume-up'}`} />
            </button>

            <select
              className="bgm-select-sm"
              value={bgmTrack}
              onChange={e => changeBgm(e.target.value)}
              title="BGM Track"
            >
              <option value="classic">Classic</option>
              <option value="synthwave">Synth</option>
              <option value="ambient">Ambient</option>
              <option value="off">Off</option>
            </select>

            <button
              className="icon-btn"
              title="Toggle Matrix Rain"
              onClick={() => setMatrixOn(v => !v)}
              onPointerDown={e => e.preventDefault()}
            >
              <i className="fas fa-rain" />
            </button>

            <button
              className="flip-btn"
              onClick={onFlipToGui}
              title="Open Dashboard"
              onPointerDown={e => e.preventDefault()}
            >
              <i className="fas fa-th-large" /><span className="flip-btn-label"> GUI</span>
            </button>
          </div>
        </div>

        <div className="terminal-body">
          {game === 'snake' && (
            <div className="game-overlay">
              <button
                className="game-close-btn"
                type="button"
                onPointerDown={e => e.preventDefault()}
                onClick={() => setGame(null)}
              >x Close</button>
              <SnakeGame getAccentRgb={getAccentRgb} />
            </div>
          )}
          {game === 'synth' && (
            <div className="game-overlay">
              <button
                className="game-close-btn"
                type="button"
                onPointerDown={e => e.preventDefault()}
                onClick={() => setGame(null)}
              >x Close</button>
              <Synth playSynth={playSynth} />
            </div>
          )}

          <TerminalOutput lines={terminal.lines} />
          <TerminalInput
            pwd={vfs.pwd}
            history={terminal.history}
            histIdx={terminal.histIdx}
            setHistIdx={terminal.setHistIdx}
            onSubmit={handleSubmit}
            allCommands={terminal.ALL_COMMANDS}
            playKeypress={playKeypress}
            playMechKey={playMechKey}
            gameActive={!!game}
          />
        </div>

        <NanoEditor
          open={terminal.nanoOpen}
          fileName={terminal.nanoFile.name}
          fileNode={terminal.nanoFile.node}
          onSave={vfs.saveNano}
          onClose={terminal.closeNano}
        />
      </div>
    </div>
  );
}
