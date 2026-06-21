import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '../../../data/portfolioData.js';
import ScrambleText from '../../shared/ScrambleText.jsx';
import MagneticButton from '../../shared/MagneticButton.jsx';

const TITLES = [
  'Assistant Systems Engineer @ TCS',
  'Java & AEM Developer',
  'Android App Builder',
  'AEM / CMS Specialist',
  'Open Source Enthusiast',
];

function useTypewriter(strings, { typingSpeed = 70, deletingSpeed = 40, pauseMs = 1600 } = {}) {
  const [text, setText]       = useState('');
  const [phase, setPhase]     = useState('typing');
  const [idx, setIdx]         = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  useEffect(() => {
    const current = strings[idx % strings.length];
    let timer;
    if (phase === 'typing') {
      if (charIdx < current.length) {
        timer = setTimeout(() => { setText(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, typingSpeed);
      } else { timer = setTimeout(() => setPhase('pausing'), pauseMs); }
    } else if (phase === 'pausing') { setPhase('deleting'); }
    else {
      if (charIdx > 0) {
        timer = setTimeout(() => { setText(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, deletingSpeed);
      } else { setIdx(i => (i + 1) % strings.length); setPhase('typing'); }
    }
    return () => clearTimeout(timer);
  }, [phase, charIdx, idx, strings, typingSpeed, deletingSpeed, pauseMs]);
  return text;
}

function useCountUp(target, duration = 1000) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const num = parseFloat(target);
    if (isNaN(num)) return;
    const startTime = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const ease = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
      setValue(Number.isInteger(num) ? Math.floor(ease*num) : Math.round(ease*num*10)/10);
      if (t < 1) requestAnimationFrame(tick); else setValue(num);
    };
    requestAnimationFrame(tick);
  }, []); // eslint-disable-line
  const suffix = typeof target === 'string' ? target.replace(/[\d.]/g,'') : '';
  return `${value}${suffix}`;
}

function ISTTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-IN',{
      timeZone:'Asia/Kolkata', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false
    }));
    tick();
    const id = setInterval(tick,1000);
    return () => clearInterval(id);
  },[]);
  return <>{time} IST</>;
}

// ── Extracted component so useCountUp is called at top level (no hooks-in-loop) ──
function BentoStat({ raw, label, icon, variants, fadeUp }) {
  const display = useCountUp(raw);
  return (
    <motion.div className="bento-card bento-stat" variants={fadeUp}
      whileHover={{ y:-2, transition:{duration:0.15} }}>
      <i className={`fas ${icon} bento-stat-icon`}/>
      <div className="bento-stat-num">{display}</div>
      <div className="bento-stat-label">{label}</div>
    </motion.div>
  );
}

const STATS = [
  { raw: '9',   label: 'Projects', icon: 'fa-folder'   },
  { raw: '10+', label: 'Skills',   icon: 'fa-code'     },
  { raw: '8.3', label: 'CGPA',     icon: 'fa-star'     },
  { raw: '2+',  label: 'Yrs exp',  icon: 'fa-clock'    },
];

const STACK = [
  'Java','Spring Boot','AEM','Kotlin','Android',
  'Python','PostgreSQL','Docker','Git','REST APIs',
];

const stagger = { hidden:{}, visible:{ transition:{ staggerChildren:0.06, delayChildren:0.05 } } };
const fadeUp  = { hidden:{ opacity:0, y:16 }, visible:{ opacity:1, y:0, transition:{ duration:0.3, ease:[.25,.46,.45,.94] } } };

