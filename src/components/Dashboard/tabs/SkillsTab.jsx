import { PortfolioData } from '../../../data/portfolioData.js';

export default function SkillsTab() {
  return (
    <div>
      <div className="section-header">
        <div className="section-icon"><i className="fas fa-code" /></div>
        <h2 className="section-title">Technical Skills</h2>
        <span className="section-badge">
          {PortfolioData.skillBars.reduce((a, c) => a + c.items.length, 0)} skills
        </span>
      </div>

      <div className="skills-grid">
        {PortfolioData.skillBars.map(cat => (
          <div key={cat.category} className="skill-category-card">
            <div className="skill-cat-header">
              <div className="skill-cat-icon">
                <i className={`fas ${cat.icon}`} />
              </div>
              <span className="skill-cat-title">{cat.category}</span>
            </div>
            <div className="skill-bars">
              {cat.items.map(s => (
                <div key={s.name} className="skill-bar-item">
                  <div className="skill-bar-header">
                    <span className="skill-name">{s.name}</span>
                    <span className="skill-pct">{s.pct}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${s.pct}%` }}
                      role="progressbar"
                      aria-valuenow={s.pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
