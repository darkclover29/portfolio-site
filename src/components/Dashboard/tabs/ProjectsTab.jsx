import { useState, useMemo } from 'react';
import { PortfolioData } from '../../../data/portfolioData.js';

export default function ProjectsTab() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Collect unique tags across all projects
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

  return (
    <div>
      <div className="section-header">
        <div className="section-icon"><i className="fas fa-folder-open" /></div>
        <h2 className="section-title">Projects</h2>
        <span className="section-badge">{visible.length}/{PortfolioData.projects.length}</span>
      </div>

      {/* Tag filter bar */}
      <div className="project-filters">
        {allTags.map(tag => (
          <button
            key={tag}
            className={`filter-btn${activeFilter === tag ? ' active' : ''}`}
            onClick={() => setActiveFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="projects-grid">
        {visible.map((p, i) => (
          <div key={i} className="project-card">
            <div className="project-card-top">
              <div className="project-icon-wrap">
                <i className={`fas ${p.icon}`} />
              </div>
              <div>
                <h3 className="project-name">{p.name}</h3>
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
                  title={`Filter by ${t}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)', fontSize: '13px' }}>
          No projects match <strong style={{ color: 'var(--accent)' }}>{activeFilter}</strong>.
          <button
            style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '13px' }}
            onClick={() => setActiveFilter('All')}
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}
