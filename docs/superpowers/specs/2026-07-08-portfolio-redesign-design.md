# Portfolio Redesign — paco.fyi-Inspired Clean Multi-Page Site

> Spec date: 2026-07-08
> Status: Approved by Dami (sections 1–3 with amendments)
> Supersedes: `2026-06-20-portfolio-os-revamp-design.md` (OS-desktop concept, scrapped;
> branch `revamp` kept parked for salvage, never deployed)

## 1. Overview

Rebuild Dami's portfolio as a clean, minimal, multi-page site inspired by
[paco.fyi](https://paco.fyi) — bento-card layout, editorial serif headlines, terminal
flavor — with dark mode, an encrypted-text hero animation, and first-class photography
integration. Goal: match the reference's clarity, then beat it (photography teaser on
home, dark mode, richer project archive).

**Branch strategy:** old `revamp` branch (OS-desktop build) stays parked, untouched.
New work happens on branch `redesign` off `main`. Reusable pieces (tooling, data layer,
assets, tests scaffolding, deploy workflow) are salvaged from `revamp` via
`git checkout revamp -- <path>`. The legacy static site at the repo root stays live and
untouched until a user-gated cutover.

## 2. Technical Approach (decided)

Approach A — reuse the React scaffold:

- Keep from `revamp`: Vite + React + TS + Tailwind + framer-motion in `app/`,
  Vitest + Playwright setup, GitHub Pages deploy workflow, typed data layer, all
  project/company/research image assets.
- Delete all OS-era components: windows, dock, menu bar, desktop, boot sequence,
  scene/zoom, mobile shell, Zustand window store.
- Add **React Router v7 (framework mode)** with `prerender: ['/', '/projects', '/photos']`
  so every route ships as real static HTML on GitHub Pages — no 404-redirect hack.
- Vite `base` stays `/Personal-Website/`; assets resolve via `import.meta.env.BASE_URL`.

## 3. Visual Identity (Section 1 — approved)

- **Layout language:** bento cards on a soft neutral canvas, generous whitespace,
  rounded-2xl corners, hairline borders.
- **Typography:** editorial serif for hero + page titles ("Projects.", "Photos.") with
  italic accent words; clean sans for body; monospace for terminal-flavored bits.
  Self-hosted via Fontsource: Instrument Serif (or Newsreader) + Inter + JetBrains Mono.
- **Terminal flavor, made Dami's:**
  - Nav logo: `dami@home:~$` with blinking cursor (links home).
  - Home-page directory listing block (`drwxr-xr-x` style): `projects/`, `photos/`,
    `cv.pdf`, `github/`.
  - `whoami` footer block.
  - Metadata rendered like terminal output (e.g. `# hardware · 2025`).
- **Color:**
  - Light: warm off-white canvas (≈`#FAFAF8`), near-black ink.
  - Dark: deep charcoal (not pure black), soft off-white text.
  - Single accent: phosphor terminal green, used sparingly; slight glow in dark mode.
- **Dark mode:** follows system preference on first visit; sun/moon toggle in nav
  overrides; choice persisted to `localStorage`; inline `<head>` script applies the
  class before first paint (no flash of wrong theme). Hero photo gets a subtle
  treatment shift between modes.
- **Hero headline (exact copy, no subline):**
  > Hello, I build **machines** and the *software* that drives them.

## 4. Pages & Layout (Section 2 — approved with amendments)

### Home `/`

1. **Nav:** `dami@home:~$` left · Projects / Photos / CV right · theme toggle.
   CV opens `Dami_Thomas_CV_Labs.pdf` (the newest CV — replaces the older website PDF).
2. **Hero bento row:** left card = headline decrypting on load, nothing else;
   right card = Dami's grad photo (source:
   `/Users/damithomas/Documents/My Grad Photos/Ready Photos/DSC06468.jpg`,
   resized/compressed for web), framed, light/dark treatment shift.
3. **Experience card** — industry-only timeline, avatar-sized company logo beside each
   entry (logos already in `app/src/assets/companies/`):
   | Period | Company | Role |
   |---|---|---|
   | Summer 2026 | National Instruments (Emerson) | Engineering Intern |
   | Jun–Aug 2025 | Rockwell Automation | AI Engineer Intern |
   | Jan–Feb 2025 | Nasdaq | AI Engineer Intern |
   | Jun–Aug 2023 | Elinta Robotics | Assembly & Design Engineer Intern |
   MGH and REALM logos are NOT in the timeline (industry-only, per decision).
   **Skills strip** sits under/inside this card: compact monospace list of all 16
   skills (`python · pytorch · docker · fusion360 · mujoco · solidworks · …`).
   No logo grid.
4. **Featured project card:** thumbnail carousel cycling through the 5 featured
   projects, caption + link to `/projects`; auto-cycles, pauses on hover.
5. **Photography teaser card:** strip of 3–4 best shots + `photos/ →` link.
6. **Directory listing block** + "Say hi →" `mailto:dvthomas@mit.edu`.
7. **Footer:** `whoami` (Dami Thomas · MIT '26, S.B. Artificial Intelligence & Decision
   Making, minor in Mechanical Engineering · Cambridge, MA) · Pages column ·
   Elsewhere column (GitHub `github.com/dvthomas01`, LinkedIn, photography site).