export default function AboutTab() {
  const title = useTypewriter(TITLES);

  return (
    <motion.div className="bento-grid" variants={stagger} initial="hidden" animate="visible">

      {/* ── Hero card — spans full width on desktop ── */}
      <motion.div className="bento-card bento-hero" variants={fadeUp}>
        <div className="bento-hero-text">
          <h1 className="bento-name">
            <ScrambleText text="Harsh Tiwari" />
          </h1>
          <p className="bento-title">{title}<span className="typewriter-cursor"/></p>
          <p className="bento-bio">
            Assistant Systems Engineer at <strong>TCS</strong> building enterprise web platforms
            with Java &amp; AEM. Passionate about compilers, Android, and clean system design.
          </p>
          <div className="bento-links">
            <MagneticButton tag="a" href="mailto:harshtiwari493@gmail.com" className="about-link about-link--primary">
              <ScrambleText text="Contact Me" />
            </MagneticButton>
            <MagneticButton tag="a" href="https://github.com/harshtiwari29" target="_blank" rel="noopener noreferrer" className="about-link about-link--ghost">
              <i className="fa-brands fa-github" /> GitHub
            </MagneticButton>
            <MagneticButton tag="a" href="https://linkedin.com/in/harshtiwari29" target="_blank" rel="noopener noreferrer" className="about-link about-link--ghost">
              <i className="fa-brands fa-linkedin" /> LinkedIn
            </MagneticButton>
          </div>
        </div>
        <div className="bento-avatar">
          <div className="about-avatar-ring">
            <div className="about-avatar-inner">HT</div>
          </div>
          <span className="bento-avail-dot-wrap">
            <span className="bento-avail-pulse"/>
            <span className="bento-avail-text">Available</span>
          </span>
        </div>
      </motion.div>

      {/* ── Clock card ── */}
      <motion.div className="bento-card bento-clock" variants={fadeUp}>
        <div className="bento-card-label"><i className="fas fa-location-dot"/> Indore, India</div>
        <div className="bento-time"><ISTTime /></div>
        <div className="bento-tz">Asia / Kolkata · IST</div>
      </motion.div>

      {/* ── Status card ── */}
      <motion.div className="bento-card bento-status" variants={fadeUp}>
        <div className="bento-card-label">Current role</div>
        <div className="bento-status-role">
          <i className="fas fa-building" style={{color:'var(--accent)',marginRight:6}}/>
          TCS
        </div>
        <div className="bento-status-sub">Java · AEM · Agile</div>
        <div className="bento-status-tag">Jan 2026 – Present</div>
      </motion.div>

      {/* ── Stats row — 4 small cards (hooks-safe via BentoStat component) ── */}
      {STATS.map((s) => (
        <BentoStat key={s.label} {...s} fadeUp={fadeUp} />
      ))}

      {/* ── Tech stack card ── */}
      <motion.div className="bento-card bento-stack" variants={fadeUp}>
        <div className="bento-card-label"><i className="fas fa-layer-group"/> Core Stack</div>
        <div className="bento-stack-pills">
          {STACK.map(s => (
            <span key={s} className="bento-stack-pill">
              <ScrambleText text={s}/>
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Currently building card ── */}
      <motion.div className="bento-card bento-building" variants={fadeUp}>
        <div className="bento-card-label"><span className="bento-live-dot"/>Now building</div>
        <div className="bento-building-name">Chronoscapes</div>
        <div className="bento-building-sub">Audio-visual ambient workspace · Vanilla JS + Web Audio API</div>
        <a href="https://chronoscapes.harshtiwari.dev" target="_blank" rel="noopener noreferrer" className="bento-building-link">
          <ScrambleText text="Visit →"/>
        </a>
      </motion.div>

      {/* ── Open source card ── */}
      <motion.div className="bento-card bento-open" variants={fadeUp}>
        <div className="bento-card-label"><i className="fab fa-github"/> Open Source</div>
        <div className="bento-open-text">
          Exploring contributions &amp; building side projects in public.
        </div>
        <a href="https://github.com/harshtiwari29" target="_blank" rel="noopener noreferrer" className="bento-building-link">
          <ScrambleText text="darkclover29 →"/>
        </a>
      </motion.div>

    </motion.div>
  );
}
