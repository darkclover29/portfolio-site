import Modal from './Modal.jsx';
import { PortfolioData } from '../../data/portfolioData.js';

const FEATURED_PROJECTS = ['AgentVerse', 'PocketDex', 'Mini Compiler & Web-Based IDE'];

export default function ResumeModal({ open, onClose }) {
  const { contact, experience, education, projects, skills } = PortfolioData;
  const featured = FEATURED_PROJECTS.map(name => projects.find(project => project.name === name)).filter(Boolean);

  return (
    <Modal open={open} title="Résumé · Harsh Tiwari" onClose={onClose} className="resume-modal-shell">
      <article className="resume-modal-content">
        <header className="resume-modal-hero">
          <div className="resume-modal-avatar" aria-hidden="true">HT</div>
          <div className="resume-modal-identity">
            <span className="resume-modal-eyebrow">Software engineer · Available for freelance work</span>
            <h2>Harsh Tiwari</h2>
            <p>Assistant Systems Engineer at TCS building AI agents, automation workflows, backend systems, mobile apps, and web products.</p>
          </div>
          <span className="resume-modal-status"><i className="fas fa-circle" aria-hidden="true" /> Open to projects</span>
        </header>

        <nav className="resume-modal-contact" aria-label="Résumé contact links">
          <a href={`mailto:${contact.email}`}><i className="fas fa-envelope" aria-hidden="true" /> {contact.email}</a>
          <a href={`tel:${contact.phone}`}><i className="fas fa-phone" aria-hidden="true" /> {contact.phone}</a>
          <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" aria-hidden="true" /> LinkedIn</a>
          <a href={contact.githubUrl} target="_blank" rel="noopener noreferrer"><i className="fab fa-github" aria-hidden="true" /> GitHub</a>
        </nav>

        <div className="resume-modal-grid">
          <section className="resume-modal-section resume-modal-experience">
            <div className="resume-modal-section-title"><i className="fas fa-briefcase" aria-hidden="true" /> Experience</div>
            <div className="resume-modal-timeline">
              {experience.map(item => (
                <div className="resume-modal-role" key={`${item.company}-${item.role}`}>
                  <div className="resume-modal-role-head">
                    <div>
                      <h3>{item.role}</h3>
                      <strong>{item.company}</strong>
                    </div>
                    <span>{item.duration}</span>
                  </div>
                  <ul>
                    {item.details.slice(0, 3).map(detail => <li key={detail}>{detail}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <aside className="resume-modal-side">
            <section className="resume-modal-section">
              <div className="resume-modal-section-title"><i className="fas fa-wand-magic-sparkles" aria-hidden="true" /> Core capabilities</div>
              <div className="resume-modal-skill-group">
                <strong>AI agents &amp; automation</strong>
                <p>Custom AI agents, agent orchestration, GitHub Copilot agents, LLM integration, RAG, ChromaDB, and workflow automation.</p>
              </div>
              <div className="resume-modal-skill-group">
                <strong>Engineering</strong>
                <p>{[...skills.languages.slice(0, 4), 'Spring Boot', 'REST APIs', 'AEM', 'FastAPI'].join(' · ')}</p>
              </div>
              <div className="resume-modal-skill-group">
                <strong>Product delivery</strong>
                <p>React, Android SDK, Jetpack Compose, PostgreSQL, Firebase, Docker, Git, and API integrations.</p>
              </div>
            </section>

            <section className="resume-modal-section resume-modal-education">
              <div className="resume-modal-section-title"><i className="fas fa-graduation-cap" aria-hidden="true" /> Education</div>
              <strong>{education[0].level}</strong>
              <p>{education[0].institute}</p>
              <span>{education[0].grade}</span>
            </section>
          </aside>
        </div>

        <section className="resume-modal-section resume-modal-projects">
          <div className="resume-modal-section-title"><i className="fas fa-code" aria-hidden="true" /> Selected work</div>
          <div className="resume-modal-project-grid">
            {featured.map(project => (
              <a
                className="resume-modal-project"
                key={project.name}
                href={project.liveUrl || project.github || contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span><i className={`fas ${project.icon}`} aria-hidden="true" /></span>
                <div>
                  <strong>{project.name}</strong>
                  <p>{project.overview.split('—')[0].trim()}</p>
                  <small>{project.tags.slice(0, 4).join(' · ')}</small>
                </div>
              </a>
            ))}
          </div>
        </section>

        <footer className="resume-modal-footer">
          <p><strong>Have a project in mind?</strong> Send the scope, timeline, and desired outcome. I usually reply within 24 hours.</p>
          <a href={`mailto:${contact.email}?subject=Project inquiry`} className="resume-modal-cta">
            <i className="fas fa-paper-plane" aria-hidden="true" /> Start a conversation
          </a>
        </footer>
      </article>
    </Modal>
  );
}
