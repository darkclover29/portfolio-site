import { useState, useCallback, useEffect } from 'react';
import PageProgress from './components/shared/PageProgress.jsx';
import BootSequence from './components/Boot/BootSequence.jsx';
import ShortcutModal from './components/shared/ShortcutModal.jsx';
import CursorTrail from './components/shared/CursorTrail.jsx';
import Terminal from './components/Terminal/Terminal.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import DarkCloverEgg from './components/shared/DarkCloverEgg.jsx';
import DigitalGlitchOverlay from './components/shared/DigitalGlitchOverlay.jsx';
import AshParticles from './components/shared/AshParticles.jsx';
import MatrixOverlay from './components/shared/MatrixOverlay.jsx';
import InteractiveConstellation from './components/shared/InteractiveConstellation.jsx';
import CustomCursor from './components/shared/CustomCursor.jsx';
import CardTilt from './components/shared/CardTilt.jsx';
import HireMeCTA from './components/shared/HireMeCTA.jsx';
import { useTheme } from './hooks/useTheme.js';
import { useAudio } from './hooks/useAudio.js';
import { useVFS } from './hooks/useVFS.js';
import { useSecretCode, useKonamiCode } from './hooks/useSecretCode.js';

export default function App() {
  const [view, setView]           = useState('gui');
  const [bootDone, setBootDone]   = useState(false);
  const [, setAntiMagicMode] = useState(false);
  const [constellationMode, setConstellationMode] = useState(false);
  const [matrixOverlay, setMatrixOverlay] = useState(false);
  const [openProject, setOpenProject]     = useState(null);
  const [shortcutOpen, setShortcutOpen]   = useState(false);

  const { theme, setTheme, getAccentColor, getAccentRgb } = useTheme();
  const audio  = useAudio();
  const vfs    = useVFS(false);
  const { triggered: eggOpen, dismiss: dismissEgg }      = useSecretCode();
  const { activated: konamiOn, dismiss: dismissKonami }  = useKonamiCode();

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      document.documentElement.style.setProperty('--vvh', `${vv.height}px`);
      document.documentElement.style.setProperty('--vvtop', `${vv.offsetTop}px`);
    };
    update();
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    return () => { vv.removeEventListener('resize', update); vv.removeEventListener('scroll', update); };
  }, []);

  // ? key opens shortcut modal
  useEffect(() => {
    const handler = (e) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        setShortcutOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const toggleAntiMagic = useCallback(() => {
    setAntiMagicMode(v => {
      const next = !v;
      if (next) document.body.setAttribute('data-anti-magic', 'true');
      else document.body.removeAttribute('data-anti-magic');
      return next;
    });
  }, []);

  const activateConstellationMode = useCallback(() => {
    setConstellationMode(true);
    document.body.classList.add('constellation-mode');
  }, []);

  const deactivateConstellationMode = useCallback(() => {
    setConstellationMode(false);
    document.body.classList.remove('constellation-mode');
  }, []);

  const switchView = useCallback((target) => {
    if (view === target) return;
    setView(target);
  }, [view]);

  const goGui = useCallback(() => switchView('gui'), [switchView]);
  const goCli = useCallback(() => switchView('cli'), [switchView]);
  // Listen for terminal "open [project]" command (must be after goGui)
  useEffect(() => {
    const handler = (e) => {
      setOpenProject(e.detail?.name ?? null);
      goGui();
    };
    window.addEventListener('portfolio:open-project', handler);
    return () => window.removeEventListener('portfolio:open-project', handler);
  }, [goGui]);



  return (
    <div className="app-root">
      {!bootDone && (
        <BootSequence onDone={() => setBootDone(true)} />
      )}
      <PageProgress />
      {view === 'gui' && <CustomCursor />}
      {view === 'gui' && <CursorTrail />}
      <CardTilt />
      <AshParticles active={theme === 'anti-magic'} />

      <button
        className="hidden-secret"
        type="button"
        onClick={constellationMode ? deactivateConstellationMode : activateConstellationMode}
        title="???"
        aria-label="secret"
      >✨</button>

      {constellationMode && <InteractiveConstellation onDeactivate={deactivateConstellationMode} />}

      <div
        className={`app-view app-view--cli${view === 'cli' ? ' is-active' : ''}`}
        style={{ zIndex: view === 'cli' ? 2 : 1 }}
      >
        <Terminal
          theme={theme} setTheme={setTheme}
          getAccentColor={getAccentColor} getAccentRgb={getAccentRgb}
          vfs={vfs}
          onFlipToGui={goGui}
          playClick={audio.playClick}
          playKeypress={audio.playKeypress}
          playMechKey={audio.playMechKey}
          playEnter={audio.playEnter}
          playError={audio.playError}
          playSynth={audio.playSynth}
          muted={audio.muted}         toggleMute={audio.toggleMute}
          bgmTrack={audio.bgmTrack}   changeBgm={audio.changeBgm}
          mechKeys={audio.mechKeys}   toggleMechKeys={audio.toggleMechKeys}
          analyserRef={audio.analyserRef}
          toggleAntiMagic={toggleAntiMagic}
          openMatrixOverlay={() => setMatrixOverlay(true)}
        />
      </div>

      <div
        className={`app-view app-view--gui${view === 'gui' ? ' is-active' : ''}`}
        style={{ zIndex: view === 'gui' ? 2 : 1 }}
      >
        {
          <Dashboard
            theme={theme} setTheme={setTheme}
            getAccentColor={getAccentColor} getAccentRgb={getAccentRgb}
            resolvForExplorer={vfs.resolvForExplorer}
            onFlipToCli={goCli}
            playClick={audio.playClick}
            openProject={openProject}
            onProjectOpened={() => setOpenProject(null)}
            vfs={vfs}
          />
        }
      </div>

      <HireMeCTA onNavigate={tab => window.dispatchEvent(new CustomEvent('portfolio:navigate', { detail: tab }))} />
      {matrixOverlay && <MatrixOverlay onExit={() => setMatrixOverlay(false)} />}
      {eggOpen   && <DarkCloverEgg onDismiss={dismissEgg} />}
      {konamiOn  && <DigitalGlitchOverlay onDismiss={dismissKonami} />}
      {shortcutOpen && <ShortcutModal onClose={() => setShortcutOpen(false)} />}
    </div>
  );
}
