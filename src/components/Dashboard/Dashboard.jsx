import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar.jsx';
import CommandPalette from '../shared/CommandPalette.jsx';
import MatrixCanvas from '../shared/MatrixCanvas.jsx';
import ScrollToTop from '../shared/ScrollToTop.jsx';
import SlideTabNav from '../shared/SlideTabNav.jsx';
import TabBurst from '../shared/TabBurst.jsx';
import AboutTab from './tabs/AboutTab.jsx';
import SkillsTab from './tabs/SkillsTab.jsx';
import ExperienceTab from './tabs/ExperienceTab.jsx';
import ProjectsTab from './tabs/ProjectsTab.jsx';
import EducationTab from './tabs/EducationTab.jsx';
import GuestbookTab from './tabs/GuestbookTab.jsx';
import ContactTab from './tabs/ContactTab.jsx';

const TABS = [
  { id: 'about',      label: 'About',       icon: 'fa-user',          key: '1' },
  { id: 'skills',     label: 'Skills',      icon: 'fa-code',          key: '2' },
  { id: 'experience', label: 'Experience',  icon: 'fa-briefcase',     key: '3' },
  { id: 'projects',   label: 'Projects',    icon: 'fa-folder-open',   key: '4' },
  { id: 'education',  label: 'Education',   icon: 'fa-graduation-cap',key: '5' },
  { id: 'guestbook',  label: 'Guestbook',   icon: 'fa-book-open',     key: '6' },
  { id: 'contact',    label: 'Contact',     icon: 'fa-paper-plane',   key: '7' },
  { id: 'cli',        label: 'CLI',         icon: 'fa-terminal',      key: '8' },
];

const TAB_KEY_MAP = Object.fromEntries(TABS.map(t => [t.key, t.id]));

// SlideTabNav items (maps 1:1 with TABS array)
const SLIDE_ITEMS = TABS.map(t => ({ label: t.label, icon: t.icon }));

const makeTabVariants = (dir) => ({
  initial: { opacity: 0, x: dir === 'back' ? -20 : 20, y: 4 },
  animate: { opacity: 1, x: 0, y: 0, transition: { duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, x: dir === 'back' ? 20 : -20, y: -4, transition: { duration: 0.14, ease: 'easeIn' } },
});

function TabContent({ activeTab, openProject, highlightProject, tabDir, vfs }) {
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
        {activeTab === 'projects'   && <ProjectsTab highlightProject={openProject || highlightProject} />}
        {activeTab === 'education'  && <EducationTab />}
        {activeTab === 'guestbook'  && <GuestbookTab vfs={vfs} />}
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
  vfs,
}) {
  const burstRef = useRef(null);
  const [activeTab, setActiveTab]   = useState('about');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [tabDir, setTabDir]         = useState('forward');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [localHighlight, setLocalHighlight] = useState(null);

  const isMatrixTheme = theme === 'matrix' || theme === 'cyberpunk';
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const handleTab = useCallback((id) => {
    if (id === 'cli') { playClick?.(); onFlipToCli(); return; }
    // particle burst at active nav button
    const btns = document.querySelectorAll('.stnav-btn');
    const nextIdx = TABS.findIndex(t => t.id === id);
    const btn = btns[nextIdx];
    if (btn && burstRef.current) {
      const r = btn.getBoundingClientRect();
      const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#fff';
      burstRef.current.burst(r.left + r.width / 2, r.top + r.height / 2, accent);
    }
    const curIdx = TABS.findIndex(t => t.id === activeTab);
    const newIdx = TABS.findIndex(t => t.id === id);
    setTabDir(newIdx >= curIdx ? 'forward' : 'back');
    setActiveTab(id);
    playClick?.();
    navigator.vibrate?.(8);
    closeDrawer();
  }, [activeTab, playClick, onFlipToCli, closeDrawer]);

  const handlePaletteNav = useCallback(({ type, id }) => {
    if (type === 'tab') { handleTab(id); }
    if (type === 'project') {
      setLocalHighlight(id);
      handleTab('projects');
      setTimeout(() => setLocalHighlight(null), 2000);
    }
    if (type === 'cmd') {
      handleTab('cli');
      setTimeout(() => window.dispatchEvent(new CustomEvent('terminal:run', { detail: { cmd: id } })), 300);
    }
  }, [handleTab]);

  const activeTabIndex = TABS.findIndex(t => t.id === activeTab);

  // Open project from terminal "open [name]"
  useEffect(() => {
    if (!openProject) return;
    setActiveTab('projects');
    onProjectOpened?.();
  }, [openProject]); // eslint-disable-line

  // HireMeCTA custom event -> navigate to tab
  useEffect(() => {
    const handler = (e) => handleTab(e.detail);
    window.addEventListener('portfolio:navigate', handler);
    return () => window.removeEventListener('portfolio:navigate', handler);
  }, [handleTab]);

  const handleGooeyClick = useCallback((index) => {
    handleTab(TABS[index].id);
  }, [handleTab]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(v => !v);
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
  }, [handleTab, closeDrawer]);

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

        {/* SlideTabNav — clean sliding pill, replaces GooeyNav */}
        <div className="dash-tabs-slide">
          <SlideTabNav
            items={SLIDE_ITEMS}
            activeIndex={activeTabIndex}
            onItemClick={(i) => handleTab(TABS[i].id)}
          />
        </div>

        <div className="dash-topbar-actions">
          <button
            className="cmd-trigger-btn"
            onClick={() => setPaletteOpen(true)}
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
          <TabContent
            activeTab={activeTab}
            openProject={openProject}
            highlightProject={localHighlight}
            tabDir={tabDir}
            vfs={vfs}
          />
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

      <TabBurst ref={burstRef} />
      {paletteOpen && (
        <CommandPalette
          onNavigate={handlePaletteNav}
          onClose={() => setPaletteOpen(false)}
        />
      )}
    </div>
  );
}
