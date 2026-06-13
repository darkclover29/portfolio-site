import { useState, useCallback, useRef } from 'react';
import { PortfolioData, ASCII_ART } from '../data/portfolioData.js';

const PAGE_LOAD_TIME = Date.now();

const BOOT_LINES = [
  { type: 'system', text: 'PORTFOLIO OS v2.0 — Booting...' },
  { type: 'system', text: 'Loading VFS subsystem... [OK]' },
  { type: 'system', text: 'Initializing audio engine... [OK]' },
  { type: 'system', text: 'Starting matrix rain... [OK]' },
  { type: 'ascii',  text: ASCII_ART },
  { type: 'info',   text: 'Welcome to Harsh Tiwari\'s Portfolio Terminal v2.0' },
  { type: 'info',   text: 'Type <span class="accent">help</span> to see available commands.' },
  { type: 'system', text: '─'.repeat(60) },
];

const ALL_COMMANDS = [
  'help', 'clear', 'whoami', 'date', 'uptime', 'resume', 'skills',
  'experience', 'projects', 'education', 'contact', 'ls', 'cd', 'cat',
  'touch', 'rm', 'nano', 'grep', 'pwd', 'theme', 'gui', 'matrix',
  'snake', 'synth', 'chat', 'socials', 'download',
];

function makeId() {
  return Math.random().toString(36).slice(2);
}

function line(type, html, raw) {
  return { id: makeId(), type, html: html ?? raw ?? '', raw: raw ?? html ?? '' };
}

const CHATBOT_KEYWORDS = {
  skills:      () => `My primary skills include Java, Python, Spring Boot, Kotlin, Android (Jetpack Compose), and AEM.\nType <span class="accent">skills</span> for a detailed breakdown.`,
  experience:  () => `I'm currently a Software Engineer at TCS (Jan 2026–Present), where I work on AEM & Java backends.\nPreviously I interned at Ignitive Software Labs, building Android apps in Kotlin & Compose.\nType <span class="accent">experience</span> for full details.`,
  projects:    () => `I've built: (1) Versatile Appointment Scheduling System (Spring Boot/Docker), (2) Student Performance ML, (3) StudyHub Android App, (4) PlayLog Session Tracker.\nType <span class="accent">projects</span> for details.`,
  education:   () => `B.Tech IT (2021-2025) at SVVV Indore — CGPA 8.33/10. Type <span class="accent">education</span> for full details.`,
  contact:     () => `Email: ${PortfolioData.contact.email}\nLinkedIn: ${PortfolioData.contact.linkedin}\nGitHub: ${PortfolioData.contact.github}`,
  java:        () => `Java is my strongest language. I use it extensively with Spring Boot, Hibernate/JPA, and REST API development at TCS.`,
  kotlin:      () => `I use Kotlin for Android development with Jetpack Compose — built 2 complete apps during my internship and personal projects.`,
  spring:      () => `Spring Boot is my primary backend framework — REST APIs, Spring Security, Spring Data JPA, and MVC. Currently using it at TCS.`,
  android:     () => `I've built 2 Android apps: StudyHub and PlayLog. I use Kotlin, Jetpack Compose, Room DB, and WorkManager.`,
  aem:         () => `Adobe Experience Manager (AEM) is my current technology stack at TCS — creating core components, OSGi services, and Sling models.`,
  tcs:         () => `I joined Tata Consultancy Services as a Software Engineer in January 2026, working on AEM-based enterprise web projects using Java and Spring.`,
  location:    () => `I'm based in Indore/Dewas, Madhya Pradesh, India.`,
  resume:      () => `Type <span class="accent">resume</span> to view my full resume inline, or <span class="accent">download</span> to get it.`,
  hello:       () => `Hello! I'm Harsh Tiwari's AI assistant. Ask me about skills, projects, experience, or just explore the terminal!`,
  hi:          () => `Hey there! Type <span class="accent">help</span> for commands, or just ask me anything about Harsh.`,
};

