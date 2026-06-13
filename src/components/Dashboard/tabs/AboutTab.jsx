import { useState, useEffect, useRef } from 'react';
import { PortfolioData } from '../../../data/portfolioData.js';

// ── Typewriter ─────────────────────────────────────────────
const TITLES = [
  'Software Engineer @ TCS',
  'Java & Spring Boot Developer',
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
      } else {
        timer = setTimeout(() => setPhase('pausing'), pauseMs);
      }
    } else if (phase === 'pausing') {
      setPhase('deleting');
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => { setText(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, deletingSpeed);
      } else {
        setIdx(i => (i + 1) % strings.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timer);
  }, [phase, charIdx, idx, strings, typingSpeed, deletingSpeed, pauseMs]);

  return text;
}

// ── Count-up hook ──────────────────────────────────────────
function useCountUp(target, duration = 1100) {
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
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const current = ease * num;
      setValue(Number.isInteger(num) ? Math.floor(current) : Math.round(current * 10) / 10);
      if (t < 1) requestAnimationFrame(tick);
      else setValue(num);
    };
    requestAnimationFrame(tick);
  }, []); // eslint-disable-line

  const suffix = typeof target === 'string' ? target.replace(/[\d.]/g, '') : '';
  return `${value}${suffix}`;
}

// ── Contribution Heatmap ──────────────────────────────────
function pseudo(seed) {
  let s = seed;
  s = (s ^ (s << 13)) >>> 0;
  s = (s ^ (s >>> 17)) >>> 0;
  s = (s ^ (s << 5)) >>> 0;
  return s % 5;
}

function buildHeatmap() {
  const weeks = [];
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - 364);
  let cursor = new Date(start);
  for (let w = 0; w < 53; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const seed = cursor.getFullYear() * 10000 + (cursor.getMonth() + 1) * 100 + cursor.getDate();
      const recency = w / 53;
      const raw = pseudo(seed + w * 7 + d);
      const level = recency < 0.3 ? 0 : raw;
      week.push({ level, date: cursor.toDateString() });
      cursor = new Date(cursor);
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

const HEATMAP = buildHeatmap();

function ContribHeatmap() {
  return (
    <div className="heatmap-section">
      <div className="heatmap-title">
        <i className="fas fa-chart-simple" />
        Activity
      </div>
      <div className="heatmap-scroll">
        <div className="heatmap-grid">
          {HEATMAP.map((week, wi) => (
            <div key={wi} className="heatmap-week">
              {week.map((cell, di) => (
                <div key={di} className="heatmap-cell" data-level={cell.level} title={cell.date} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="heatmap-legend">
        Less
        <div className="heatmap-legend-cells">
          {[0,1,2,3,4].map(l => <div key={l} className="heatmap-cell" data-level={l} />)}
        </div>
        More
      </div>
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────
const RAW_STATS = [
  { raw: '1+',  label: 'Years at TCS'   },
  { raw: '4',   label: 'Projects built' },
  { raw: '10+', label: 'Tech skills'    },
  { raw: '8.3', label: 'B.Tech CGPA'   },
];

function StatCard({ raw, label }) {
  const display = useCountUp(raw);
  return (
    <div className="stat-card">
      <div className="stat-number">{display}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// ── Stack badges ──────────────────────────────────────────
const STACK = [
  { icon: 'fa-coffee',   label: 'Java'        },
  { icon: 'fa-leaf',     label: 'Spring Boot' },
  { icon: 'fa-python',   label: 'Python'      },
  { icon: 'fa-k',        label: 'Kotlin'      },
  { icon: 'fa-mobile',   label: 'Android'     },
  { icon: 'fa-database', label: 'PostgreSQL'  },
  { icon: 'fa-docker',   label: 'Docker'      },
  { icon: 'fa-git-alt',  label: 'Git'         },
];

const HIGHLIGHTS = [
  { icon: 'fa-building', title: 'TCS',           desc: 'AEM, Java, Spring — enterprise-scale web platform engineering.' },
  { icon: 'fa-rocket',   title: 'Projects',       desc: 'Full-stack web, ML pipelines, and cross-platform Android apps.' },
  { icon: 'fa-book',     title: 'CS Fundamentals',desc: 'Strong foundation in DSA, OS, DBMS, and system design.' },
  { icon: 'fa-globe',    title: 'Open Source',    desc: 'Actively exploring open-source contributions and side projects.' },
];

// ── Component ─────────────────────────────────────────────
export default function AboutTab() {
  const title = useTypewriter(TITLES);

  return (
    <div>
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-text">
          <div className="about-availability">
            <span className="about-avail-dot" />
            Available for opportunities
          </div>
          <h1 className="about-name">{PortfolioData.name}</h1>
          <p className="about-title">
            {title}<span className="typewriter-cursor" />
          </p>
          <p className="about-summary">
            Software Engineer at <strong>Tata Consultancy Services</strong> with hands-on
            experience building enterprise-grade web platforms using Java, Spring Boot, and Adobe
            Experience Manager. Passionate about clean architecture, mobile development with Kotlin,
            and continuously sharpening system design skills.
          </p>
          <div className="about-links">
            <a href="mailto:harshtiwari493@gmail.com" className="about-link about-link--primary">
              <i className="fas fa-envelope" /> Contact Me
            </a>
            <a href="https://github.com/harshtiwari29" target="_blank" rel="noopener noreferrer" className="about-link about-link--ghost">
              <i className="fa-brands fa-github" /> GitHub
            </a>
            <a href="https://linkedin.com/in/harshtiwari29" target="_blank" rel="noopener noreferrer" className="about-link about-link--ghost">
              <i className="fa-brands fa-linkedin" /> LinkedIn
            </a>
          </div>
        </div>
        <div className="about-avatar">
          <div className="about-avatar-ring">
            <div className="about-avatar-inner">HT</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="about-stats">
        {RAW_STATS.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Tech stack */}
      <div className="about-stack">
        <div className="about-stack-title">Core Stack</div>
        <div className="tech-badges">
          {STACK.map(({ icon, label }) => (
            <div key={label} className="tech-badge">
              <i className={`fas ${icon}`} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="about-highlights">
        {HIGHLIGHTS.map(h => (
          <div key={h.title} className="highlight-card">
            <div className="highlight-card-icon"><i className={`fas ${h.icon}`} /></div>
            <div className="highlight-card-title">{h.title}</div>
            <div className="highlight-card-desc">{h.desc}</div>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <ContribHeatmap />
    </div>
  );
}
