import { useState, useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
import CommandPalette from '../shared/CommandPalette.jsx';
import AboutTab from './tabs/AboutTab.jsx';
import SkillsTab from './tabs/SkillsTab.jsx';
import ExperienceTab from './tabs/ExperienceTab.jsx';
import ProjectsTab from './tabs/ProjectsTab.jsx';
import EducationTab from './tabs/EducationTab.jsx';
import AIChatTab from './tabs/AIChatTab.jsx';

const TABS = [
  { id: 'about',      label: 'About',       icon: 'fa-user',          key: '1' },
  { id: 'skills',     label: 'Skills',      icon: 'fa-code',          key: '2' },
  { id: 'experience', label: 'Experience',  icon: 'fa-briefcase',     key: '3' },
  { id: 'projects',   label: 'Projects',    icon: 'fa-folder-open',   key: '4' },
  { id: 'education',  label: 'Education',   icon: 'fa-graduation-cap',key: '5' },
  { id: 'chat',       label: 'Chat',        icon: 'fa-comment-dots',  key: '6' },
];

const TAB_KEY_MAP = Object.fromEntries(TABS.map(t => [t.key, t.id]));

export default function Dashboard({
  theme, setTheme,
  muted, toggleMute, bgmTrack, changeBgm,
  getAccentRgb,
  resolvForExplorer,
  onFlipToCli,
  playClick,
}) {
  const [activeTab, setActiveTab] = useState('about');
  const [cmdOpen, setCmdOpen]     = useState(false);

  const handleTab = (id) => { setActiveTab(id); playClick?.(); };

  // ── Global keyboard shortcuts ──────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      // Ctrl+K / Cmd+K → command palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(v => !v);
        return;
      }
      // Ignore when typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      // 1–6 → navigate tabs
      if (!e.ctrlKey && !e.metaKey && !e.altKey && TAB_KEY_MAP[e.key]) {
        handleTab(TAB_KEY_MAP[e.key]);
        return;
      }
      // `t` → switch to CLI
      if (e.key === 't' && !e.ctrlKey && !e.metaKey) onFlipToCli();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onFlipToCli]); // eslint-disable-line

  return (
    <div className="dash">
      {/* Sidebar */}
      <Sidebar
        theme={theme} setTheme={setTheme}
        muted={muted} toggleMute={toggleMute}
        bgmTrack={bgmTrack} changeBgm={changeBgm}
        resolvForExplorer={resolvForExplorer}
        playClick={playClick}
      />

      {/* Top bar */}
      <header className="dash-topbar">
        <nav className="dash-tabs" role="tablist">
          {TABS.map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTab === t.id}
              className={`dash-tab${activeTab === t.id ? ' active' : ''}`}
              onClick={() => handleTab(t.id)}
              title={`${t.label} (${t.key})`}
            >
              <i className={`fas ${t.icon}`} />
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        <div className="dash-topbar-actions">
          <button
            className="cmd-trigger-btn"
            onClick={() => setCmdOpen(true)}
            title="Command palette (Ctrl+K)"
          >
            <i className="fas fa-magnifying-glass" />
            <span>Search</span>
            <kbd>Ctrl K</kbd>
          </button>
          <button className="dash-cli-btn" onClick={onFlipToCli} title="Switch to Terminal (T)">
            <i className="fas fa-terminal" />
            <span>CLI</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="dash-main">
        <div className="dash-content" key={activeTab}>
          {activeTab === 'about'      && <AboutTab />}
          {activeTab === 'skills'     && <SkillsTab />}
          {activeTab === 'experience' && <ExperienceTab />}
          {activeTab === 'projects'   && <ProjectsTab />}
          {activeTab === 'education'  && <EducationTab />}
          {activeTab === 'chat'       && <AIChatTab />}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="dash-mobnav" role="tablist">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`mob-tab${activeTab === t.id ? ' active' : ''}`}
            onClick={() => handleTab(t.id)}
          >
            <i className={`fas ${t.icon}`} />
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      {/* Command palette overlay */}
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
