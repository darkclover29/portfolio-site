import { motion } from 'framer-motion';
import { PortfolioData } from '../../../data/portfolioData.js';

const timelineList = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const timelineItem = {
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0,   transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function ExperienceTab() {
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

      <motion.div
        className="timeline"
        variants={timelineList}
        initial="hidden"
        animate="visible"
      >
        {PortfolioData.experience.map((e, i) => (
          <motion.div key={i} className="timeline-item" variants={timelineItem}>
            <div className="timeline-dot-wrap">
              <div className="timeline-dot" />
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
              <p className="exp-tech">
                <i className="fas fa-microchip" /> {e.tech}
              </p>
              <ul className="exp-details">
                {e.details.map((d, j) => <li key={j}>{d}</li>)}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
