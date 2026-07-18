import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PortfolioData } from '../../../data/portfolioData.js';

const cardVariant = {
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const getInitials = (co) => {
  if (co.includes('Tata') || co.includes('TCS')) return 'TCS';
  if (co.includes('Ignitive')) return 'ISL';
  return co.slice(0, 3).toUpperCase();
};

function TimelineItem({ e, i }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const techTags = e.tech ? e.tech.split(',').map(t => t.trim()) : [];

  return (
    <motion.div
      ref={ref}
      className="timeline-item"
      variants={cardVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{ transitionDelay: `${i * 0.1}s` }}
    >
      <div className="timeline-dot-wrap">
        <div className={`timeline-dot${inView ? ' timeline-dot--lit' : ''}`}>
          {getInitials(e.company)}
        </div>
      </div>
      <motion.div
        className="timeline-card"
        whileHover={{ x: 4, transition: { duration: 0.18 } }}
      >
        <div className="exp-header">
          <h3 className="exp-role">{e.role}</h3>
          <span className="exp-duration">{e.duration}</span>
        </div>
        <p className="exp-company">
          <i className="fas fa-building" style={{ marginRight: 6, opacity: 0.6 }} />
          {e.company}
        </p>
        <div className="exp-tech-tags">
          {techTags.map(tag => (
            <span key={tag} className="exp-tech-pill">{tag}</span>
          ))}
        </div>
        <ul className="exp-details">
          {e.details.map((d, j) => <li key={j}>{d}</li>)}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default function ExperienceTab() {
  const lineRef = useRef(null);
  const inView  = useInView(lineRef, { once: true, margin: '-40px' });

  return (
    <div>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="section-icon"><i className="fas fa-briefcase" /></div>
        <h2 className="section-title">Work Experience</h2>
        <span className="section-badge">{PortfolioData.experience.length} positions</span>
      </motion.div>

      <div className="experience-layout">
        <div className="timeline-container">
          <div className="timeline" ref={lineRef}>
            {/* animated connector line */}
            <motion.div
              className="timeline-line"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: inView ? 1 : 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.2 }}
              style={{ transformOrigin: 'top' }}
            />
            {PortfolioData.experience.map((e, i) => (
              <TimelineItem key={i} e={e} i={i} />
            ))}
          </div>
        </div>

        <motion.div 
          className="experience-sidebar-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="exp-sidebar-title">
            <i className="fas fa-circle-nodes" style={{ color: 'var(--accent)' }} /> Key Areas of Impact
          </h3>
          <ul className="exp-sidebar-list">
            <li>
              <strong>AI Agent Engineering</strong>
              <p>Designing custom AI agents and reusable agent workflows across platforms, with current hands-on work creating GitHub Copilot agent definition files.</p>
            </li>
            <li>
              <strong>Enterprise AEM Solutions</strong>
              <p>Designing modular OSGi services, servlet integrations, and customized core components in Java.</p>
            </li>
            <li>
              <strong>Native Android Apps</strong>
              <p>Developing Kotlin apps with modern declarative architecture (Jetpack Compose, Room DB, Coroutines).</p>
            </li>
            <li>
              <strong>Systems Engineering</strong>
              <p>Lexer, Parser, and AST visitor patterns engineered entirely from scratch in Java.</p>
            </li>
            <li>
              <strong>Scalability &amp; DB</strong>
              <p>Containerized deployment pipelines with Docker and PostgreSQL relational database optimization.</p>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
