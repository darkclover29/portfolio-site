import { useState, useEffect } from 'react';
import { PortfolioData } from '../../data/portfolioData.js';
import Modal from '../shared/Modal.jsx';

const THEMES = ['matrix', 'cyberpunk', 'dracula', 'nord', 'retro-light'];

// ── Live IST Clock ─────────────────────────────────────────────────────────────
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

// ── Copy-to-clipboard button ───────────────────────────────────────────────────
function CopyBtn({ value }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button className="sidebar-copy-btn" onClick={copy} title={`Copy ${value}`}>
      <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`} />
    </button>
  );
}

// ── VFS Explorer ───────────────────────────────────────────────────────────────
function VFSExplorer({ resolvForExplorer }) {
  const [expanded, setExpanded] = useState({});
  const root = resolvForExplorer('/');
  const toggle = (key) => setExpanded(p => ({ ...p, [key]: !p[key] }));

  function renderDir(node, path) {
    if (!node || node.type !== 'dir') return null;
    return Object.entries(node.children).map(([name, child]) => {
      const fp = path + name;
      if (child.type === 'dir') {
        return (
          <li key={fp}>
            <button className="vfs-dir" onClick={() => toggle(fp)}>
              {expanded[fp] ? '📂' : '📁'} {name}/
            </button>
            {expanded[fp] && (
              <ul className="vfs-children">{renderDir(child, fp + '/')}</ul>
            )}
          </li>
        );
      }
      return <li key={fp} className="vfs-file">📄 {name}</li>;
    });
  }

  return (
    <div className="vfs-explorer">
      <h4 className="vfs-title"><i className="fas fa-folder-tree" /> File System</h4>
      <ul className="vfs-root">
        {root.node
          ? renderDir(root.node, '/')
          : <li style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Loading…</li>
        }
      </ul>
    </div>
  );
}

// ── Sidebar ────────────────────────────────────────────────────────────────────
export default function Sidebar({
  theme, setTheme,
  muted, toggleMute, bgmTrack, changeBgm,
  resolvForExplorer,
  playClick,
}) {
  const [resumeOpen, setResumeOpen] = useState(false);
  const c = PortfolioData.contact;

  const resumeText = [
    `HARSH TIWARI — SOFTWARE ENGINEER`,
    `${c.email}  |  ${c.phone}  |  ${c.location}`,
    `LinkedIn: ${c.linkedin}  |  GitHub: ${c.github}`,
    ``,
    `━━━ EXPERIENCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ...PortfolioData.experience.flatMap(e => [
      ``,
      `${e.role} @ ${e.company}`,
      `Duration : ${e.duration}`,
      `Tech     : ${e.tech}`,
      ...e.details.map(d => `  • ${d}`),
    ]),
    ``,
    `━━━ PROJECTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ...PortfolioData.projects.map(p => `\n• ${p.name}\n  ${p.tech}`),
    ``,
    `━━━ EDUCATION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ...PortfolioData.education.map(e => `\n• ${e.level}\n  ${e.institute}\n  ${e.grade}`),
    ``,
    `━━━ SKILLS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Languages  : ${PortfolioData.skills.languages.join(', ')}`,
    `Backend    : ${PortfolioData.skills.backend.join(', ')}`,
    `Mobile/FE  : ${PortfolioData.skills.frontendMobile.join(', ')}`,
    `Databases  : ${PortfolioData.skills.databases.join(', ')}`,
    `Tools      : ${PortfolioData.skills.tools.join(', ')}`,
  ].join('\n');

  return (
    <aside className="dash-sidebar">
      <div className="sidebar-inner">

        {/* Profile */}
        <div className="sidebar-profile">
          <div className="sidebar-avatar-wrap">
            <img src="/avatar.png" alt="Harsh Tiwari" className="sidebar-avatar" />
            <span className="sidebar-status" title="Available for opportunities" />
          </div>
          <h2 className="sidebar-name">Harsh Tiwari</h2>
          <p className="sidebar-role">Software Engineer @ TCS</p>
          <p className="sidebar-location">
            <i className="fas fa-location-dot" />
            {c.location}
          </p>
          {/* Live clock */}
          <ISTClock />
        </div>

        {/* Contact with copy buttons */}
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

        {/* Links */}
        <div className="sidebar-links">
          <a href={`mailto:${c.email}`} className="link-btn">
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

        {/* Theme */}
        <div className="sidebar-section">
          <h4 className="sidebar-section-title">Theme</h4>
          <div className="theme-buttons">
            {THEMES.map(t => (
              <button
                key={t}
                className={`theme-btn${theme === t ? ' active' : ''}`}
                onClick={() => { setTheme(t); playClick?.(); }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Audio */}
        <div className="sidebar-section">
          <h4 className="sidebar-section-title">Audio</h4>
          <div className="audio-controls">
            <button className="audio-btn" onClick={() => { toggleMute(); playClick?.(); }}>
              <i className={`fas fa-${muted ? 'volume-xmark' : 'volume-high'}`} />
              {muted ? 'Unmute' : 'Mute'}
            </button>
            <select
              className="bgm-select"
              value={bgmTrack}
              onChange={e => changeBgm(e.target.value)}
            >
              <option value="classic">Classic</option>
              <option value="synthwave">Synthwave</option>
              <option value="ambient">Ambient</option>
              <option value="off">Off</option>
            </select>
          </div>
        </div>

        {/* VFS */}
        <VFSExplorer resolvForExplorer={resolvForExplorer} />
      </div>

      <Modal open={resumeOpen} title="Resume — Harsh Tiwari" onClose={() => setResumeOpen(false)}>
        <pre className="resume-pre">{resumeText}</pre>
      </Modal>
    </aside>
  );
}