function chatBot(query) {
  const q = query.toLowerCase();
  for (const [key, fn] of Object.entries(CHATBOT_KEYWORDS)) {
    if (q.includes(key)) return fn();
  }
  return `I didn't fully understand that. Try asking about: skills, projects, experience, education, or contact. Or type <span class="accent">help</span> for commands.`;
}

export function useTerminal({ vfs, playKeypress, playEnter, playError }) {
  const [lines, setLines]       = useState(BOOT_LINES.map(l => ({ id: makeId(), ...l })));
  const [history, setHistory]   = useState([]);
  const [histIdx, setHistIdx]   = useState(-1);
  const [nanoOpen, setNanoOpen] = useState(false);
  const [nanoFile, setNanoFile] = useState({ name: '', node: null });
  const [secLocked, setSecLocked] = useState(true);

  const push = useCallback((...newLines) => {
    setLines(prev => [...prev, ...newLines]);
  }, []);

  const buildResumeHtml = useCallback(() => {
    const d = PortfolioData;
    return [
      `<b>HARSH TIWARI — SOFTWARE ENGINEER</b>`,
      `${d.contact.email} | ${d.contact.phone} | ${d.contact.linkedin}`,
      ``,
      `<b>SUMMARY</b>`,
      d.summary,
      ``,
      `<b>EXPERIENCE</b>`,
      ...d.experience.flatMap(e => [
        `<span class="accent">${e.role}</span> @ ${e.company} [${e.duration}]`,
        `Tech: ${e.tech}`,
        ...e.details.map(x => `  • ${x}`),
        ``,
      ]),
      `<b>PROJECTS</b>`,
      ...d.projects.flatMap(p => [
        `<span class="accent">${p.name}</span>`,
        `Tech: ${p.tech}`,
        `  ${p.overview}`,
        ``,
      ]),
      `<b>EDUCATION</b>`,
      ...d.education.map(e => `  • ${e.level} | ${e.institute} | ${e.grade}`),
      ``,
      `<b>SKILLS</b>`,
      `Languages: ${d.skills.languages.join(', ')}`,
      `Backend: ${d.skills.backend.join(', ')}`,
      `Mobile/FE: ${d.skills.frontendMobile.join(', ')}`,
      `Databases: ${d.skills.databases.join(', ')}`,
      `Tools: ${d.skills.tools.join(', ')}`,
    ].join('\n');
  }, []);

  const execute = useCallback((raw, vfsHooks) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setHistory(prev => [trimmed, ...prev.slice(0, 99)]);
    setHistIdx(-1);
    push(line('prompt', `<span class="prompt-user">harsh@portfolio</span>:<span class="prompt-dir">${vfs.pwd}</span>$ ${trimmed}`));

    const [cmd, ...args] = trimmed.split(/\s+/);
    const arg = args.join(' ');
    const lc  = cmd.toLowerCase();

    switch (lc) {
      case 'help':
        push(line('output', [
          `<b>Available Commands:</b>`,
          `  <span class="accent">help</span>          — Show this menu`,
          `  <span class="accent">clear</span>         — Clear terminal`,
          `  <span class="accent">whoami</span>        — About me`,
          `  <span class="accent">skills</span>        — Technical skills`,
          `  <span class="accent">experience</span>    — Work history`,
          `  <span class="accent">projects</span>      — My projects`,
          `  <span class="accent">education</span>     — Academic background`,
          `  <span class="accent">contact</span>       — Contact info`,
          `  <span class="accent">resume</span>        — View full resume`,
          `  <span class="accent">date</span>          — Current date/time`,
          `  <span class="accent">uptime</span>        — Session uptime`,
          `  <span class="accent">ls [path]</span>     — List files`,
          `  <span class="accent">cd [path]</span>     — Change directory`,
          `  <span class="accent">cat [file]</span>    — Read file`,
          `  <span class="accent">touch [file]</span>  — Create file`,
          `  <span class="accent">rm [file]</span>     — Delete file`,
          `  <span class="accent">nano [file]</span>   — Edit file`,
          `  <span class="accent">grep k file</span>   — Search in file`,
          `  <span class="accent">pwd</span>           — Print working dir`,
          `  <span class="accent">theme [name]</span>  — Change theme`,
          `  <span class="accent">gui</span>           — Open dashboard`,
          `  <span class="accent">matrix</span>        — Toggle matrix rain`,
          `  <span class="accent">snake</span>         — Play snake`,
          `  <span class="accent">synth</span>         — Open synthesizer`,
          `  <span class="accent">chat [msg]</span>    — AI assistant`,
          `  <span class="accent">socials</span>       — Social links`,
        ].join('\n')));
        playEnter?.();
        break;

      case 'clear':
        setLines([]);
        break;

      case 'whoami':
        push(line('output', PortfolioData.summary));
        playEnter?.();
        break;

      case 'date':
        push(line('output', new Date().toString()));
        playEnter?.();
        break;

      case 'uptime': {
        const ms = Date.now() - PAGE_LOAD_TIME;
        const s  = Math.floor(ms / 1000) % 60;
        const m  = Math.floor(ms / 60000) % 60;
        const h  = Math.floor(ms / 3600000);
        push(line('output', `Session uptime: ${h}h ${m}m ${s}s`));
        playEnter?.();
        break;
      }

      case 'resume':
        push(line('output', buildResumeHtml()));
        playEnter?.();
        break;

      case 'download':
        push(line('output', 'Resume download — use the Download Resume button in the Dashboard sidebar.'));
        playEnter?.();
        break;

      case 'skills': {
        const s = PortfolioData.skills;
        push(line('output', [
          `<b>Technical Skills:</b>`,
          `  Languages:     ${s.languages.join(', ')}`,
          `  Backend:       ${s.backend.join(', ')}`,
          `  Mobile/FE:     ${s.frontendMobile.join(', ')}`,
          `  Databases:     ${s.databases.join(', ')}`,
          `  Tools:         ${s.tools.join(', ')}`,
          `  Concepts:      ${s.concepts.join(', ')}`,
        ].join('\n')));
        playEnter?.();
        break;
      }

      case 'experience':
        push(line('output', PortfolioData.experience.map(e => [
          `<span class="accent">${e.role}</span> @ ${e.company}`,
          `  Duration: ${e.duration}`,
          `  Tech: ${e.tech}`,
          e.details.map(d => `    • ${d}`).join('\n'),
        ].join('\n')).join('\n\n')));
        playEnter?.();
        break;

      case 'projects':
        push(line('output', PortfolioData.projects.map(p => [
          `<span class="accent">${p.name}</span>`,
          `  Tech: ${p.tech}`,
          `  ${p.overview}`,
        ].join('\n')).join('\n\n')));
        playEnter?.();
        break;

      case 'education':
        push(line('output', PortfolioData.education.map(e =>
          `• ${e.level}\n  ${e.institute}\n  ${e.grade}`
        ).join('\n\n')));
        playEnter?.();
        break;

      case 'contact': {
        const c = PortfolioData.contact;
        push(line('output', [
          `Email:    ${c.email}`,
          `Phone:    ${c.phone}`,
          `LinkedIn: ${c.linkedin}`,
          `GitHub:   ${c.github}`,
          `Location: ${c.location}`,
        ].join('\n')));
        playEnter?.();
        break;
      }

      case 'socials': {
        const c = PortfolioData.contact;
        push(line('output', [
          `<a href="${c.linkedinUrl}" target="_blank" rel="noopener noreferrer" class="accent">LinkedIn → ${c.linkedin}</a>`,
          `<a href="${c.githubUrl}"   target="_blank" rel="noopener noreferrer" class="accent">GitHub   → ${c.github}</a>`,
          `<a href="mailto:${c.email}" class="accent">Email    → ${c.email}</a>`,
        ].join('\n')));
        playEnter?.();
        break;
      }

      case 'pwd':
        push(line('output', vfs.pwd));
        playEnter?.();
        break;

      case 'ls': {
        const res = vfsHooks.cmdLs(arg || '');
        if (res.error) { push(line('error', res.error)); playError?.(); }
        else if (res.text) push(line('output', res.text));
        else {
          const html = res.entries.map(e =>
            e.isDir
              ? `<span class="accent">${e.name}/</span>`
              : e.name
          ).join('  ');
          push(line('output', html));
          playEnter?.();
        }
        break;
      }

      case 'cd': {
        const res = vfsHooks.cmdCd(arg);
        if (res.error) { push(line('error', res.error)); playError?.(); }
        else playEnter?.();
        break;
      }

      case 'cat': {
        const res = vfsHooks.cmdCat(arg);
        if (res.error) { push(line('error', res.error)); playError?.(); }
        else push(line('output', res.text));
        playEnter?.();
        break;
      }

      case 'touch': {
        const res = vfsHooks.cmdTouch(arg);
        if (res.error) { push(line('error', res.error)); playError?.(); }
        else { push(line('output', res.text)); playEnter?.(); }
        break;
      }

      case 'rm': {
        const res = vfsHooks.cmdRm(arg);
        if (res.error) { push(line('error', res.error)); playError?.(); }
        else { push(line('output', res.text)); playEnter?.(); }
        break;
      }

      case 'nano': {
        const res = vfsHooks.openNano(arg);
        if (res.error) { push(line('error', res.error)); playError?.(); }
        else { setNanoFile({ name: res.fileName, node: res.fileNode }); setNanoOpen(true); playEnter?.(); }
        break;
      }

      case 'grep': {
        if (args.length < 2) { push(line('error', 'grep: Usage: grep <keyword> <filepath>')); playError?.(); break; }
        const res = vfsHooks.cmdGrep(args[0], args[1]);
        if (res.error) { push(line('error', res.error)); playError?.(); }
        else if (!res.matches.length) push(line('output', `No matches found for "${res.keyword}"`));
        else {
          push(line('output', res.matches.map(m =>
            `<span class="accent">L${m.i}:</span> ${m.line.replace(new RegExp(res.keyword, 'gi'), x => `<mark>${x}</mark>`)}`
          ).join('\n')));
          playEnter?.();
        }
        break;
      }

      case 'theme':
        if (vfsHooks.setTheme) {
          vfsHooks.setTheme(arg);
          push(line('output', `Theme set to: ${arg}`));
          playEnter?.();
        }
        break;

      case 'gui':
        if (vfsHooks.flipToGui) vfsHooks.flipToGui();
        push(line('output', 'Switching to GUI dashboard...'));
        playEnter?.();
        break;

      case 'matrix':
        if (vfsHooks.toggleMatrix) vfsHooks.toggleMatrix();
        push(line('output', 'Matrix rain toggled.'));
        playEnter?.();
        break;

      case 'snake':
        if (vfsHooks.openGame) vfsHooks.openGame('snake');
        push(line('output', 'Launching snake game...'));
        playEnter?.();
        break;

      case 'synth':
        if (vfsHooks.openGame) vfsHooks.openGame('synth');
        push(line('output', 'Launching synthesizer...'));
        playEnter?.();
        break;

      case 'chat':
        if (!arg) { push(line('output', 'Usage: chat <your question>')); break; }
        push(line('output', `<span class="accent">AI&gt;</span> ${chatBot(arg)}`));
        playEnter?.();
        break;

      case 'unlock':
        if (arg === 'secrets') {
          setSecLocked(false);
          push(line('output', '<span class="accent">Access granted. /secrets unlocked.</span>'));
          playEnter?.();
        } else {
          push(line('error', 'Unknown unlock target.'));
          playError?.();
        }
        break;

      default:
        push(line('error', `Command not found: ${cmd}. Type <span class="accent">help</span> for available commands.`));
        playError?.();
    }
  }, [vfs.pwd, push, buildResumeHtml, playEnter, playError]);

  const closeNano = useCallback(() => { setNanoOpen(false); setNanoFile({ name: '', node: null }); }, []);

  return {
    lines, history, histIdx, setHistIdx,
    execute, push,
    nanoOpen, nanoFile, closeNano,
    secLocked,
    ALL_COMMANDS,
  };
}
