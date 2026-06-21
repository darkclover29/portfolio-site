import { useState, useEffect, useRef, useCallback } from 'react';

const COMMANDS = [
  // Navigation
  { group: 'Navigate', id: 'about',       label: 'About',          icon: 'fa-user',            action: 'tab' },
  { group: 'Navigate', id: 'skills',      label: 'Skills',         icon: 'fa-code',            action: 'tab' },
  { group: 'Navigate', id: 'experience',  label: 'Experience',     icon: 'fa-briefcase',       action: 'tab' },
  { group: 'Navigate', id: 'projects',    label: 'Projects',       icon: 'fa-folder-open',     action: 'tab' },
  { group: 'Navigate', id: 'education',   label: 'Education',      icon: 'fa-graduation-cap',  action: 'tab' },
  { group: 'Navigate', id: 'chat',        label: 'AI Chat',        icon: 'fa-comment-dots',    action: 'tab' },
  { group: 'Navigate', id: 'cli',         label: 'Switch to CLI',  icon: 'fa-terminal',        action: 'cli' },
  // Contact
  { group: 'Contact',  id: 'copy-email',  label: 'Copy Email',     icon: 'fa-envelope',        action: 'copy',  value: 'harshtiwari493@gmail.com' },
  { group: 'Contact',  id: 'copy-phone',  label: 'Copy Phone',     icon: 'fa-phone',           action: 'copy',  value: '+91-7805841898' },
  { group: 'Contact',  id: 'linkedin',    label: 'Open LinkedIn',  icon: 'fa-linkedin',        action: 'link',  url: 'https://linkedin.com/in/harshtiwari29' },
  { group: 'Contact',  id: 'github',      label: 'Open GitHub',    icon: 'fa-github',          action: 'link',  url: 'https://github.com/harshtiwari29' },
  // Themes
  { group: 'Theme',    id: 'tm-matrix',   label: 'Matrix',         icon: 'fa-circle',          action: 'theme', theme: 'matrix' },
  { group: 'Theme',    id: 'tm-cyber',    label: 'Cyberpunk',      icon: 'fa-circle',          action: 'theme', theme: 'cyberpunk' },
  { group: 'Theme',    id: 'tm-dracula',  label: 'Dracula',        icon: 'fa-circle',          action: 'theme', theme: 'dracula' },
  { group: 'Theme',    id: 'tm-nord',     label: 'Nord',           icon: 'fa-circle',          action: 'theme', theme: 'nord' },
  { group: 'Theme',    id: 'tm-retro',    label: 'Retro Light',    icon: 'fa-circle',          action: 'theme', theme: 'retro-light' },
];

const ICON_BRANDS = new Set(['fa-linkedin', 'fa-github']);

function CmdItem({ cmd, isSelected, onHover, onClick }) {
  const iconClass = ICON_BRANDS.has(cmd.icon)
    ? `fa-brands ${cmd.icon}`
    : `fas ${cmd.icon}`;
  return (
    <button
      className={`cmd-item${isSelected ? ' is-selected' : ''}`}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      <span className="cmd-item-icon"><i className={iconClass} /></span>
      <span className="cmd-item-label">{cmd.label}</span>
      <span className="cmd-item-badge">{cmd.group}</span>
    </button>
  );
}

export default function CommandPalette({ open, onClose, onNavigate, onCli, setTheme }) {
  const [query, setQuery]   = useState('');
  const [sel, setSel]       = useState(0);
  const [notice, setNotice] = useState('');
  const inputRef = useRef(null);
  const listRef  = useRef(null);

  const filtered = query.trim()
    ? COMMANDS.filter(c =>
        `${c.label} ${c.group}`.toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS;

  // Focus + reset on open
  useEffect(() => {
    if (open) {
      setQuery(''); setSel(0); setNotice('');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => { setSel(0); }, [query]);

  // Keep selected item scrolled into view
  useEffect(() => {
    listRef.current?.querySelector('[data-selected="true"]')
      ?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }, [sel]);

  const flash = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 2200); };

  const execute = useCallback((cmd) => {
    if (!cmd) return;
    switch (cmd.action) {
      case 'tab':   onNavigate(cmd.id); onClose(); break;
      case 'cli':   onCli(); onClose(); break;
      case 'theme': setTheme(cmd.theme); flash(`Theme: ${cmd.label}`); break;  // keep open
      case 'copy':
        navigator.clipboard?.writeText(cmd.value)
          .then(() => flash(`Copied "${cmd.value}"`))
          .catch(() => flash('Copy failed'));
        break;
      case 'link':
        window.open(cmd.url, '_blank', 'noopener noreferrer');
        onClose();
        break;
    }
  }, [onNavigate, onCli, setTheme, onClose]);

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape')    { onClose(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
    if (e.key === 'Enter')     { e.preventDefault(); execute(filtered[sel]); }
  }, [filtered, sel, execute, onClose]);

  if (!open) return null;

  // Group display when no query
  const groups = {};
  filtered.forEach(c => (groups[c.group] ??= []).push(c));

  return (
    <div className="cmd-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="cmd-box" onClick={e => e.stopPropagation()}>

        <div className="cmd-header">
          <i className="fas fa-magnifying-glass cmd-search-icon" />
          <input
            ref={inputRef}
            className="cmd-input"
            placeholder="Search commands, tabs, themes…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
            autoComplete="off"
            spellCheck="false"
          />
          {notice && <span className="cmd-notice">{notice}</span>}
          <kbd className="cmd-esc-key">Esc</kbd>
        </div>

        <div className="cmd-list" ref={listRef}>
          {filtered.length === 0 ? (
            <div className="cmd-empty">No results for "<strong>{query}</strong>"</div>
          ) : query.trim() ? (
            filtered.map((c, i) => (
              <CmdItem key={c.id} cmd={c}
                isSelected={i === sel}
                onHover={() => setSel(i)}
                onClick={() => execute(c)}
                data-selected={i === sel}
              />
            ))
          ) : (
            Object.entries(groups).map(([group, cmds]) => (
              <div key={group} className="cmd-group">
                <div className="cmd-group-label">{group}</div>
                {cmds.map(c => {
                  const gi = filtered.indexOf(c);
                  return (
                    <CmdItem key={c.id} cmd={c}
                      isSelected={gi === sel}
                      onHover={() => setSel(gi)}
                      onClick={() => execute(c)}
                    />
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>Esc</kbd> close</span>
          <span className="cmd-footer-tip">Ctrl+K to toggle</span>
        </div>
      </div>
    </div>
  );
}
