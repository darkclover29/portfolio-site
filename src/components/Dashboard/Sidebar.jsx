import { useState, useEffect } from 'react';
import { SWATCH_THEMES } from '../../hooks/useTheme.js';
import { PortfolioData } from '../../data/portfolioData.js';
import Modal from '../shared/Modal.jsx';

const THEMES = SWATCH_THEMES;

const THEME_COLORS = {
  mono:          '#ffffff',
  minimal:       '#d4c9b8',
  dark:          '#6366f1',
  matrix:        '#4ade80',
  cyberpunk:     '#60a5fa',
  dracula:       '#a78bfa',
  nord:          '#7eb8c9',
  light:         '#4f46e5',
  solarized:     '#268bd2',
  'tokyo-night': '#7aa2f7',
  catppuccin:    '#cba6f7',
};

const THEME_LABELS = {
  mono:          'Mono',
  minimal:       'Minimal',
  dark:          'Dark',
  matrix:        'Matrix',
  cyberpunk:     'Cyber',
  dracula:       'Dracula',
  nord:          'Nord',
  light:         'Light',
  solarized:     'Solar',
  'tokyo-night': 'Tokyo',
  catppuccin:    'Catppuccin',
};

function ISTClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
      }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <div className="sidebar-clock">{time} IST</div>;
}

function CopyBtn({ value }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button className="sidebar-copy-btn" onClick={copy} title={"Copy " + value}>
      <i className={"fas " + (copied ? "fa-check" : "fa-copy")} />
    </button>
  );
}

function fileIcon(name) {
  if (name.endsWith('.txt'))  return 'fa-file-lines';
  if (name.endsWith('.json')) return 'fa-file-code';
  if (name.endsWith('.md'))   return 'fa-file-alt';
  if (name.endsWith('.sh'))   return 'fa-terminal';
  return 'fa-file';
}

function VFSExplorer({ resolvForExplorer }) {
  const [expanded, setExpanded] = useState({ '/': true });
  const [fileModal, setFileModal] = useState(null);
  const [query,     setQuery]    = useState('');
  const { node: root } = resolvForExplorer('/');

  const toggle = (fp) => setExpanded(p => ({ ...p, [fp]: !p[fp] }));
  const openFile = (name, content) => setFileModal({ name, content });
  const closeFile = () => setFileModal(null);

  function countFiles(node) {
    if (!node || node.type !== 'dir') return 0;
    return Object.values(node.children).reduce((acc, c) =>
      acc + (c.type === 'file' ? 1 : countFiles(c)), 0);
  }

  function matchesQuery(name, node) {
    if (!query) return true;
    const q = query.toLowerCase();
    if (name.toLowerCase().includes(q)) return true;
    if (node.type === 'file' && node.content?.toLowerCase().includes(q)) return true;
    if (node.type === 'dir') {
      return Object.entries(node.children).some(([n, c]) => matchesQuery(n, c));
    }
    return false;
  }

  function renderDir(node, fp) {
    if (!node || node.type !== 'dir') return null;
    return Object.entries(node.children)
      .filter(([n, c]) => matchesQuery(n, c))
      .sort(([, a], [, b]) => {
        if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
        return 0;
      })
      .map(([name, child]) => {
        const childFp = fp + name;
        if (child.type === 'dir') {
          const count = countFiles(child);
          return (
            <li key={childFp}>
              <button
                className={"vfs-dir" + (expanded[childFp] ? " open" : "")}
                onClick={() => toggle(childFp)}
              >
                <i className={"fas fa-chevron-right vfs-chevron" + (expanded[childFp] ? " open" : "")} />
                <i className={"fas " + (expanded[childFp] ? "fa-folder-open" : "fa-folder") + " vfs-folder-icon"} />
                <span className="vfs-name">{name}</span>
                <span className="vfs-badge">{count}</span>
              </button>
              {expanded[childFp] && (
                <ul className="vfs-children">{renderDir(child, childFp + '/')}</ul>
              )}
            </li>
          );
        }
        return (
          <li key={childFp}>
            <button
              className="vfs-file"
              onClick={() => openFile(childFp, child.content)}
            >
              <i className={"fas " + fileIcon(name) + " vfs-file-icon"} />
              <span className="vfs-name">{name}</span>
              <span className="vfs-lines">{child.content?.split("\n").length || 0}L</span>
            </button>
          </li>
        );
      });
  }

  const shortName = fileModal?.name?.split('/').pop() ?? '';

  return (
    <>
      <div className="vfs-explorer">
        <div className="vfs-header">
          <span className="vfs-title-text">
            <i className="fas fa-folder-tree" /> File System
          </span>
          <span className="vfs-file-count">{countFiles(root)} files</span>
        </div>

        <div className="vfs-search-wrap">
          <i className="fas fa-magnifying-glass vfs-search-icon" />
          <input
            className="vfs-search"
            type="text"
            placeholder="Search files..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className="vfs-search-clear" onClick={() => setQuery('')}>
              <i className="fas fa-xmark" />
            </button>
          )}
        </div>

        <ul className="vfs-root">
          {root ? renderDir(root, '/') : (
            <li className="vfs-empty">No files found</li>
          )}
        </ul>
      </div>

      <Modal open={!!fileModal} title={shortName} onClose={closeFile}>
        <pre className="vfs-file-pre">{fileModal?.content || '(empty file)'}</pre>
      </Modal>
    </>
  );
}

