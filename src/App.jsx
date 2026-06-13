import { useState, useCallback } from 'react';
import Terminal from './components/Terminal/Terminal.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import { useTheme } from './hooks/useTheme.js';
import { useAudio } from './hooks/useAudio.js';
import { useVFS } from './hooks/useVFS.js';

export default function App() {
  const [view, setView]           = useState('cli');
  const [transitioning, setTrans] = useState(false);

  const { theme, setTheme, getAccentColor, getAccentRgb } = useTheme();
  const audio = useAudio();
  const vfs   = useVFS(false);

  const switchView = useCallback((target) => {
    if (transitioning || view === target) return;
    setTrans(true);
    audio.playFlip(target === 'gui');
    setTimeout(() => {
      setView(target);
      setTrans(false);
    }, 300);
  }, [transitioning, view, audio]);

  const goGui = useCallback(() => switchView('gui'), [switchView]);
  const goCli = useCallback(() => switchView('cli'), [switchView]);

  const shared = {
    theme, setTheme,
    muted: audio.muted, toggleMute: audio.toggleMute,
    bgmTrack: audio.bgmTrack, changeBgm: audio.changeBgm,
    getAccentColor, getAccentRgb,
    playClick: audio.playClick,
  };

  return (
    <div className="app-root">
      {/* CLI view — stays mounted so terminal state is preserved */}
      <div
        className={`app-view${view === 'cli' ? ' is-active' : ''}`}
        style={{ zIndex: view === 'cli' ? 2 : 1 }}
      >
        <Terminal
          {...shared}
          vfs={vfs}
          onFlipToGui={goGui}
          playKeypress={audio.playKeypress}
          playEnter={audio.playEnter}
          playError={audio.playError}
          playSynth={audio.playSynth}
        />
      </div>

      {/* GUI view — lazy mounted */}
      <div
        className={`app-view${view === 'gui' ? ' is-active' : ''}`}
        style={{ zIndex: view === 'gui' ? 2 : 1 }}
      >
        {(view === 'gui' || transitioning) && (
          <Dashboard
            {...shared}
            resolvForExplorer={vfs.resolvForExplorer}
            onFlipToCli={goCli}
          />
        )}
      </div>
    </div>
  );
}
