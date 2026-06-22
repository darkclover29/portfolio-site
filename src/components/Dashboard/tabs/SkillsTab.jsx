import { motion } from 'framer-motion';
import ScrambleText from '../../shared/ScrambleText.jsx';

const SKILLS = [
  {
    category: 'Languages',
    icon: 'fa-code',
    skills: [
      { name: 'Java',       level: 'Expert'      },
      { name: 'Kotlin',     level: 'Advanced'    },
      { name: 'Python',     level: 'Advanced'    },
      { name: 'SQL',        level: 'Advanced'    },
      { name: 'JavaScript', level: 'Proficient'  },
    ],
  },
  {
    category: 'Backend & CMS',
    icon: 'fa-server',
    skills: [
      { name: 'Spring Boot',    level: 'Expert'     },
      { name: 'REST APIs',      level: 'Expert'     },
      { name: 'AEM',            level: 'Advanced'   },
      { name: 'Hibernate/JPA',  level: 'Advanced'   },
      { name: 'Spring MVC',     level: 'Advanced'   },
    ],
  },
  {
    category: 'Mobile & Frontend',
    icon: 'fa-mobile-screen',
    skills: [
      { name: 'Jetpack Compose', level: 'Advanced'   },
      { name: 'Android SDK',     level: 'Advanced'   },
      { name: 'Kotlin Coroutines', level: 'Advanced' },
      { name: 'HTML & CSS',      level: 'Proficient' },
      { name: 'React',           level: 'Proficient' },
    ],
  },
  {
    category: 'Databases',
    icon: 'fa-database',
    skills: [
      { name: 'PostgreSQL',   level: 'Advanced'   },
      { name: 'MySQL',        level: 'Advanced'   },
      { name: 'Room DB',      level: 'Advanced'   },
      { name: 'Firebase',     level: 'Proficient' },
      { name: 'H2',           level: 'Proficient' },
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: 'fa-wrench',
    skills: [
      { name: 'Git / GitHub',  level: 'Expert'     },
      { name: 'Docker',        level: 'Proficient' },
      { name: 'Postman',       level: 'Advanced'   },
      { name: 'Android Studio',level: 'Advanced'   },
      { name: 'Maven',         level: 'Proficient' },
    ],
  },
  {
    category: 'CS Fundamentals',
    icon: 'fa-microchip',
    skills: [
      { name: 'DSA',              level: 'Advanced'   },
      { name: 'OOP',              level: 'Expert'     },
      { name: 'DBMS',             level: 'Advanced'   },
      { name: 'OS',               level: 'Proficient' },
      { name: 'Compiler Design',  level: 'Advanced'   },
    ],
  },
];

const LEVEL_CONFIG = {
  Expert:     { dot: '#4ade80', label: 'Expert',     rank: 3 },
  Advanced:   { dot: 'var(--accent)', label: 'Advanced', rank: 2 },
  Proficient: { dot: 'var(--text-muted)', label: 'Proficient', rank: 1 },
};

const stagger = { hidden:{}, visible:{ transition:{ staggerChildren:0.07 } } };
const fadeUp  = { hidden:{ opacity:0, y:14 }, visible:{ opacity:1, y:0, transition:{ duration:0.28, ease:[.25,.46,.45,.94] } } };
const tagStagger = { hidden:{}, visible:{ transition:{ staggerChildren:0.04 } } };
const tagFade = { hidden:{ opacity:0, scale:0.8 }, visible:{ opacity:1, scale:1, transition:{ duration:0.2 } } };


// ── Drag-to-scroll hook (mouse drag + momentum) ──────────────
function useDragScroll() {
  const ref      = useRef(null);
  const drag     = useRef({ active: false, startX: 0, scrollX: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onDown = (e) => {
      drag.current = { active: true, startX: e.pageX - el.offsetLeft, scrollX: el.scrollLeft };
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
    };
    const onUp = () => {
      drag.current.active = false;
      el.style.cursor = '';
      el.style.userSelect = '';
    };
    const onMove = (e) => {
      if (!drag.current.active) return;
      e.preventDefault();
      const x    = e.pageX - el.offsetLeft;
      const walk = (x - drag.current.startX) * 1.4;
      el.scrollLeft = drag.current.scrollX - walk;
    };

    el.addEventListener('mousedown',  onDown);
    el.addEventListener('mouseup',    onUp);
    el.addEventListener('mouseleave', onUp);
    el.addEventListener('mousemove',  onMove);
    return () => {
      el.removeEventListener('mousedown',  onDown);
      el.removeEventListener('mouseup',    onUp);
      el.removeEventListener('mouseleave', onUp);
      el.removeEventListener('mousemove',  onMove);
    };
  }, []);

  return ref;
}

export default function SkillsTab() {
  const gridRef = useDragScroll();
  return (
    <div>
      <motion.div className="section-header" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{duration:0.3}}>
        <div className="section-icon"><i className="fas fa-code"/></div>
        <h2 className="section-title">Technical Skills</h2>
        <span className="section-badge">{SKILLS.reduce((a,c)=>a+c.skills.length,0)} skills</span>
      </motion.div>

      {/* Legend */}
      <motion.div className="skills-legend" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.15}}>
        {Object.values(LEVEL_CONFIG).reverse().map(cfg => (
          <span key={cfg.label} className="skills-legend-item">
            <span className="skills-legend-dot" style={{background:cfg.dot}}/>
            {cfg.label}
          </span>
        ))}
      </motion.div>

      <motion.div className="skills-pill-grid" ref={gridRef} variants={stagger} initial="hidden" animate="visible">
        {SKILLS.map(cat => (
          <motion.div key={cat.category} className="skills-pill-card" variants={fadeUp}
            whileHover={{ y:-2, transition:{duration:0.15} }}>
            <div className="skills-pill-cat-header">
              <i className={`fas ${cat.icon}`}/>
              <span>{cat.category}</span>
            </div>
            <motion.div className="skills-pill-list" variants={tagStagger} initial="hidden" animate="visible">
              {cat.skills.map(s => {
                const cfg = LEVEL_CONFIG[s.level];
                return (
                  <motion.div key={s.name} className="skills-pill" variants={tagFade}
                    whileHover={{ x:-1, y:-1, transition:{duration:0.1} }}>
                    <span className="skills-pill-dot" style={{background:cfg.dot}}/>
                    <ScrambleText text={s.name} className="skills-pill-name"/>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