export default function Sidebar({
  theme, setTheme,
  resolvForExplorer,
  playClick,
  drawerOpen,
  onCloseDrawer,
}) {
  const [resumeOpen, setResumeOpen] = useState(false);
  const c = PortfolioData.contact;

  const resumeLines = [
    'HARSH TIWARI — SOFTWARE ENGINEER',
    c.email + '  |  ' + c.phone + '  |  ' + c.location,
    'LinkedIn: ' + c.linkedin + '  |  GitHub: ' + c.github,
    '',
    'EXPERIENCE',
    '─────────────────────────────────────────────────────',
    'Assistant Systems Engineer @ Tata Consultancy Services (TCS)',
    'Jan 2026 - Present | Java, AEM, Agile',
    '',
    'Associate Software Engineer Intern @ Ignitive Software Labs',
    'Jan 2025 - April 2025 | Kotlin, Jetpack Compose, Room, REST APIs',
    '',
    'PROJECTS',
    '─────────────────────────────────────────────────────',
    'Mini Compiler & Web-Based IDE',
    '  Java, JavaScript, HTTP API',
    '',
    'Versatile Appointment Scheduling System',
    '  Spring Boot, PostgreSQL, Docker, Spring Data JPA',
    '',
    'StudyHub Android App',
    '  Kotlin, Firebase, Jetpack Compose, Room Database',
    '',
    'Student Performance Prediction System',
    '  Python, Machine Learning, Scikit-Learn, Pandas',
    '',
    'PlayLog Game Session Tracker',
    '  Kotlin, Jetpack Compose, Coroutines, Flow API',
    '',
    'SKILLS',
    '─────────────────────────────────────────────────────',
    'Languages  : ' + PortfolioData.skills.languages.join(', '),
    'Backend    : ' + PortfolioData.skills.backend.join(', '),
    'Mobile/FE  : ' + PortfolioData.skills.frontendMobile.join(', '),
    'Databases  : ' + PortfolioData.skills.databases.join(', '),
    'Tools      : ' + PortfolioData.skills.tools.join(', '),
    '',
    'EDUCATION',
    '─────────────────────────────────────────────────────',
    'B.Tech Information Technology (2021-2025)',
    '  SVVV, Indore | CGPA: 8.33 / 10',
    'Class XII (2021) | 83.60%',
    'Class X  (2019) | 82.20%',
  ];

  return (
    <aside className={"dash-sidebar" + (drawerOpen ? " drawer-open" : "")}>
      <div className="sidebar-inner">

        {drawerOpen && (
          <button className="drawer-close-btn" onClick={onCloseDrawer} aria-label="Close sidebar">
            <i className="fas fa-xmark" />
          </button>
        )}

        <div className="sidebar-profile">
          <div className="sidebar-avatar-wrap">
            <div className="sidebar-avatar-ring-spin" aria-hidden="true" />
            <div className="sidebar-avatar-mono">HT</div>
          </div>
          <h2 className="sidebar-name">Harsh Tiwari</h2>
          <p className="sidebar-role">Assistant Systems Engineer at TCS</p>
          <p className="sidebar-location">
            <i className="fas fa-location-dot" />
            {c.location}
          </p>
          <ISTClock />
        </div>

        <div className="sidebar-section">
          <h4 className="sidebar-section-title">Contact</h4>
          <div className="sidebar-contact-list">
            <div className="sidebar-contact-row">
              <i className="fas fa-envelope" style={{ color: 'var(--accent)', fontSize: 11 }} />
              <span className="sidebar-contact-text" title={c.email}>{c.email}</span>
              <CopyBtn value={c.email} />
            </div>
            <div className="sidebar-contact-row">
              <i className="fas fa-phone" style={{ color: 'var(--accent)', fontSize: 11 }} />
              <span className="sidebar-contact-text" title={c.phone}>{c.phone}</span>
              <CopyBtn value={c.phone} />
            </div>
          </div>
        </div>

        <div className="sidebar-links">
          <a href={"mailto:" + c.email} className="link-btn">
            <i className="fas fa-envelope" /> Email
          </a>
          <a href={c.linkedinUrl} target="_blank" rel="noopener noreferrer" className="link-btn">
            <i className="fab fa-linkedin" /> LinkedIn
          </a>
          <a href={c.githubUrl} target="_blank" rel="noopener noreferrer" className="link-btn">
            <i className="fab fa-github" /> GitHub
          </a>
        </div>

        <button
          className="resume-download-btn"
          onClick={() => { setResumeOpen(true); playClick?.(); }}
        >
          <i className="fas fa-file-lines" /> View Resume
        </button>

        <div className="sidebar-section">
          <h4 className="sidebar-section-title">Theme</h4>
          <div className="theme-swatches">
            {THEMES.map(t => (
              <button
                key={t}
                className={"theme-swatch" + (theme === t ? " active" : "")}
                style={{ '--swatch-color': THEME_COLORS[t] }}
                onClick={() => { setTheme(t); playClick?.(); }}
                aria-label={t}
              >
                <span className="swatch-dot" />
                <span className="swatch-label">{THEME_LABELS[t]}</span>
              </button>
            ))}
          </div>
        </div>

        <VFSExplorer resolvForExplorer={resolvForExplorer} />

      </div>

      <Modal open={resumeOpen} title="Resume — Harsh Tiwari" onClose={() => setResumeOpen(false)}>
        <pre className="resume-pre">{resumeLines.join('\n')}</pre>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href="/resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="resume-dl-btn"
            onClick={() => playClick?.()}
          >
            <i className="fas fa-download" /> Download PDF
          </a>
        </div>
      </Modal>
    </aside>
  );
}
