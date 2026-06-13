import { useState } from 'react';
import TerminalOutput from './TerminalOutput.jsx';
import TerminalInput from './TerminalInput.jsx';
import NanoEditor from './NanoEditor.jsx';
import MatrixCanvas from '../shared/MatrixCanvas.jsx';
import SnakeGame from '../Games/SnakeGame.jsx';
import Synth from '../Games/Synth.jsx';
import { useTerminal } from '../../hooks/useTerminal.js';

export default function Terminal({ vfs, theme, setTheme, muted, toggleMute, bgmTrack, changeBgm, getAccentRgb, onFlipToGui, playKeypress, playEnter, playError, playClick, playSynth }) {
  const [matrixOn, setMatrixOn] = useState(true);
  const [game, setGame]         = useState(null); // 'snake' | 'synth' | null

  const terminal = useTerminal({ vfs, playKeypress, playEnter, playError });

  const vfsHooks = {
    ...vfs,
    setTheme,
    flipToGui:    onFlipToGui,
    toggleMatrix: () => setMatrixOn(v => !v),
    openGame:     setGame,
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
            <button className="icon-btn" title={muted ? 'Unmute' : 'Mute'} onClick={toggleMute}>
              <i className={`fas fa-${muted ? 'volume-mute' : 'volume-up'}`} />
            </button>
            <select className="bgm-select-sm" value={bgmTrack} onChange={e => changeBgm(e.target.value)} title="BGM Track">
              <option value="classic">♪ Classic</option>
              <option value="synthwave">♪ Synthwave</option>
              <option value="ambient">♪ Ambient</option>
              <option value="off">✕ Off</option>
            </select>
            <button className="icon-btn" title="Toggle Matrix Rain" onClick={() => setMatrixOn(v => !v)}>
              <i className="fas fa-rain" />
            </button>
            <button className="flip-btn" onClick={onFlipToGui} title="Open Dashboard">
              <i className="fas fa-th-large" /> GUI
            </button>
          </div>
        </div>

        <div className="terminal-body">
          {game === 'snake' && (
            <div className="game-overlay">
              <button className="game-close-btn" onClick={() => setGame(null)}>✕ Close</button>
              <SnakeGame getAccentRgb={getAccentRgb} />
            </div>
          )}
          {game === 'synth' && (
            <div className="game-overlay">
              <button className="game-close-btn" onClick={() => setGame(null)}>✕ Close</button>
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
