import { PortfolioData } from '../../../data/portfolioData.js';

const EDU_ICONS = ['fa-graduation-cap', 'fa-school', 'fa-school'];

export default function EducationTab() {
  return (
    <div>
      <div className="section-header">
        <div className="section-icon"><i className="fas fa-graduation-cap" /></div>
        <h2 className="section-title">Education</h2>
      </div>

      <div className="edu-timeline">
        {PortfolioData.education.map((e, i) => (
          <div key={i} className="edu-card">
            <div className="edu-icon">
              <i className={`fas ${EDU_ICONS[i] || 'fa-graduation-cap'}`} />
            </div>
            <div>
              <h3 className="edu-level">{e.level}</h3>
              <p className="edu-institute">{e.institute}</p>
              <span className="edu-grade">
                <i className="fas fa-star" /> {e.grade}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
