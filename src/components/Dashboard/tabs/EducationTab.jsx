import { motion } from 'framer-motion';
import { PortfolioData } from '../../../data/portfolioData.js';

const EDU_ICONS = ['fa-graduation-cap', 'fa-school', 'fa-school'];

const listVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function EducationTab() {
  return (
    <div>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="section-icon"><i className="fas fa-graduation-cap" /></div>
        <h2 className="section-title">Education</h2>
      </motion.div>

      <motion.div
        className="edu-timeline"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {PortfolioData.education.map((e, i) => (
          <motion.div
            key={i}
            className="edu-card"
            variants={itemVariants}
            whileHover={{ x: 4, scale: 1.01, transition: { duration: 0.18 } }}
          >
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
