import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import PageProgress from './components/shared/PageProgress.jsx';
import BootSequence from './components/Boot/BootSequence.jsx';
import ShortcutModal from './components/shared/ShortcutModal.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import { useTheme } from './hooks/useTheme.js';
import { useAudio } from './hooks/useAudio.js';
import { useVFS } from './hooks/useVFS.js';
import { useSecretCode, useKonamiCode } from './hooks/useSecretCode.js';
import { useReducedMotion } from './hooks/useReducedMotion.js';
import { useFx } from './hooks/useFx.js';

// Heavy components — lazy-loaded so they don't block the initial render
const Terminal              = lazy(() => import('./components/Terminal/Terminal.jsx'));
const CursorTrail           = lazy(() => import('./components/shared/CursorTrail.jsx'));
const CustomCursor          = lazy(() => import('./components/shared/CustomCursor.jsx'));
const CardTilt              = lazy(() => import('./components/shared/CardTilt.jsx'));
const AshParticles          = lazy(() => import('./components/shared/AshParticles.jsx'));
const HireMeCTA             = lazy(() => import('./components/shared/HireMeCTA.jsx'));
const MatrixOverlay         = lazy(() => import('./components/shared/MatrixOverlay.jsx'));
const DarkCloverEgg         = lazy(() => import('./components/shared/DarkCloverEgg.jsx'));
const DigitalGlitchOverlay  = lazy(() => import('./components/shared/DigitalGlitchOverlay.jsx'));
const InteractiveConstellation = lazy(() => import('./components/shared/InteractiveConstellation.jsx'));

export default function App() {
  const [view, setView]           = useState('gui');
  const [bootDone, setBootDone]   = useState(false);
  const [constellationMode, setConstellationMode] = useState(false);
  const [matrixOverlay, setMatrixOverlay] = useState(false);
  const [openProject, setOpenProject]     = useState(null);
  const [shortcutOpen, setShortcutOpen]   = useState(false);

  const [, setAntiMagicMode] = useState(false);
  const { theme, setTheme, getAccentColor, getAccentRgb } = useTheme();
  const audio  = useAudio();
  const vfs    = useVFS(false);
  const { triggered: eggOpen, dismiss: dismissEgg }      = useSecretCode();
  const { activated: konamiOn, dismiss: dismissKonami }  = useKonamiCode();
  const reducedMotion = useReducedMotion();
  // Easter-egg effects layer (cursor, trail, tilt…) — off by default, toggled via `fx` in the CLI
  const fxOn = useFx() && !reducedMotion;

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
      else       document.body.removeAttribute('data-anti-magic');
      return next;
    });
  }, []);

  // Easter egg: Konami-style sequence for constellation mode (keyboard only, no visible button)
  const activateConstellationMode = useCallback(() => {
    setConstellationMode(true);
    document.body.classList.add('constellation-mode');
  }, []);

  const deactivateConstellationMode = useCallback(() => {
    setConstellationMode(false);
    document.body.classList.remove('constellation-mode');
  }, []);

  // Expose constellation toggle on window for power users (✨ in console: window.__ht_stars())
  useEffect(() => {
    window.__ht_stars = constellationMode ? deactivateConstellationMode : activateConstellationMode;
  }, [constellationMode, activateConstellationMode, deactivateConstellationMode]);

  const switchView = useCallback((target) => {
    if (view === target) return;
    setView(target);
  }, [view]);

  const goGui = useCallback(() => switchView('gui'), [switchView]);
  const goCli = useCallback(() => switchView('cli'), [switchView]);

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

      {/* Decorative effects — easter egg only (CLI `fx` command), never with prefers-reduced-motion */}
      {fxOn && view === 'gui' && (
        <Suspense fallback={null}>
          <CustomCursor />
          <CursorTrail />
          <CardTilt />
        </Suspense>
      )}
      {!reducedMotion && theme === 'anti-magic' && (
        <Suspense fallback={null}>
          <AshParticles active />
        </Suspense>
      )}

      {constellationMode && (
        <Suspense fallback={null}>
          <InteractiveConstellation onDeactivate={deactivateConstellationMode} />
        </Suspense>
      )}

      <div
        className={`app-view app-view--cli${view === 'cli' ? ' is-active' : ''}`}
        style={{ zIndex: view === 'cli' ? 2 : 1 }}
      >
        <Suspense fallback={null}>
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
        </Suspense>
      </div>

      <div
        className={`app-view app-view--gui${view === 'gui' ? ' is-active' : ''}`}
        style={{ zIndex: view === 'gui' ? 2 : 1 }}
      >
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
      </div>

      <Suspense fallback={null}>
        <HireMeCTA onNavigate={tab => window.dispatchEvent(new CustomEvent('portfolio:navigate', { detail: tab }))} />
      </Suspense>

      {matrixOverlay && (
        <Suspense fallback={null}>
          <MatrixOverlay onExit={() => setMatrixOverlay(false)} />
        </Suspense>
      )}
      {eggOpen && (
        <Suspense fallback={null}>
          <DarkCloverEgg onDismiss={dismissEgg} />
        </Suspense>
      )}
      {konamiOn && (
        <Suspense fallback={null}>
          <DigitalGlitchOverlay onDismiss={dismissKonami} />
        </Suspense>
      )}
      {shortcutOpen && <ShortcutModal onClose={() => setShortcutOpen(false)} />}
    </div>
  );
}
