import { useState, useCallback, useRef } from 'react';
import { PortfolioData, ASCII_ART } from '../data/portfolioData.js';

const PAGE_LOAD_TIME = Date.now();

const BOOT_LINES = [
  { type: 'system', text: 'PORTFOLIO OS v2.0 -- Booting...' },
  { type: 'system', text: 'Loading VFS subsystem... [OK]' },
  { type: 'system', text: 'Initializing audio engine... [OK]' },
  { type: 'system', text: 'Starting matrix rain... [OK]' },
  { type: 'ascii',  text: ASCII_ART },
  { type: 'info',   text: 'Welcome to Harsh Tiwari\'s Portfolio Terminal v2.0' },
  { type: 'info',   text: 'Type <span class="accent">help</span> to see available commands.' },
  { type: 'system', text: '------------------------------------------------------------' },
];

const ALL_COMMANDS = [
  'help', 'clear', 'whoami', 'date', 'uptime', 'resume', 'skills',
  'experience', 'projects', 'education', 'contact', 'ls', 'cd', 'cat',
  'touch', 'rm', 'nano', 'grep', 'pwd', 'theme', 'gui', 'matrix',
  'snake', 'synth', 'chat', 'socials', 'download',
  'darkclover', 'clover', 'ign', 'hack', 'ping', 'sudo', 'anti-magic',
  'hire', 'weather', 'cowsay', 'neofetch', 'open',
];

function makeId() {
  return Math.random().toString(36).slice(2);
}

function line(type, html, raw) {
  return { id: makeId(), type, html: html ?? raw ?? '', raw: raw ?? html ?? '' };
}

const CHATBOT_KEYWORDS = {
  skills:     () => `My primary skills include Java, Python, Spring Boot, Kotlin, Android (Jetpack Compose), and AEM.\nType <span class="accent">skills</span> for a detailed breakdown.`,
  experience: () => `I'm currently an Assistant Systems Engineer at TCS (Jan 2026-Present), working on AEM & Java backends.\nPreviously interned at Ignitive Software Labs building Android apps in Kotlin & Compose.\nType <span class="accent">experience</span> for full details.`,
  projects:   () => `I've built: (1) Mini Compiler & Web IDE (2) Appointment Scheduling System (3) StudyHub Android App (4) PlayLog Session Tracker.\nType <span class="accent">projects</span> for details.`,
  education:  () => `B.Tech IT (2021-2025) at SVVV Indore - CGPA 8.33/10. Type <span class="accent">education</span> for full details.`,
  contact:    () => `Email: ${PortfolioData.contact.email}\nLinkedIn: ${PortfolioData.contact.linkedin}\nGitHub: ${PortfolioData.contact.github}`,
  java:       () => `Java is my strongest language. I use it at TCS with AEM, OSGi services, and Sling models.`,
  kotlin:     () => `I use Kotlin for Android development with Jetpack Compose -- built 2 complete apps.`,
  spring:     () => `Spring Boot -- REST APIs, Spring Security, Spring Data JPA, and MVC.`,
  android:    () => `I've built 2 Android apps: StudyHub and PlayLog. Kotlin, Jetpack Compose, Room DB.`,
  aem:        () => `Adobe Experience Manager (AEM) -- my current stack at TCS. Core components, OSGi services, Sling models.`,
  tcs:        () => `I joined TCS as an Assistant Systems Engineer in January 2026, working on AEM-based enterprise web projects.`,
  location:   () => `Based in Indore/Dewas, Madhya Pradesh, India.`,
  resume:     () => `Type <span class="accent">resume</span> to view my full resume inline.`,
  hello:      () => `Hello! I'm Harsh Tiwari's terminal assistant. Ask me about skills, projects, or experience!`,
  hi:         () => `Hey! Type <span class="accent">help</span> for commands, or ask me anything about Harsh.`,
};

function chatBot(query) {
  const q = query.toLowerCase();
  for (const [key, fn] of Object.entries(CHATBOT_KEYWORDS)) {
    if (q.includes(key)) return fn();
  }
  return `I didn't understand that. Try asking about: skills, projects, experience, education, or contact. Or type <span class="accent">help</span>.`;
}

