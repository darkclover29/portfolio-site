import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar.jsx';
import CommandPalette from '../shared/CommandPalette.jsx';
import MatrixCanvas from '../shared/MatrixCanvas.jsx';
import ScrollToTop from '../shared/ScrollToTop.jsx';
import AboutTab from './tabs/AboutTab.jsx';
import SkillsTab from './tabs/SkillsTab.jsx';
import ExperienceTab from './tabs/ExperienceTab.jsx';
import ProjectsTab from './tabs/ProjectsTab.jsx';
import EducationTab from './tabs/EducationTab.jsx';
import ContactTab from './tabs/ContactTab.jsx';

const TABS = [
  { id: 'about',      label: 'About',       icon: 'fa-user',          key: '1' },
  { id: 'skills',     label: 'Skills',      icon: 'fa-code',          key: '2' },
  { id: 'experience', label: 'Experience',  icon: 'fa-briefcase',     key: '3' },
  { id: 'projects',   label: 'Projects',    icon: 'fa-folder-open',   key: '4' },
  { id: 'education',  label: 'Education',   icon: 'fa-graduation-cap',key: '5' },
  { id: 'contact',    label: 'Contact',     icon: 'fa-paper-plane',   key: '6' },
  { id: 'cli',        label: 'CLI',         icon: 'fa-terminal',      key: '7' },
];

const TAB_KEY_MAP = Object.fromEntries(TABS.map(t => [t.key, t.id]));

const makeTabVariants = (dir) => ({
  initial: { opacity: 0, x: dir === 'back' ? -20 : 20, y: 4 },
  animate: { opacity: 1, x: 0, y: 0, transition: { duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, x: dir === 'back' ? 20 : -20, y: -4, transition: { duration: 0.14, ease: 'easeIn' } },
});

function TabContent({ activeTab, openProject, tabDir }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        variants={makeTabVariants(tabDir)}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ willChange: 'opacity, transform' }}
      >
        {activeTab === 'about'      && <AboutTab />}
        {activeTab === 'skills'     && <SkillsTab />}
        {activeTab === 'experience' && <ExperienceTab />}
        {activeTab === 'projects'   && <ProjectsTab highlightProject={openProject} />}
        {activeTab === 'education'  && <EducationTab />}
        {activeTab === 'contact'    && <ContactTab />}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Dashboard({
  theme, setTheme,
  getAccentRgb,
  resolvForExplorer,
  onFlipToCli,
  playClick,
  openProject,
  onProjectOpened,
}) {
  const [activeTab, setActiveTab]   = useState('about');
  const [tabDir, setTabDir]         = useState('forward');
  const [cmdOpen, setCmdOpen]       = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMatrixTheme = theme === 'matrix' || theme === 'cyberpunk';

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);


  // Open a project from terminal "open [name]" command
  useEffect(() => {
    if (!openProject) return;
    setActiveTab('projects');
    onProjectOpened?.();
  }, [openProject]); // eslint-disable-line

  const handleTab = (id) => {
    if (id === 'cli') { playClick?.(); onFlipToCli(); return; }
    const curIdx = TABS.findIndex(t => t.id === activeTab);
    const newIdx = TABS.findIndex(t => t.id === id);
    setTabDir(newIdx >= curIdx ? 'forward' : 'back');
    setActiveTab(id);
    playClick?.();
    closeDrawer();
  };

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(v => !v);
        return;
      }
      if (e.key === 'Escape') { closeDrawer(); return; }
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (!e.ctrlKey && !e.metaKey && !e.altKey && TAB_KEY_MAP[e.key]) {
        handleTab(TAB_KEY_MAP[e.key]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onFlipToCli]); // eslint-disable-line

  return (
    <div className="dash">
      <div className="dash-matrix-bg">
        <MatrixCanvas visible={isMatrixTheme} getAccentRgb={getAccentRgb} />
      </div>

      <Sidebar
        theme={theme} setTheme={setTheme}
        resolvForExplorer={resolvForExplorer}
        playClick={playClick}
        drawerOpen={drawerOpen}
        onCloseDrawer={closeDrawer}
      />

      {drawerOpen && (
        <div className="sidebar-backdrop" onClick={closeDrawer} aria-hidden="true" />
      )}

      <header className="dash-topbar">
        <button
          className="topbar-hamburger"
          onClick={() => setDrawerOpen(v => !v)}
          aria-label="Open sidebar"
          title="Menu"
        >
          <i className="fas fa-bars" />
        </button>

        <nav className="dash-tabs" role="tablist">
          {TABS.map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTab === t.id}
              className={['dash-tab', activeTab === t.id ? 'active' : '', t.id === 'cli' ? 'dash-tab--cli' : ''].filter(Boolean).join(' ')}
              onClick={() => handleTab(t.id)}
              title={t.label + ' (' + t.key + ')'}
            >
              <i className={'fas ' + t.icon} />
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        <div className="dash-topbar-actions">
          <button
            className="cmd-trigger-btn"
            onClick={() => setCmdOpen(true)}
            title="Command palette (Ctrl+K)"
            aria-label="Open command palette"
          >
            <i className="fas fa-magnifying-glass" />
            <span>Search</span>
            <kbd>Ctrl K</kbd>
          </button>
        </div>
      </header>

      <a href="#dash-content" className="skip-link">Skip to content</a>
      <main className="dash-main" id="dash-content" tabIndex={-1}>
        <div className="dash-content">
          <TabContent activeTab={activeTab} openProject={openProject} tabDir={tabDir} />
        </div>
        <ScrollToTop />
      </main>

      <nav className="dash-mobnav" role="tablist">
        {TABS.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={activeTab === t.id}
            aria-label={t.label}
            className={['mob-tab', activeTab === t.id ? 'active' : '', t.id === 'cli' ? 'mob-tab--cli' : ''].filter(Boolean).join(' ')}
            onClick={() => handleTab(t.id)}
          >
            <i className={'fas ' + t.icon} />
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onNavigate={(id) => handleTab(id)}
        onCli={onFlipToCli}
        setTheme={setTheme}
      />
    </div>
  );
}
