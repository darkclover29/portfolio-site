/**
 * CommandPalette — Cmd+K fuzzy search over tabs, projects, skills, commands.
 */
import { useEffect, useRef, useState, useMemo } from 'react';
import { PortfolioData } from '../../data/portfolioData.js';

const TABS = [
  { type: 'tab', id: 'about',      label: 'About',      icon: 'fa-user',         desc: 'Bio, stack, GitHub stats' },
  { type: 'tab', id: 'skills',     label: 'Skills',     icon: 'fa-code',         desc: 'Technical skills & proficiency' },
  { type: 'tab', id: 'experience', label: 'Experience', icon: 'fa-briefcase',    desc: 'Work history at TCS' },
  { type: 'tab', id: 'projects',   label: 'Projects',   icon: 'fa-folder-open',  desc: 'All portfolio projects' },
  { type: 'tab', id: 'education',  label: 'Education',  icon: 'fa-graduation-cap', desc: 'Academic background' },
  { type: 'tab', id: 'contact',    label: 'Contact',    icon: 'fa-envelope',     desc: 'Get in touch' },
  { type: 'tab', id: 'cli',        label: 'Terminal',   icon: 'fa-terminal',     desc: 'Open CLI / terminal view' },
];

const TERMINAL_CMDS = [
  'help','about','skills','projects','experience','education','contact',
  'weather','github','joke','quote','hire','clear','matrix','snake','music',
  'cowsay','neofetch','open','history','darkclover',
].map(c => ({ type: 'cmd', id: c, label: c, icon: 'fa-terminal', desc: `Run "${c}" in terminal` }));

function buildItems() {
  const projects = PortfolioData.projects.map(p => ({
    type: 'project', id: p.name, label: p.name, icon: p.icon || 'fa-folder',
    desc: p.tech, tags: p.tags,
  }));
  return [...TABS, ...projects, ...TERMINAL_CMDS];
}

function fuzzy(query, item) {
  const q = query.toLowerCase();
  const haystack = `${item.label} ${item.desc || ''} ${(item.tags || []).join(' ')}`.toLowerCase();
  return haystack.includes(q);
}

function GroupLabel({ label }) {
  return <div className="cp-group-label">{label}</div>;
}

export default function CommandPalette({ onNavigate, onClose }) {
  const [query, setQuery]   = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef            = useRef(null);
  const listRef             = useRef(null);
  const allItems            = useMemo(buildItems, []);

  const results = useMemo(() => {
    if (!query.trim()) return TABS.slice(0, 7);
    return allItems.filter(item => fuzzy(query, item)).slice(0, 12);
  }, [query, allItems]);

  // Auto-focus input
  useEffect(() => { inputRef.current?.focus(); }, []);


  // Reset cursor on query change
  useEffect(() => { setCursor(0); }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.children[cursor];
    el?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  const select = (item) => {
    if (item.type === 'tab')     onNavigate?.({ type: 'tab',     id: item.id });
    if (item.type === 'project') onNavigate?.({ type: 'project', id: item.id });
    if (item.type === 'cmd')     onNavigate?.({ type: 'cmd',     id: item.id });
    onClose();
  };

  // Global keyboard nav — works even when input loses focus
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown')  { e.preventDefault(); setCursor(c => Math.min(c + 1, results.length - 1)); }
      if (e.key === 'ArrowUp')    { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)); }
      if (e.key === 'Enter')      { if (results[cursor]) select(results[cursor]); }
      if (e.key === 'Escape')     { onClose(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [results, cursor, onClose]);

  const typeIcon = (type) => ({ tab:'fa-arrow-right', project:'fa-folder', cmd:'fa-terminal' })[type];

  return (
    <div className="cp-overlay" onClick={onClose}>
      <div className="cp-modal" onClick={e => e.stopPropagation()}>
        <div className="cp-search-row">
          <i className="fas fa-search cp-search-icon" />
          <input
            ref={inputRef}
            className="cp-input"
            placeholder="Search tabs, projects, commands…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
          <kbd className="cp-esc-hint">Esc</kbd>
        </div>
        {results.length > 0 ? (
          <ul className="cp-list" ref={listRef} role="listbox">
            {!query && <GroupLabel label="Navigate" />}
            {results.map((item, i) => (
              <li
                key={item.type + item.id}
                className={`cp-item${i === cursor ? ' cp-item--active' : ''}`}
                onClick={() => select(item)}
                onMouseEnter={() => setCursor(i)}
                role="option"
                aria-selected={i === cursor}
              >
                <span className="cp-item-icon">
                  <i className={`fas ${item.icon}`} />
                </span>
                <span className="cp-item-body">
                  <span className="cp-item-label">{item.label}</span>
                  {item.desc && <span className="cp-item-desc">{item.desc}</span>}
                </span>
                <span className="cp-item-type">
                  <i className={`fas ${typeIcon(item.type)}`} />
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="cp-empty">No results for "<strong>{query}</strong>"</div>
        )}
        <div className="cp-footer">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>Enter</kbd> select</span>
          <span><kbd>Esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
