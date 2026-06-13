import { PortfolioData } from '../../../data/portfolioData.js';

export default function ExperienceTab() {
  return (
    <div>
      <div className="section-header">
        <div className="section-icon"><i className="fas fa-briefcase" /></div>
        <h2 className="section-title">Work Experience</h2>
        <span className="section-badge">{PortfolioData.experience.length} positions</span>
      </div>

      <div className="timeline">
        {PortfolioData.experience.map((e, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot-wrap">
              <div className="timeline-dot" />
            </div>
            <div className="timeline-card">
              <div className="exp-header">
                <h3 className="exp-role">{e.role}</h3>
                <span className="exp-duration">{e.duration}</span>
              </div>
              <p className="exp-company">
                <i className="fas fa-building" style={{ marginRight: 6, opacity: 0.6 }} />
                {e.company}
              </p>
              <p className="exp-tech">
                <i className="fas fa-microchip" /> {e.tech}
              </p>
              <ul className="exp-details">
                {e.details.map((d, j) => <li key={j}>{d}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
