import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '../../../data/portfolioData.js';

// Outcome-focused rotating headlines — answers "what can he do for me?"
const HEADLINES = [
  'I build Java backends that scale.',
  'I ship Android apps to Play Store.',
  'I architect AEM content platforms.',
  'I turn specs into production code.',
];

function useTypewriter(strings, { typingSpeed = 65, deletingSpeed = 35, pauseMs = 1800 } = {}) {
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

function makeTiltHandlers(strength = 7) {
  return {
    onMouseMove(e) {
      const el = e.currentTarget;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = ((e.clientX - left) / width  - 0.5) * 2;
      const y = ((e.clientY - top)  / height - 0.5) * 2;
      el.style.setProperty('--tilt-x', `${(-y * strength).toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${( x * strength).toFixed(2)}deg`);
      el.style.setProperty('--tilt-z', '4px');
    },
    onMouseLeave(e) {
      e.currentTarget.style.setProperty('--tilt-x', '0deg');
      e.currentTarget.style.setProperty('--tilt-y', '0deg');
      e.currentTarget.style.setProperty('--tilt-z', '0px');
    },
  };
}
const tilt = makeTiltHandlers();

function BentoStat({ raw, label, icon, fadeUp }) {
  const display = useCountUp(raw);
  return (
    <motion.div className="bento-card bento-stat" variants={fadeUp}
      whileHover={{ y:-2, transition:{duration:0.15} }} {...tilt}>
      <i className={`fas ${icon} bento-stat-icon`} aria-hidden="true"/>
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

const STACK_GROUPS = [
  { category: 'Languages', desc: 'Strong foundation in Java, Kotlin, Python, and SQL.', items: ['Java', 'Kotlin', 'Python', 'SQL', 'JavaScript'] },
  { category: 'Backend & CMS', desc: 'Enterprise engineering in Spring Boot and AEM platforms.', items: ['Spring Boot', 'REST APIs', 'AEM', 'Docker', 'PostgreSQL'] },
  { category: 'Mobile & Frontend', desc: 'Native Android SDK and modern declarative layouts.', items: ['Android SDK', 'Jetpack Compose', 'HTML & CSS', 'Git'] }
];

// Services offered to freelance clients / collaborators
const SERVICES = [
  { icon: 'fa-server',      label: 'Java / Spring Boot backends',   desc: 'REST APIs, microservices, Spring Data JPA, PostgreSQL' },
  { icon: 'fa-mobile-screen', label: 'Android apps (Kotlin)',        desc: 'Jetpack Compose, Room, Firebase — prototype to Play Store' },
  { icon: 'fa-layer-group', label: 'AEM / CMS builds',              desc: 'Core components, OSGi services, content architecture' },
];

const stagger = { hidden:{}, visible:{ transition:{ staggerChildren:0.06, delayChildren:0.05 } } };
const fadeUp  = { hidden:{ opacity:0, y:16 }, visible:{ opacity:1, y:0, transition:{ duration:0.3, ease:[.25,.46,.45,.94] } } };

export default function AboutTab() {
  const headline = useTypewriter(HEADLINES);
  const c = PortfolioData.contact;

  // "Hire me" CTA navigates to the Contact tab
  const handleHire = useCallback(() => {
    window.dispatchEvent(new CustomEvent('portfolio:navigate', { detail: 'contact' }));
  }, []);

  return (
    <motion.div className="bento-grid" variants={stagger} initial="hidden" animate="visible">

      {/* ── Hero card ── */}
      <motion.div className="bento-card bento-hero" variants={fadeUp} {...tilt}>
        <div className="bento-hero-text">
          <h1 className="bento-name">Harsh Tiwari</h1>
          <p className="bento-title">{headline}<span className="typewriter-cursor" aria-hidden="true"/></p>
          <p className="bento-bio">
            Backend &amp; mobile engineer open to freelance contracts and side projects.
            I take features from spec to production — Java microservices, Kotlin/Compose apps,
            or AEM content platforms. Currently at&nbsp;<strong>TCS</strong>; available for
            contract work alongside.
          </p>
          {/* Dual CTA — routes recruiters and clients separately */}
          <div className="bento-links">
            <button className="about-link about-link--primary" onClick={handleHire}>
              Hire me for a project
            </button>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="about-link about-link--ghost">
              <i className="fas fa-file-lines" aria-hidden="true" /> View resume
            </a>
            <a href={c.githubUrl} target="_blank" rel="noopener noreferrer" className="about-link about-link--ghost">
              <i className="fa-brands fa-github" aria-hidden="true" /> GitHub
            </a>
          </div>
        </div>
        <div className="bento-avatar">
          <div className="about-avatar-ring">
            <div className="about-avatar-inner">HT</div>
          </div>
          <span className="bento-avail-dot-wrap">
            <span className="bento-avail-pulse" aria-hidden="true"/>
            <span className="bento-avail-text">Available for projects</span>
          </span>
        </div>
      </motion.div>

      {/* ── Clock card ── */}
      <motion.div className="bento-card bento-clock" variants={fadeUp} {...tilt}>
        <div className="bento-card-label"><i className="fas fa-location-dot" aria-hidden="true"/> Indore, India</div>
        <div className="bento-time"><ISTTime /></div>
        <div className="bento-tz">IST · UTC+5:30</div>
      </motion.div>

      {/* ── Status card ── */}
      <motion.div className="bento-card bento-status" variants={fadeUp} {...tilt}>
        <div className="bento-card-label">Current role</div>
        <div className="bento-status-role">
          <i className="fas fa-building" style={{color:'var(--accent)',marginRight:6}} aria-hidden="true"/>
          TCS
        </div>
        <div className="bento-status-sub">Java · AEM · Agile</div>
        <div className="bento-status-tag">Jan 2026 – Present</div>
      </motion.div>

      {/* ── Stats ── */}
      {STATS.map((s) => (
        <BentoStat key={s.label} {...s} fadeUp={fadeUp} />
      ))}

      {/* ── Services card — client-facing ── */}
      <motion.div className="bento-card bento-services" variants={fadeUp} {...tilt}>
        <div className="bento-card-label"><i className="fas fa-handshake" aria-hidden="true"/> What I take on</div>
        <ul className="bento-services-list">
          {SERVICES.map(s => (
            <li key={s.label} className="bento-service-item">
              <i className={`fas ${s.icon} bento-service-icon`} aria-hidden="true"/>
              <div>
                <span className="bento-service-label">{s.label}</span>
                <span className="bento-service-desc">{s.desc}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="bento-services-meta">
          <span><i className="fas fa-reply" aria-hidden="true"/> Replies within 24 h</span>
          <span><i className="fas fa-globe" aria-hidden="true"/> Remote-friendly · IST overlap</span>
          <span><i className="fas fa-file-contract" aria-hidden="true"/> Freelance contracts &amp; collabs</span>
        </div>
      </motion.div>

      {/* ── Core stack ── */}
      <motion.div className="bento-card bento-stack" variants={fadeUp} {...tilt}>
        <div className="bento-card-label"><i className="fas fa-layer-group" aria-hidden="true"/> Core Stack</div>
        <div className="bento-stack-groups">
          {STACK_GROUPS.map(g => (
            <div key={g.category} className="bento-stack-group">
              <span className="bento-stack-group-title">{g.category}</span>
              <p className="bento-stack-group-desc">{g.desc}</p>
              <div className="bento-stack-group-pills">
                {g.items.map(s => (
                  <span key={s} className="bento-stack-pill">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Currently building ── */}
      <motion.div className="bento-card bento-building" variants={fadeUp}>
        <div className="bento-card-label"><span className="bento-live-dot" aria-hidden="true"/>Now building</div>
        <div className="bento-building-name">AgentVerse</div>
        <div className="bento-building-sub">Multi-agent Indian metropolis sim · Python · FastAPI · LLM</div>
        <ul className="bento-building-specs">
          <li><i className="fas fa-users-viewfinder" /> 100 autonomous AI citizens</li>
          <li><i className="fas fa-brain" /> ChromaDB vector memories</li>
          <li><i className="fas fa-timeline" /> Event-Sourced timeline scrubber</li>
        </ul>
        <div className="bento-building-tech">
          {['Python', 'FastAPI', 'Ollama', 'ChromaDB'].map(t => (
            <span key={t} className="bento-building-tech-pill">{t}</span>
          ))}
        </div>
        <a href="https://agentverse.harshtiwari.dev" target="_blank" rel="noopener noreferrer" className="bento-building-btn">
          <span>Launch Simulation</span> <i className="fas fa-arrow-right" />
        </a>
      </motion.div>

      {/* ── GitHub card ── */}
      <motion.div className="bento-card bento-github" variants={fadeUp} {...tilt}>
        <div className="bento-card-label"><i className="fab fa-github" aria-hidden="true"/> GitHub</div>
        <div className="bento-github-content">
          <div className="bento-github-info">
            <div className="bento-github-handle">darkclover29</div>
            <div className="bento-github-sub">Side projects &amp; open source builds</div>
            <a href={c.githubUrl} target="_blank" rel="noopener noreferrer" className="bento-building-link">
              View profile →
            </a>
          </div>
          <div className="bento-github-stats">
            <div className="bento-git-stat">
              <span className="bento-git-stat-val">20+</span>
              <span className="bento-git-stat-lbl">Repos</span>
            </div>
            <div className="bento-git-stat">
              <span className="bento-git-stat-val">120+</span>
              <span className="bento-git-stat-lbl">Contr.</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Live projects quick-access ── */}
      <motion.div className="bento-card bento-open" variants={fadeUp}>
        <div className="bento-card-label"><i className="fas fa-rocket" aria-hidden="true"/> Live Projects</div>
        <div className="bento-live-projects">
          <a href="https://agentverse.harshtiwari.dev" target="_blank" rel="noopener noreferrer" className="bento-live-project-tile">
            <span className="bento-live-project-dot" style={{background:'#a78bfa'}} />
            <span className="bento-live-project-name">AgentVerse</span>
            <span className="bento-live-project-tag">Multi-Agent · LLM</span>
          </a>
          <a href="https://pocketdex.harshtiwari.dev" target="_blank" rel="noopener noreferrer" className="bento-live-project-tile">
            <span className="bento-live-project-dot" style={{background:'#f472b6'}} />
            <span className="bento-live-project-name">PocketDex</span>
            <span className="bento-live-project-tag">React · TypeScript</span>
          </a>
          <a href="https://chronoscapes.harshtiwari.dev" target="_blank" rel="noopener noreferrer" className="bento-live-project-tile">
            <span className="bento-live-project-dot" style={{background:'#38bdf8'}} />
            <span className="bento-live-project-name">Chronoscapes</span>
            <span className="bento-live-project-tag">Web Audio · Canvas</span>
          </a>
        </div>
      </motion.div>

    </motion.div>
  );
}
