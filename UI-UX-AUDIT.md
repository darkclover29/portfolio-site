# Portfolio Audit — De-vibe-coding & UI/UX Improvements

Recommendations only — no code changed. Ordered by impact within each section.

---

## 1. The "vibe coded" tells (highest priority)

### 1.1 Effect overload — the #1 giveaway
The site currently runs, simultaneously: custom cursor + cursor trail + card tilt + magnetic buttons + scramble text + border glow + glare hover + tab particle burst + typewriter + boot sequence + ash particles + matrix canvas + glitch overlay + constellation + confetti (×2) + desktop pet + snake + synth. Any two of these read as "crafted"; all twenty read as "AI generated everything it could think of."

- Pick **2–3 signature interactions** (suggested keep: tab slide transition, command palette, the CLI mode itself — it's the actual differentiator). 
- Cut or hide behind easter eggs: cursor trail, scramble text on functional labels, magnetic buttons, card tilt on every card, tab burst, glare/border glow.
- CustomCursor: custom cursors are a known usability negative; if kept, make it subtle (dot only, no context labels like OPEN/CODE/TYPE).

### 1.2 Eleven themes
Mono, minimal, dark, matrix, cyberpunk, dracula, nord, light, solarized, tokyo-night, catppuccin. This is a theme-collection demo, not a portfolio. Keep **dark + light + one fun one** (e.g. matrix, tied to the CLI). Fewer themes = less CSS, fewer contrast bugs, stronger identity.

### 1.3 Repo hygiene — dead files at root
- `script.js` (126 KB) and `style.css` at root — the old vanilla version, unused. Delete.
- `_dev_index.html`, `_prod_index.html`, `index.html.prod` — build-hack leftovers. Delete; use Vite modes/env instead.
- `avatar.png` (1.6 MB!) plus 8 theme avatars duplicated at root AND in `public/`. Keep one optimized set in `public/` only.
- `src/assets/react.svg`, `vite.svg`, `hero.png` if unused — delete.
- `dist/` should be gitignored if committed.

### 1.4 One 7,662-line CSS file with 258 `!important`
- Split `index.css` by component (or co-locate CSS per component / CSS modules).
- 258 `!important` = specificity war, classic generated-CSS smell. Refactor to remove nearly all.
- Purge dead rules carried over from the vanilla version (bundle CSS is 144 KB — a portfolio needs ~30–40 KB).

### 1.5 Inconsistent breakpoints
Media queries at 1280, 1024, 920, 900, 840, 768, 600, 540, 500, 480, 380, 360 px. Standardize on 3–4 tokens (e.g. 480 / 768 / 1024 / 1280) defined once and used everywhere.

### 1.6 Copy-pasted code
- `fireConfetti()` duplicated verbatim in `ContactTab.jsx` and `GuestbookTab.jsx` → `src/utils/confetti.js`.
- `ISTClock`/`ISTTime` duplicated in `Sidebar.jsx` and `AboutTab.jsx` → one shared component.
- `CopyBtn` duplicated in `Sidebar.jsx` and `ContactTab.jsx` → `shared/CopyButton.jsx`.

### 1.7 Architecture smells
- **Window CustomEvents as a state bus** (`portfolio:navigate`, `portfolio:open-project`, `terminal:run`) — replace with React context or lifted callbacks; events are untyped and break silently.
- **Prop drilling**: `Terminal` receives ~15 audio props individually — pass the `audio` object once, or use context.
- **DOM queries inside React**: `Dashboard.handleTab` does `document.querySelectorAll('.stnav-btn')` and index-matches buttons — brittle (breaks because CLI tab isn't in SlideTabNav order). Use refs.
- `// eslint-disable-line` on exhaustive-deps in `Dashboard.jsx` — fix the dependency instead.
- Dead state: `setAntiMagicMode` used but value discarded (`const [, setAntiMagicMode]`), and body attribute set imperatively — pick one source of truth.

### 1.8 Identity inconsistencies (recruiters notice these)
- GitHub username is `harshtiwari29` in contact data but project links point to `darkclover29/...`; og:url is `darkclover29.github.io/portfolio-site` while `vite.config.js` has `base: '/'`. Pick one canonical username + domain and use it everywhere.
- Favicon is an inline 💻 emoji data-URI while a real `favicon.svg` exists in the repo — wire up the real one.
- Avatar renders as placeholder text "HT" despite 8 avatar PNGs shipped. Use one (optimized) or delete them all.
- EmailJS service/template/key hardcoded in `ContactTab.jsx` — move to `import.meta.env.VITE_*` (they're public-by-design, but hardcoding looks careless).

---

## 2. Performance

### 2.1 Bundle: 472 KB single JS chunk
- `React.lazy` + Suspense the heavy, rarely-hit surfaces: `Terminal` (+ its hooks), `SnakeGame`, `Synth`, `MatrixOverlay`, `DigitalGlitchOverlay`, `InteractiveConstellation`, `AstaDesktopPet`, `DarkCloverEgg`.
- `manualChunks` to split `framer-motion` (its largest dependency). Consider replacing framer-motion entirely — every animation used (fade/slide/stagger) is achievable with CSS, saving ~100 KB.

### 2.2 Third-party render-blocking
- **Font Awesome full CDN CSS** loads every icon + webfonts for the ~30 icons used. Replace with inline SVGs (you already have `icons.svg`) or a subset. Biggest single perf win + removes FOUT of icons.
- Self-host Inter + JetBrains Mono (2 weights each, not 4+7) as woff2 with `font-display: swap`. Current setup double-loads via preload-as-style + stylesheet.

### 2.3 Images
- `avatar.png` 1.6 MB → resize + WebP/AVIF (~20 KB). All avatar PNGs ~125 KB each → WebP.
- `og-image.png` 48 KB is fine; add `width/height` attributes on any rendered `<img>` to avoid CLS.

### 2.4 Runtime
- Multiple persistent rAF loops (custom cursor, trail, tilt, matrix, particles). Pause all loops on `document.visibilitychange` and when their layer is inactive (e.g. matrix canvas while in CLI view).
- `useTypewriter` triggers a re-render per character (~15/sec forever) on the About hero. Acceptable, but a CSS `steps()` animation or throttled version is free.
- Remove blanket `will-change` usages; apply only during the animation.
- Both app views (Terminal + Dashboard) stay mounted forever. Fine for switch speed, but Terminal's audio/analyser and matrix rain should suspend while hidden.

### 2.5 PWA/SW
- Verify `sw.js` cache versioning busts on deploy (stale-cache bugs are the classic GH Pages PWA failure). If you don't need offline, drop the SW — it adds risk with no payoff for a portfolio.

---

## 3. UX

### 3.1 No routing — biggest UX gap
Tabs aren't URLs. Back button exits the site, links can't deep-link to `/projects`, refresh resets to About. Add hash routing (`#/projects`) — small change, huge credibility gain. Sync command palette + terminal `open` to it.

### 3.2 Boot sequence
Runs on **every** load. Show it once per session (`sessionStorage`), always with a visible "Skip" (and skip entirely for `prefers-reduced-motion`).

### 3.3 Mobile bottom nav: 8 items
8 tabs with icon+label at 360 px is cramped and taps are tiny. Options: drop labels below 400 px, or 5 primary tabs + "More" sheet (Guestbook, Education, CLI fit there).

### 3.4 Readability of gimmick text
ScrambleText on CTAs ("Contact Me", "Visit →") makes primary actions momentarily unreadable. Never animate the label of an action a user is trying to read.

### 3.5 Contact
- "Open Gmail" assumes the visitor uses Gmail — use `mailto:` primary with Gmail as secondary, or just mailto.
- Form: verify inline validation messages, disabled state while sending, and success state (confetti alone isn't confirmation for screen readers — add a status text with `aria-live`).

### 3.6 Projects
- Cards with no GitHub/live link open a "Coming Soon" modal after clicking — signal disabled state on the card itself (grayed icon + tooltip) so users don't hit a dead end.
- Filter pills: show active count (e.g. "Android (3)").

### 3.7 Content freshness
"Jan 2026 – Present", "Available" pulse, "Now building" card — these date the site instantly when stale. Keep them in `portfolioData.js` with a quarterly-review habit, or remove precise dates.

### 3.8 The ✨ hidden button
Rendered visibly with `aria-label="secret"` and title "???" — screen-reader users hear "secret button" with no explanation. Either make it a real easter egg (keyboard sequence only) or give it a meaningful label.

---

## 4. Accessibility

- **`maximum-scale=1.0` in the viewport meta blocks pinch-zoom** — WCAG 1.4.4 failure and the single most common "vibe coded" a11y bug. Remove it (iOS ignores it anyway).
- `prefers-reduced-motion` appears only twice in 7,662 lines of animation CSS, and none of the JS effects (particles, cursor, scramble, typewriter, boot, framer-motion variants) respect it. Add one global gate: a `useReducedMotion()` check that disables all decorative JS effects + a CSS block that zeroes animations.
- Tabs: mobile nav has `role="tab"` but no `tablist`/`tabpanel` wiring or arrow-key navigation; desktop SlideTabNav has no tab semantics at all. Implement the ARIA tabs pattern once, in both.
- Modals (`Modal`, `CommandPalette`, `ShortcutModal`, project preview): verify focus trap, Escape, and focus return. `ProjectPreviewOverlay` needs `role="dialog"` + `aria-modal="true"`.
- Custom cursor hides the native cursor for keyboard users' hover context — ensure strong `:focus-visible` rings everywhere (esp. on bento cards and pill nav).
- Contrast-check every theme's `--text-secondary` on `--bg-surface`; low-contrast candidates: `minimal` (#d4c9b8), dim matrix greens, light theme grays.
- Decorative icons (`<i class="fas ...">`) should have `aria-hidden="true"`.

---

## 5. SEO / meta

- Add `<link rel="canonical">`; fix the og:url ↔ deploy-base mismatch (see 1.8).
- Add JSON-LD `Person` schema (name, jobTitle, sameAs GitHub/LinkedIn).
- Verify heading hierarchy: exactly one `h1` (bento name), tabs start at `h2`.
- SPA content is invisible to non-JS crawlers; optional: `vite-plugin-prerender` or at least a meaningful `<noscript>` block.

---

## 6. Project polish

- `package.json`: still `version 0.0.0`, generic name — add description, author, repo fields.
- No CI: add a GitHub Action running `eslint` + `vite build` on push (and optionally Lighthouse CI with budgets: JS < 200 KB, perf > 90).
- README: replace the Vite boilerplate with what the project is, feature list, stack, and screenshots — recruiters read the repo too.
- Zero tests: even 3–4 Vitest tests on `useVFS` / `useTerminal` command parsing signal engineering discipline.

---

## Suggested order of attack

1. Delete dead files, fix identity mismatches, real favicon (1 hr, instant credibility).
2. Viewport zoom fix + global reduced-motion gate (quick, high a11y value).
3. Cut effects to 2–3 + trim themes to 3 (biggest "not vibe coded" shift).
4. Font Awesome → inline SVG, self-host fonts, optimize images, code-split (perf).
5. Hash routing + tab ARIA (UX depth).
6. CSS split/dedupe, remove `!important`s, unify breakpoints.
7. Dedupe utils, kill window-event bus, CI + README + tests.
