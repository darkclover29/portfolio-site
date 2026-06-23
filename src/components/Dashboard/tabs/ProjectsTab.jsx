import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '../../../data/portfolioData.js';
import ComingSoon from '../../shared/ComingSoon.jsx';
import BorderGlow from '../../shared/BorderGlow.jsx';

const listVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.075, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 22, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const filterBtnVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.04 } },
};
const filterItemVariants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1,    transition: { duration: 0.22 } },
};

// Per-project glow accent colors (cycles through 3 palettes)
const GLOW_PALETTES = [
  { glowColor: '262 52 72', colors: ['#a78bfa', '#818cf8', '#38bdf8'] },
  { glowColor: '217 91 60', colors: ['#38bdf8', '#22d3ee', '#818cf8'] },
  { glowColor: '315 60 68', colors: ['#f472b6', '#c084fc', '#38bdf8'] },
];

function ProjectPreviewOverlay({ project, onDismiss }) {
  return (
    <div className="project-preview-overlay" onClick={onDismiss}>
      <div className="project-preview-card" onClick={e => e.stopPropagation()}>
        <div className="project-preview-header">
          <i className={`fas ${project.icon} project-preview-icon`} />
          <div>
            <h3 className="project-preview-name">{project.name}</h3>
            <p className="project-preview-tech">{project.tech}</p>
          </div>
          <button className="project-preview-close" onClick={onDismiss}>
            <i className="fas fa-times" />
          </button>
        </div>
        <p className="project-preview-overview">{project.overview}</p>
        {project.details?.length > 0 && (
          <ul className="project-preview-details">
            {project.details.slice(0, 3).map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        )}
        <div className="project-preview-tags">
          {project.tags?.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer"
             className="project-preview-link">
            <i className="fas fa-arrow-up-right-from-square" /> View Live
          </a>
        )}
      </div>
    </div>
  );
}
export default function ProjectsTab({ highlightProject }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [csOpen, setCsOpen]             = useState(false);
  const [csProject, setCsProject]       = useState('');

  const allTags = useMemo(() => {
    const set = new Set();
    PortfolioData.projects.forEach(p => p.tags?.forEach(t => set.add(t)));
    return ['All', ...Array.from(set)];
  }, []);

  const visible = useMemo(() =>
    activeFilter === 'All'
      ? PortfolioData.projects
      : PortfolioData.projects.filter(p => p.tags?.includes(activeFilter)),
    [activeFilter]
  );

  const openLink = (p, type) => {
    const url = type === 'github' ? p.github : p.liveUrl;
    if (url) { window.open(url, '_blank', 'noopener,noreferrer'); }
    else { setCsProject(p.name); setCsOpen(true); }
  };

  const cardRefs = useRef({});
  useEffect(() => {
    if (!highlightProject) return;
    setActiveFilter('All');
    const timer = setTimeout(() => {
      const el = cardRefs.current[highlightProject];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 250);
    return () => clearTimeout(timer);
  }, [highlightProject]);

  const scrollRef  = useRef(null);
  const [prog, setProg] = useState(0);
  const [preview, setPreview] = useState(null);
  const holdTimer = useRef(null);
  const startHold = useCallback((p) => {
    holdTimer.current = setTimeout(() => setPreview(p), 500);
  }, []);
  const cancelHold = useCallback(() => {
    clearTimeout(holdTimer.current);
  }, []);
  useEffect(() => {
    const el = scrollRef.current?.closest('.dash-content, .tab-scroll, [class*="content"]')
      || document.querySelector('.dash-content');
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const max = scrollHeight - clientHeight;
      setProg(max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={scrollRef} className="projects-scroll-wrap">
      <div className="projects-scroll-progress">
        <div className="projects-scroll-fill" style={{ width: `${prog}%` }} />
      </div>
    <div>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="section-icon"><i className="fas fa-folder-open" /></div>
        <h2 className="section-title">Projects</h2>
        <span className="section-badge">{visible.length}/{PortfolioData.projects.length}</span>
      </motion.div>

      <motion.div
        className="project-filters"
        variants={filterBtnVariants}
        initial="hidden"
        animate="visible"
      >
        {allTags.map(tag => (
          <motion.button
            key={tag}
            variants={filterItemVariants}
            className={`filter-btn${activeFilter === tag ? ' active' : ''}`}
            onClick={() => setActiveFilter(tag)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tag}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        className="projects-grid"
        key={activeFilter}
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {visible.map((p, i) => {
          const palette = GLOW_PALETTES[i % GLOW_PALETTES.length];
          return (
            <motion.div
              key={p.name + i}
              ref={el => { cardRefs.current[p.name] = el; }}
              variants={cardVariants}
              className={`project-card-anim${highlightProject === p.name ? ' project-card--highlight' : ''}`}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
              onMouseDown={() => startHold(p)}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
              onTouchStart={() => startHold(p)}
              onTouchEnd={cancelHold}
              onTouchCancel={cancelHold}
            >
              <BorderGlow
                backgroundColor="var(--surface)"
                glowColor={palette.glowColor}
                colors={palette.colors}
                borderRadius={14}
                glowRadius={32}
                glowIntensity={0.85}
                coneSpread={22}
                edgeSensitivity={28}
                fillOpacity={0.4}
                animated={p.featured}
                className={`project-card${p.featured ? ' project-card--featured' : ''}`}
              >
                {p.featured && (
                  <div className="project-featured-badge">
                    <i className="fas fa-star" /> Featured
                  </div>
                )}

                <div className="project-card-top">
                  <div className="project-icon-wrap">
                    <i className={`fas ${p.icon}`} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 className="project-name">
                      {p.name}
                      {p.featured && p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-live-inline"
                          title="Open live demo"
                          onClick={e => e.stopPropagation()}
                        >
                          <i className="fas fa-arrow-up-right-from-square" />
                        </a>
                      )}
                    </h3>
                    <p className="project-tech-line">{p.tech}</p>
                  </div>
                </div>

                <p className="project-overview">{p.overview}</p>
                <ul className="project-details">
                  {p.details.map((d, j) => <li key={j}>{d}</li>)}
                </ul>
                <div className="project-tags">
                  {p.tags?.map(t => (
                    <span
                      key={t}
                      className={`tag${t === activeFilter ? ' tag--active' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActiveFilter(t === activeFilter ? 'All' : t)}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="project-card-links">
                  <button
                    className="project-link-btn"
                    onClick={() => openLink(p, 'github')}
                  >
                    <i className="fab fa-github" /> GitHub
                    {!p.github && <span className="coming-soon-tag">Soon</span>}
                  </button>
                  {(p.liveUrl !== undefined) && (
                    <button
                      className={`project-link-btn${p.featured && p.liveUrl ? ' project-link-btn--featured' : ''}`}
                      onClick={() => openLink(p, 'live')}
                    >
                      <i className="fas fa-arrow-up-right-from-square" /> Live
                      {!p.liveUrl && <span className="coming-soon-tag">Soon</span>}
                    </button>
                  )}
                </div>
              </BorderGlow>
            </motion.div>
          );
        })}
      </motion.div>

      {visible.length === 0 && (
        <motion.div className="projects-empty-state" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}>
          <i className="fas fa-folder-open" />
          <p>No projects match <strong>{activeFilter}</strong></p>
          <button onClick={() => setActiveFilter('All')}>Clear filter</button>
        </motion.div>
      )}

      <ComingSoon open={csOpen} onClose={() => setCsOpen(false)} projectName={csProject} />
      {preview && <ProjectPreviewOverlay project={preview} onDismiss={() => setPreview(null)} />}
    </div>
    </div>
  );
}