### Projects `/projects`

- "Projects." serif heading + one-liner.
- Filter chips with counts: All · Hardware · Software · Research; sorted by year desc.
- **Featured (5), big thumbnail cards:**
  1. PS70 Portfolio
  2. Customizable Display Screen
  3. Autonomous Navigation Robot
  4. 2.S007 Competition Robot
  5. FitClassifier
  Card anatomy: category · title · year, one-liner, thumbnail, external link.
- **Archive:** remaining 10 projects as a compact list (year — title — one-liner — tag).
- **Research entries** appear under the Research filter chip; every research entry
  hyperlinks to its site/PDF:
  | Title | Link |
  |---|---|
  | Fast Breaks Fast: Robustness Performance in Compliant Terrain Locomotion | https://fast-breaks-fast.vercel.app/ |
  | Attention vs. Recurrence: Benchmarking Transformers and LSTMs for Music Spectral Forecasting | https://lisheld.github.io/DL_FINAL/ |
  | LunarLoc: Segment-Based Global Localization on the Moon | https://arxiv.org/pdf/2506.16940 |

### Photos `/photos`

- "Photos." heading + one-liner.
- ~24 curated shots across six categories (cities, concerts, formal, grad, live-events,
  sports) from `/Users/damithomas/Documents/Photography Website/public/images/gallery`,
  copied into the repo, resized (~1200 px long edge) + compressed at build-prep time.
- Masonry grid, lazy-loaded; click → lightbox (arrow keys / swipe / Esc).
- Category chips filter the grid.
- Prominent CTA card: "View the full gallery →" to
  https://photography-portfolio-mocha-eight.vercel.app/.

### Mobile

Single column; bento cards full-width; nav collapses to logo + toggle + compact links.
No separate mobile shell — same components, responsive Tailwind.

## 5. Interactions & Motion (Section 3 — approved)

- **Encrypted-text hero:** scramble → decode on load, built in-house with
  framer-motion (Aceternity-style, no new dependency). `prefers-reduced-motion`
  renders final text instantly.
- **Theme toggle:** instant, no flash, persisted.
- **Cards:** subtle hover lift / border glow.
- **Filter chips:** instant client-side filter with gentle layout animation.
- **Lightbox:** keyboard + swipe navigation.
- Everything else stays still — motion is seasoning, not the meal.

## 6. Data Layer (extends `revamp`'s `app/src/data/`)

- `projects.ts`: gains `featured: boolean`, `year`, keeps tags/links/thumbnails
  (all 15 thumbnails already exist in `app/src/assets/projects/`).
  **Link correction:** PS70 Portfolio must link to
  https://dvthomas01.github.io/PS70_Portfolio/ (Dami's own site), replacing the old
  course-page URL (`nathanmelenbrink.github.io/ps70/about.html`).
- `experience.ts`: rebuilt as timeline entries `{ period, company, role, logo }`
  (industry-only, four entries above).
- `research.ts`: + Fast Breaks Fast entry (needs a thumbnail — screenshot of
  fast-breaks-fast.vercel.app is acceptable).
- `skills.ts`: 16 skill names (strings only; no logos needed for the mono strip).
- `photos.ts` (new): curated photo entries `{ src, category, alt, width, height }`.

## 7. Assets

| Asset | Source | Status |
|---|---|---|
| Hero photo | `~/Documents/My Grad Photos/Ready Photos/DSC06468.jpg` (7 MB, 4000×6000 — resize/crop) | ✅ on disk |
| CV PDF | `~/Documents/Career:Job/Dami_Thomas_CV_Labs.pdf` | ✅ on disk |
| 15 project thumbnails | `app/src/assets/projects/` (revamp branch) | ✅ in repo |
| Company logos ×4 | `app/src/assets/companies/` (revamp branch) | ✅ in repo |
| Research thumbnails ×2 | `app/src/assets/research/` (revamp branch) | ✅ in repo |
| Fast Breaks Fast thumbnail | screenshot of fast-breaks-fast.vercel.app | ⏳ to capture |
| ~24 gallery photos | `~/Documents/Photography Website/public/images/gallery/` | ✅ on disk |
| Display Screen extra media | Dami offered to drop more media | optional, later |

## 8. Testing

- **Unit (Vitest):** data integrity (required fields on every project/photo/experience
  entry; filter counts correct; featured set = the 5 above), theme persistence logic,
  encrypted-text hook behavior (decodes to exact target string; reduced-motion path).
- **E2E (Playwright, desktop + mobile):** home renders + hero decodes; nav to
  `/projects`, filters work; `/photos` lightbox opens/closes; theme toggle flips and
  persists across reload.
- Existing gates carry over: `cd app && npm run build`, `npm test`, `npm run e2e`.

## 9. Deployment & Cutover

- GitHub Pages deploy workflow unchanged (`main` + manual trigger). Deploying replaces
  the live site — nothing ships until Dami approves cutover, same gate as before.
- Legacy root site remains untouched on `main` until cutover.

## 10. Out of Scope

- Guestbook / Now / Colophon pages (paco extras — not requested).
- Full on-site photo gallery mirror (Vercel site remains the deep experience).
- Audio features (explicitly removed in prior session; still out).
- Project detail pages (cards link externally where links exist).
