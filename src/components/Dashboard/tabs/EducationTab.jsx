import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PortfolioData } from '../../../data/portfolioData.js';

const EDU_ICONS   = ['fa-graduation-cap', 'fa-school', 'fa-school'];
const EDU_COURSES = [
  ['Data Structures & Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks', 'Compiler Design', 'Software Engineering'],
  ['Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'English'],
  ['Mathematics', 'Science', 'Social Studies', 'English', 'Hindi'],
];

function EduCard({ e, i }) {
  const [flipped, setFlipped] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    // Outer wrapper: only framer-motion fade-in — no scale/transform that fights 3D
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.35, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Flip container — pure CSS, no framer-motion interference */}
      <div
        className={`edu-flip-wrap${flipped ? ' is-flipped' : ''}`}
        onClick={() => setFlipped(f => !f)}
        title={flipped ? 'Click to flip back' : 'Click to see subjects'}
      >
        <div className="edu-flip-inner">
          {/* Front face */}
          <div className="edu-card edu-flip-face edu-flip-front">
            <div className="edu-icon">
              <i className={`fas ${EDU_ICONS[i] || 'fa-graduation-cap'}`} />
            </div>
            <div className="edu-card-body">
              <h3 className="edu-level">{e.level}</h3>
              <p className="edu-institute">{e.institute}</p>
              <span className="edu-grade">
                <i className="fas fa-star" /> {e.grade}
              </span>
            </div>
            <span className="edu-flip-hint">
              <i className="fas fa-rotate" /> click to flip
            </span>
          </div>

          {/* Back face */}
          <div className="edu-card edu-flip-face edu-flip-back">
            <p className="edu-back-label">Subjects</p>
            <ul className="edu-course-list">
              {(EDU_COURSES[i] || []).map(c => (
                <li key={c}><i className="fas fa-check-circle" /> {c}</li>
              ))}
            </ul>
            <span className="edu-flip-hint">
              <i className="fas fa-rotate" /> click to flip back
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

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

      <div className="edu-timeline">
        {PortfolioData.education.map((e, i) => (
          <EduCard key={i} e={e} i={i} />
        ))}
      </div>
    </div>
  );
}