// cowsay helper
function buildCowsay(msg) {
  const maxW = 38;
  const words = msg.split(' ');
  const wrapped = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? cur + ' ' + w : w;
    if (next.length > maxW) { wrapped.push(cur); cur = w; }
    else cur = next;
  }
  if (cur) wrapped.push(cur);
  const width = Math.max(...wrapped.map(l => l.length));
  const top = ' ' + '_'.repeat(width + 2);
  const bot = ' ' + '-'.repeat(width + 2);
  const msgLines = wrapped.length === 1
    ? [`< ${wrapped[0].padEnd(width)} >`]
    : wrapped.map((l, i) => {
        const p = l.padEnd(width);
        if (i === 0) return `/ ${p} \\`;
        if (i === wrapped.length - 1) return `\\ ${p} /`;
        return `| ${p} |`;
      });
  return [
    top, ...msgLines, bot,
    `        \\   ^__^`,
    `         \\  (oo)\\_______`,
    `            (__)\\       )\\/\\`,
    `                ||----w |`,
    `                ||     ||`,
  ].join('\n');
}

export function useTerminal({ vfs, playKeypress, playEnter, playError }) {
  const [lines, setLines]     = useState(BOOT_LINES.map(l => ({ id: makeId(), ...l })));
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [nanoOpen, setNanoOpen] = useState(false);
  const [nanoFile, setNanoFile] = useState({ name: '', node: null });
  const [secLocked, setSecLocked] = useState(true);

  const push = useCallback((...newLines) => {
    setLines(prev => [...prev, ...newLines]);
  }, []);

  const buildResumeHtml = useCallback(() => {
    const d = PortfolioData;
    return [
      `<b>HARSH TIWARI -- ASSISTANT SYSTEMS ENGINEER</b>`,
      `${d.contact.email} | ${d.contact.phone} | ${d.contact.linkedin}`,
      ``,
      `<b>SUMMARY</b>`,
      d.summary,
      ``,
      `<b>EXPERIENCE</b>`,
      ...d.experience.flatMap(e => [
        `<span class="accent">${e.role}</span> @ ${e.company} [${e.duration}]`,
        `Tech: ${e.tech}`,
        ...e.details.map(x => `  * ${x}`),
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
      ...d.education.map(e => `  * ${e.level} | ${e.institute} | ${e.grade}`),
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
          `  <span class="accent">help</span>          -- Show this menu`,
          `  <span class="accent">clear</span>         -- Clear terminal`,
          `  <span class="accent">whoami</span>        -- About me`,
          `  <span class="accent">skills</span>        -- Technical skills`,
          `  <span class="accent">experience</span>    -- Work history`,
          `  <span class="accent">projects</span>      -- My projects`,
          `  <span class="accent">education</span>     -- Academic background`,
          `  <span class="accent">contact</span>       -- Contact info`,
          `  <span class="accent">resume</span>        -- View full resume`,
          `  <span class="accent">date</span>          -- Current date/time`,
          `  <span class="accent">uptime</span>        -- Session uptime`,
          `  <span class="accent">hire</span>          -- Open email to hire me`,
          `  <span class="accent">weather [city]</span>-- Real weather data`,
          `  <span class="accent">cowsay [msg]</span>  -- Classic ASCII cow`,
          `  <span class="accent">neofetch</span>      -- System info card`,
          `  <span class="accent">ls [path]</span>     -- List files`,
          `  <span class="accent">cd [path]</span>     -- Change directory`,
          `  <span class="accent">cat [file]</span>    -- Read file`,
          `  <span class="accent">touch [file]</span>  -- Create file`,
          `  <span class="accent">rm [file]</span>     -- Delete file`,
          `  <span class="accent">nano [file]</span>   -- Edit file`,
          `  <span class="accent">grep k file</span>   -- Search in file`,
          `  <span class="accent">pwd</span>           -- Print working dir`,
          `  <span class="accent">theme [name]</span>  -- Change theme`,
          `  <span class="accent">gui</span>           -- Open dashboard`,
          `  <span class="accent">open [name]</span>   -- Open a project in GUI`,
          `  <span class="accent">matrix</span>        -- Toggle matrix rain`,
          `  <span class="accent">snake</span>         -- Play snake`,
          `  <span class="accent">synth</span>         -- Open synthesizer`,
          `  <span class="accent">chat [msg]</span>    -- AI assistant`,
          `  <span class="accent">socials</span>       -- Social links`,
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
        push(line('output', 'Resume download -- use the Download Resume button in the Dashboard sidebar.'));
        playEnter?.();
        break;

      case 'hire': {
        const subject = encodeURIComponent('Hiring Inquiry — Harsh Tiwari');
        const body    = encodeURIComponent('Hi Harsh,\n\nI came across your portfolio and would love to discuss an opportunity.\n\nBest regards,');
        window.open(`mailto:${PortfolioData.contact.email}?subject=${subject}&body=${body}`);
        push(line('output', [
          `<span class="accent">Opening your email client...</span>`,
          ``,
          `  To:      <span class="accent">${PortfolioData.contact.email}</span>`,
          `  Subject: Hiring Inquiry — Harsh Tiwari`,
          ``,
          `  If nothing opened, copy the address above.`,
        ].join('\n')));
        playEnter?.();
        break;
      }

      case 'weather': {
        const city = arg || 'Indore';
        push(line('output', `Fetching weather for <span class="accent">${city}</span>...`));
        fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`)
          .then(r => r.json())
          .then(d => {
            const cur  = d.current_condition[0];
            const area = d.nearest_area?.[0];
            const name = area ? `${area.areaName[0].value}, ${area.country[0].value}` : city;
            const desc = cur.weatherDesc[0].value;
            const t    = cur.temp_C;
            const fl   = cur.FeelsLikeC;
            const hum  = cur.humidity;
            const wind = cur.windspeedKmph;
            const uv   = cur.uvIndex;
            push(line('output', [
              `<b>Weather — ${name}</b>`,
              ``,
              `  <span class="accent">\\  /</span>  ${desc}`,
              `  <span class="accent"> .-.  </span> 🌡️  ${t}°C  (feels like ${fl}°C)`,
              `  <span class="accent">(   ) </span> 💧 Humidity: ${hum}%`,
              `  <span class="accent"> '-'  </span> 💨 Wind: ${wind} km/h`,
              `  <span class="accent">/    </span> ☀️  UV Index: ${uv}`,
            ].join('\n')));
          })
          .catch(() => push(line('error', `weather: could not fetch data for "${city}". Try: weather London`)));
        break;
      }

      case 'cowsay': {
        const msg = arg || 'Moo! hire me maybe? 🐄';
        push(line('output', buildCowsay(msg)));
        playEnter?.();
        break;
      }

      case 'neofetch': {
        const ms   = Date.now() - PAGE_LOAD_TIME;
        const upS  = Math.floor(ms / 1000);
        const thm  = document.body.className.replace('theme-', '') || 'minimal';
        push(line('output', [
          `<span style="color:#4ade80;font-weight:700">         harsh@portfolio</span>`,
          `         ─────────────────────────────`,
          `  <span style="color:#4ade80">OS:</span>       Portfolio OS v2.0`,
          `  <span style="color:#4ade80">Host:</span>     darkclover.dev`,
          `  <span style="color:#4ade80">Kernel:</span>   React 18 + Vite 5`,
          `  <span style="color:#4ade80">Shell:</span>    bash 2.0 (this terminal)`,
          `  <span style="color:#4ade80">Theme:</span>    ${thm}`,
          `  <span style="color:#4ade80">Stack:</span>    Java • Spring Boot • Kotlin • Android`,
          `  <span style="color:#4ade80">Backend:</span>  AEM • OSGi • Sling • JPA`,
          `  <span style="color:#4ade80">Mobile:</span>   Jetpack Compose • Room DB`,
          `  <span style="color:#4ade80">DB:</span>       MySQL • PostgreSQL • Firebase`,
          `  <span style="color:#4ade80">Tools:</span>    Git • Docker • IntelliJ • ADB`,
          `  <span style="color:#4ade80">Uptime:</span>   ${upS}s`,
          `  <span style="color:#4ade80">Memory:</span>   Infinite (it's just JS)`,
          ``,
          `  <span style="background:#dc143c;color:#dc143c">__</span><span style="background:#268bd2;color:#268bd2">__</span><span style="background:#7aa2f7;color:#7aa2f7">__</span><span style="background:#cba6f7;color:#cba6f7">__</span><span style="background:#4ade80;color:#4ade80">__</span><span style="background:#fbbf24;color:#fbbf24">__</span><span style="background:#f87171;color:#f87171">__</span>`,
        ].join('\n')));
        playEnter?.();
        break;
      }


      case 'open': {
        const query = args.trim().toLowerCase();
        const projects = PortfolioData.projects;
        if (!query) {
          push(line('output', [
            `<b>Usage:</b> open [project name]`,
            ``,
            `<b>Available projects:</b>`,
            ...projects.map((p, i) => `  ${i + 1}. <span class="accent">${p.name}</span>`),
          ].join('\n')));
          playEnter?.();
          break;
        }
        const match = projects.find(p =>
          p.name.toLowerCase().includes(query) ||
          query.includes(p.name.toLowerCase().split(' ')[0].toLowerCase())
        );
        if (!match) {
          push(line('error', `Project not found: "${args}". Type <span class="accent">open</span> to list projects.`));
          playError?.();
          break;
        }
        push(line('output', `Opening <span class="accent">${match.name}</span> in dashboard...`));
        playEnter?.();
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('portfolio:open-project', { detail: { name: match.name } }));
        }, 350);
        break;
      }

      case 'skills': {
        const s = PortfolioData.skills;
        push(line('output', [
          `<b>Technical Skills:</b>`,
          `  Languages:  ${s.languages.join(', ')}`,
          `  Backend:    ${s.backend.join(', ')}`,
          `  Mobile/FE:  ${s.frontendMobile.join(', ')}`,
          `  Databases:  ${s.databases.join(', ')}`,
          `  Tools:      ${s.tools.join(', ')}`,
          `  Concepts:   ${s.concepts.join(', ')}`,
        ].join('\n')));
        playEnter?.();
        break;
      }

      case 'experience':
        push(line('output', PortfolioData.experience.map(e => [
          `<span class="accent">${e.role}</span> @ ${e.company}`,
          `  Duration: ${e.duration}`,
          `  Tech: ${e.tech}`,
          e.details.map(d => `    * ${d}`).join('\n'),
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
          `* ${e.level}\n  ${e.institute}\n  ${e.grade}`
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
          `<a href="${c.linkedinUrl}" target="_blank" rel="noopener noreferrer" class="accent">LinkedIn -> ${c.linkedin}</a>`,
          `<a href="${c.githubUrl}"   target="_blank" rel="noopener noreferrer" class="accent">GitHub   -> ${c.github}</a>`,
          `<a href="mailto:${c.email}" class="accent">Email    -> ${c.email}</a>`,
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
            e.isDir ? `<span class="accent">${e.name}/</span>` : e.name
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
        push(line('output', '<span style="color:#00ff41;font-weight:700">SYSTEM BREACH DETECTED</span>'));
        push(line('output', 'Entering hacker mode... <span class="accent">click anywhere to exit</span>'));
        playEnter?.();
        setTimeout(() => { if (vfsHooks.openMatrixOverlay) vfsHooks.openMatrixOverlay(); }, 400);
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
          push(line('output', '<span class="accent">Access granted.</span>'));
          playEnter?.();
        } else {
          push(line('error', 'Unknown unlock target.'));
          playError?.();
        }
        break;

      // -- Easter eggs --------------------------------------------------

      case 'darkclover':
        if (vfsHooks.setTheme) vfsHooks.setTheme('anti-magic');
        push(line('output', [
          `<span style="color:#4ade80;font-weight:700;font-family:monospace">`,
          ` ____   _   ____  _  __   ____  _     ___  _   _ _____  ____`,
          `|  _ \\ / \\ |  _ \\| |/ /  / ___|| |   / _ \\| | | | ____||  _ \\`,
          `| | | / _ \\| |_) | ' /  | |    | |  | | | | | | |  _|  | |_) |`,
          `| |_| / ___ |  _ <| . \\  | |___ | |__| |_| | |_| | |___ |  _ <`,
          `|____/_/   \\_|_| \\_|_|\\_\\  \\____||_____\\___/ \\___/|_____||_| \\_\\`,
          `</span>`,
          ``,
          `  <span style="color:#4ade80">Identity confirmed: <b>darkclover</b></span>`,
          `  IGN registered. Portfolio infiltrated.`,
          `  <span class="accent">In-game or in code -- always darkclover.</span>`,
          ``,
          `  Tip: on the GUI, type the name anywhere to trigger the full easter egg.`,
        ].join('\n')));
        playEnter?.();
        break;

      case 'sudo':
        push(line('error', [
          `sudo: permission denied.`,
          `This system is owned by <span class="accent">darkclover</span>.`,
          `Nice try -- even root can't touch this portfolio.`,
        ].join('\n')));
        playError?.();
        break;

      case 'hack':
        push(line('output', [
          `Initializing hack sequence...`,
          `<span class="accent">[########........]</span> 50% -- Bypassing firewall...`,
          `<span class="accent">[############....]</span> 75% -- Decrypting mainframe...`,
          `<span class="accent">[################]</span> 100% -- Access granted.`,
          ``,
          `Welcome, <span style="color:#4ade80;font-weight:700">darkclover</span>.`,
          `Turns out you already own this machine. Nothing to hack here.`,
        ].join('\n')));
        playEnter?.();
        break;

      case 'clover':
        push(line('output', [
          `<span style="color:#4ade80">  [4]  [4]  [4]  [4]  [4]  [4]  [4]  [4]</span>`,
          ``,
          `  <span style="color:#4ade80">Four-leaf clover -- rare, lucky, and yours.</span>`,
          `  IGN: <span class="accent">darkclover</span>`,
          `  Status: <span style="color:#4ade80">always online</span>`,
          ``,
          `<span style="color:#4ade80">  [4]  [4]  [4]  [4]  [4]  [4]  [4]  [4]</span>`,
        ].join('\n')));
        playEnter?.();
        break;

      case 'ign':
        push(line('output', [
          `<b>In-Game Name:</b>`,
          `  <span style="color:#4ade80;font-size:1.1em;font-weight:700">darkclover</span>`,
          ``,
          `  The clover is dark. The player is real.`,
        ].join('\n')));
        playEnter?.();
        break;

      case 'ping': {
        const target = arg || 'darkclover';
        push(line('output', [
          `PING ${target}`,
          `  64 bytes from <span class="accent">${target}</span>: icmp_seq=1 ttl=64 time=0.1ms`,
          `  64 bytes from <span class="accent">${target}</span>: icmp_seq=2 ttl=64 time=0.1ms`,
          `  64 bytes from <span class="accent">${target}</span>: icmp_seq=3 ttl=64 time=0.1ms`,
          ``,
          `  3 packets transmitted, 3 received, 0% packet loss.`,
          target.toLowerCase().includes('darkclover') ? `  <span style="color:#4ade80">Identity always responds.</span>` : '',
        ].filter(Boolean).join('\n')));
        playEnter?.();
        break;
      }

      case 'rm': {
        const isNuke = trimmed.replace(/\s+/g, ' ').match(/^rm -rf \/?(\*|\/?)$/);
        if (isNuke) {
          push(line('output', [
            `<span style="color:#f87171">rm: nice try.</span>`,
            `System protected by <span class="accent">darkclover</span>.`,
            `(There's no real filesystem here anyway. Respect for trying though.)`,
          ].join('\n')));
          playError?.();
        } else {
          const res = vfsHooks.cmdRm(arg);
          if (res.error) { push(line('error', res.error)); playError?.(); }
          else { push(line('output', res.text)); playEnter?.(); }
        }
        break;
      }

      case 'anti-magic':
        if (vfsHooks.toggleAntiMagic) {
          vfsHooks.toggleAntiMagic();
          push(line('output', [
            '<span style="color:#00ff00">[ ANTI-MAGIC ENGAGED ]</span>',
            'Asta negates all spells -- CSS stylesheet inverted.',
            'All magic cancelled. Type <span class="accent">anti-magic</span> again to restore.',
          ].join('<br>')));
        } else {
          push(line('output', 'Anti-magic not available in this context.'));
        }
        playEnter?.();
        break;

      default:
        push({ ...line('error', `bash: ${cmd}: command not found`), glitch: true });
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
