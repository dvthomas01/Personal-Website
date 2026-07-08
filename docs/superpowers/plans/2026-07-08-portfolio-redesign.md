# Portfolio Redesign (paco.fyi-Inspired) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Dami's portfolio as a clean multi-page bento-card site (Home / Projects / Photos) with dark mode, terminal flavor, an encrypted-text hero, and photography integration, per the approved spec `docs/superpowers/specs/2026-07-08-portfolio-redesign-design.md`.

**Architecture:** Salvage the Vite + React + TS + Tailwind scaffold and typed data layer from the parked `revamp` branch into `app/`, delete all OS-desktop components, and convert the app to React Router v7 **framework mode** with `ssr: false` + `prerender` so `/`, `/projects`, and `/photos` ship as real static HTML on GitHub Pages under `/Personal-Website/`.

**Tech Stack:** React 19, React Router 7 (framework mode, prerender), Vite 7 (pinned — RR dev plugin lags Vite 8), Tailwind 3, framer-motion, Fontsource (Instrument Serif + Inter Variable + JetBrains Mono Variable), Vitest + Testing Library, Playwright.

## Global Constraints

- Work on branch `redesign` (already created off `main`). NEVER touch branch `revamp` or the legacy root site files (`index.html`, `style.css`, `software/`, `hardware/`, `images/`).
- Vite `base` is `/Personal-Website/`; React Router `basename` is `/Personal-Website/`; public assets resolve via `import.meta.env.BASE_URL`.
- `verbatimModuleSyntax` is on → use `import type { X }` for type-only imports.
- Build gate: `cd app && npm run build` (root `npx tsc --noEmit` is a references-only NO-OP — never trust it).
- Vitest config lives in a SEPARATE standalone `app/vitest.config.ts` that must NOT import `vite.config.ts` (the RR plugin breaks under Vitest); it excludes `e2e/**`.
- Hero headline EXACT copy, no subline: `Hello, I build machines and the software that drives them.` — "machines" bold, "software" italic.
- Nav logo exact string: `dami@home:~$` with blinking block cursor.
- CV served = `Dami_Thomas_CV_Labs.pdf` (NOT the old `Dami_Thomas_CV_website.pdf`).
- PS70 Portfolio card links to `https://dvthomas01.github.io/PS70_Portfolio/` (NOT the course page).
- Experience timeline is industry-only: NI, Rockwell, Nasdaq, Elinta (no MGH, no REALM).
- No audio features. No guestbook/now/colophon pages. No project detail pages.
- Deploy workflow stays gated: triggers on `main` push + manual only. Never push to `main` or deploy in this plan.
- All commits on `redesign`; commit message format `<type>: <description>` (feat/fix/test/chore/docs).
- Every interactive animation must respect `prefers-reduced-motion`.
- All code must be SSR-safe: `window`/`localStorage`/`matchMedia` access must be guarded (`typeof window === 'undefined'`) because prerendering executes components in Node at build time.

---

### Task 1: Salvage scaffold from `revamp`, prune OS code, pin Vite 7

**Files:**
- Restore from revamp: `app/` (whole tree), `.github/workflows/deploy.yml`
- Delete: `app/src/os/`, `app/src/scene/`, `app/src/mobile/`, `app/src/state/`, `app/src/apps/`, `app/src/components/Glass.tsx`, `app/src/components/Glass.test.tsx`, `app/src/boot/EncryptedBoot.tsx`, `app/src/boot/EncryptedBoot.test.tsx`, `app/src/data/apps.ts`, `app/src/data/apps.test.ts`, `app/src/data/data.test.ts` (rewritten in Task 4), `app/src/App.tsx`, `app/src/App.css`, `app/src/App.test.tsx`, `app/src/test/smoke.test.tsx`, `app/src/assets/scene/`, `app/src/assets/hero.png`, `app/src/assets/react.svg`, `app/src/assets/vite.svg`, `app/public/icons.svg`, `app/public/Dami_Thomas_CV_website.pdf`, `app/src/styles/`
- Move: `app/src/boot/useEncryptedText.ts` → `app/src/hooks/useEncryptedText.ts`, `app/src/boot/useEncryptedText.test.ts` → `app/src/hooks/useEncryptedText.test.ts` (then delete `app/src/boot/`)
- Modify: `app/package.json`, `app/src/main.tsx`, `app/index.html`, `app/vitest.setup.ts`

**Interfaces:**
- Consumes: `revamp` branch content via `git checkout revamp -- <path>`.
- Produces: a green minimal SPA baseline: `app/src/hooks/useEncryptedText.ts` exporting `scramble(target: string, revealed: number): string` and `useEncryptedText(target: string, opts?: { speed?: number }): string`; data files `app/src/data/{types,projects,skills,research,experience}.ts` unchanged from revamp (rebuilt in Task 4); Vite 7 toolchain.

- [ ] **Step 1: Restore app and workflow from revamp**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website"
git checkout revamp -- app/ .github/workflows/deploy.yml
```

- [ ] **Step 2: Delete OS-era code and stale assets**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website"
git rm -r --quiet app/src/os app/src/scene app/src/mobile app/src/state app/src/apps \
  app/src/components app/src/assets/scene app/src/styles app/src/test \
  app/src/boot/EncryptedBoot.tsx app/src/boot/EncryptedBoot.test.tsx \
  app/src/data/apps.ts app/src/data/apps.test.ts app/src/data/data.test.ts \
  app/src/App.tsx app/src/App.css app/src/App.test.tsx \
  app/src/assets/hero.png app/src/assets/react.svg app/src/assets/vite.svg \
  app/public/icons.svg "app/public/Dami_Thomas_CV_website.pdf"
mkdir -p app/src/hooks
git mv app/src/boot/useEncryptedText.ts app/src/hooks/useEncryptedText.ts
git mv app/src/boot/useEncryptedText.test.ts app/src/hooks/useEncryptedText.test.ts
rmdir app/src/boot
```

- [ ] **Step 3: Rewrite `app/package.json`** (pin Vite 7, drop zustand, add react-router deps used from Task 2 on, add fonts + sirv)

```json
{
  "name": "app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "react-router dev",
    "build": "tsc -b && react-router build",
    "lint": "eslint .",
    "preview": "rm -rf .preview && mkdir -p .preview/Personal-Website && cp -r build/client/. .preview/Personal-Website/ && sirv .preview --port 4173",
    "test": "vitest run",
    "test:watch": "vitest",
    "e2e": "playwright test"
  },
  "dependencies": {
    "@fontsource-variable/inter": "^5.2.5",
    "@fontsource-variable/jetbrains-mono": "^5.2.5",
    "@fontsource/instrument-serif": "^5.2.5",
    "framer-motion": "^12.40.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-router": "^7.9.4"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@playwright/test": "^1.61.0",
    "@react-router/dev": "^7.9.4",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@testing-library/user-event": "^14.6.1",
    "@types/node": "^24.12.3",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "jsdom": "^27.0.1",
    "postcss": "^8.5.15",
    "sirv-cli": "^3.0.1",
    "tailwindcss": "^3.4.19",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.59.2",
    "vite": "^7.1.0",
    "vitest": "^3.2.6"
  }
}
```

Note: exact minor versions may float; if `npm install` reports an unsatisfiable range, use the closest available version and note it in the commit body.

- [ ] **Step 4: Add matchMedia mock to `app/vitest.setup.ts`** (overwrite whole file)

```ts
import '@testing-library/jest-dom/vitest';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});
```

- [ ] **Step 5: Stub `app/src/main.tsx`** so the pre-RR baseline compiles (deleted in Task 2)

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <p>redesign wip</p>
  </StrictMode>,
);
```

Also overwrite `app/index.html` (deleted in Task 2) with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dami Thomas</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

And overwrite `app/src/index.css` with just Tailwind directives (Task 3 extends it):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 6: Install and verify unit tests pass**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app"
rm -rf node_modules package-lock.json && npm install
npm test
```

Expected: `useEncryptedText.test.ts` passes (only remaining test file). If it references deleted modules, trim those test cases so only hook-behavior tests remain.

Note: `npm run build` is NOT expected to pass yet (`react-router build` needs Task 2's config). Verify the old-style compile instead:

```bash
npx tsc -b && npx vite build
```

Expected: exit 0, `dist/` created. Delete `dist/` afterwards: `rm -rf dist`.

- [ ] **Step 7: Commit**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website"
git add -A app/ .github/workflows/deploy.yml
git commit -m "chore: salvage app scaffold from revamp, prune OS-desktop code, pin Vite 7"
```

---

### Task 2: Convert to React Router 7 framework mode with prerender

**Files:**
- Create: `app/react-router.config.ts`, `app/src/root.tsx`, `app/src/routes.ts`, `app/src/routes/home.tsx`, `app/src/routes/projects.tsx`, `app/src/routes/photos.tsx`
- Delete: `app/index.html`, `app/src/main.tsx`
- Modify: `app/vite.config.ts`, `app/vitest.config.ts`, `app/tsconfig.app.json`, `app/playwright.config.ts`, `.github/workflows/deploy.yml`, `app/.gitignore`

**Interfaces:**
- Consumes: Task 1 scaffold.
- Produces: routes at `/`, `/projects`, `/photos` (stub pages rendering `<h1>` serif headings "Home." / "Projects." / "Photos."); `app/src/root.tsx` exports `Layout({ children })` + default `Root()` that renders `<Outlet />`; build output at `app/build/client/` containing `index.html`, `projects/index.html`, `photos/index.html`. Later tasks replace route stubs' bodies and mount `Nav`/`Footer` in `root.tsx`.

- [ ] **Step 1: Create `app/react-router.config.ts`**

```ts
import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src',
  ssr: false,
  prerender: ['/', '/projects', '/photos'],
  basename: '/Personal-Website/',
} satisfies Config;
```

- [ ] **Step 2: Replace `app/vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';

export default defineConfig({
  base: '/Personal-Website/',
  plugins: [reactRouter()],
});
```

- [ ] **Step 3: Make `app/vitest.config.ts` standalone** (must NOT merge vite.config — the RR plugin cannot run under Vitest)

```ts
import { defineConfig, defaultExclude } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    exclude: [...defaultExclude, 'e2e/**'],
  },
});
```

- [ ] **Step 4: Create `app/src/root.tsx`**

```tsx
import type { ReactNode } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import './index.css';

const themeInit = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Dami Thomas</title>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <Meta />
        <Links />
      </head>
      <body className="bg-canvas text-ink antialiased dark:bg-canvas-dark dark:text-ink-dark">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <Outlet />
    </div>
  );
}
```

(The `bg-canvas` etc. classes are defined in Task 3; until then they're inert strings — that's fine.)

- [ ] **Step 5: Create `app/src/routes.ts`**

```ts
import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('projects', 'routes/projects.tsx'),
  route('photos', 'routes/photos.tsx'),
] satisfies RouteConfig;
```

- [ ] **Step 6: Create the three stub routes**

`app/src/routes/home.tsx`:

```tsx
export default function Home() {
  return <h1 className="font-serif text-5xl">Home.</h1>;
}
```

`app/src/routes/projects.tsx`:

```tsx
export default function Projects() {
  return <h1 className="font-serif text-5xl">Projects.</h1>;
}
```

`app/src/routes/photos.tsx`:

```tsx
export default function Photos() {
  return <h1 className="font-serif text-5xl">Photos.</h1>;
}
```

- [ ] **Step 7: Delete SPA entry files, update tsconfig + gitignore**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app"
git rm --quiet index.html src/main.tsx
```

In `app/tsconfig.app.json` change the `include` line to:

```json
  "include": ["src", "vitest.setup.ts", ".react-router/types/**/*"]
```

Append to `app/.gitignore`:

```
.react-router/
build/
.preview/
```

- [ ] **Step 8: Build and verify prerendered output**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app"
npm run build
ls build/client/index.html build/client/projects/index.html build/client/photos/index.html
grep -o "Projects\." build/client/projects/index.html | head -1
```

Expected: all three files exist; grep prints `Projects.` (proof of real prerendered HTML). If `react-router build` errors on Vite version, check `npm ls vite` — it must resolve a single v7.

- [ ] **Step 9: Update Playwright to test the built static output** — replace `app/playwright.config.ts`

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4173/Personal-Website/',
    reuseExistingServer: false,
    timeout: 180000,
  },
  use: { baseURL: 'http://localhost:4173/Personal-Website/' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
});
```

Replace `app/e2e/flow.spec.ts` with a temporary smoke (full e2e rewritten in Task 11):

```ts
import { test, expect } from '@playwright/test';

test('home prerenders and loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Dami Thomas');
});
```

(Asserting the title, not the stub heading, keeps this smoke green while Tasks 6–10 replace page content before the full e2e rewrite in Task 11.)

Run: `cd app && npm run e2e` — Expected: 2 passed (desktop + mobile).

- [ ] **Step 10: Update `.github/workflows/deploy.yml`** — change the artifact path line and name

```yaml
name: Deploy Portfolio
```

and

```yaml
      - uses: actions/upload-pages-artifact@v3
        with: { path: app/build/client }
```

(Only those two lines change; triggers stay `main` + `workflow_dispatch`.)

- [ ] **Step 11: Run unit tests, then commit**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app" && npm test
cd .. && git add -A app/ .github/workflows/deploy.yml
git commit -m "feat: convert app to React Router 7 framework mode with static prerender"
```

---

### Task 3: Design tokens, fonts, and theme system (dark mode)

**Files:**
- Modify: `app/tailwind.config.js`, `app/src/index.css`, `app/src/root.tsx`
- Create: `app/src/theme/theme.ts`, `app/src/theme/theme.test.ts`, `app/src/theme/useTheme.ts`, `app/src/components/ThemeToggle.tsx`, `app/src/components/ThemeToggle.test.tsx`

**Interfaces:**
- Consumes: Task 2 `root.tsx` (adds font imports there).
- Produces: `type Theme = 'light' | 'dark'`; `getInitialTheme(stored: string | null, systemDark: boolean): Theme`; `useTheme(): { theme: Theme; toggle: () => void }`; `<ThemeToggle />` (a button with `aria-label="Toggle theme"`); Tailwind tokens `canvas/canvas-dark`, `ink/ink-dark`, `accent/accent-dark`, `line/line-dark`, fonts `font-serif` (Instrument Serif), `font-sans` (Inter Variable), `font-mono` (JetBrains Mono Variable), `animate-blink`; shared card class `.bento` defined in CSS.

- [ ] **Step 1: Write the failing theme tests** — `app/src/theme/theme.test.ts`

```ts
import { getInitialTheme } from './theme';

test('stored value wins over system preference', () => {
  expect(getInitialTheme('light', true)).toBe('light');
  expect(getInitialTheme('dark', false)).toBe('dark');
});

test('falls back to system preference when nothing stored', () => {
  expect(getInitialTheme(null, true)).toBe('dark');
  expect(getInitialTheme(null, false)).toBe('light');
});

test('ignores garbage stored values', () => {
  expect(getInitialTheme('banana', true)).toBe('dark');
});
```

- [ ] **Step 2: Run to verify failure**

Run: `cd app && npx vitest run src/theme` — Expected: FAIL (`theme.ts` not found).

- [ ] **Step 3: Implement `app/src/theme/theme.ts`**

```ts
export type Theme = 'light' | 'dark';

export function getInitialTheme(stored: string | null, systemDark: boolean): Theme {
  if (stored === 'light' || stored === 'dark') return stored;
  return systemDark ? 'dark' : 'light';
}
```

- [ ] **Step 4: Implement `app/src/theme/useTheme.ts`** (SSR-safe; persists only on explicit toggle)

```ts
import { useEffect, useState } from 'react';
import { getInitialTheme, type Theme } from './theme';

function detectTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return getInitialTheme(
    localStorage.getItem('theme'),
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
}

export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>(detectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggle = () =>
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });

  return { theme, toggle };
}
```

- [ ] **Step 5: Write failing ThemeToggle test** — `app/src/components/ThemeToggle.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

test('toggles dark class on html and persists choice', async () => {
  render(<ThemeToggle />);
  const button = screen.getByRole('button', { name: /toggle theme/i });
  await userEvent.click(button);
  expect(document.documentElement).toHaveClass('dark');
  expect(localStorage.getItem('theme')).toBe('dark');
  await userEvent.click(button);
  expect(document.documentElement).not.toHaveClass('dark');
  expect(localStorage.getItem('theme')).toBe('light');
});
```

Run: `cd app && npx vitest run src/components/ThemeToggle` — Expected: FAIL (component missing).

- [ ] **Step 6: Implement `app/src/components/ThemeToggle.tsx`**

```tsx
import { useTheme } from '../theme/useTheme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="rounded-lg border border-line px-2 py-1 font-mono text-xs transition-colors hover:border-accent dark:border-line-dark dark:hover:border-accent-dark"
    >
      {theme === 'dark' ? '☾' : '☀'}
    </button>
  );
}
```

- [ ] **Step 7: Replace `app/tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: { DEFAULT: '#FAFAF8', dark: '#161719' },
        ink: { DEFAULT: '#1B1B19', dark: '#ECECEA' },
        accent: { DEFAULT: '#0E7A3D', dark: '#4ADE80' },
        line: { DEFAULT: '#E5E4DF', dark: '#2B2C2F' },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        blink: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
      },
      animation: { blink: 'blink 1.1s step-end infinite' },
    },
  },
  plugins: [],
};
```

- [ ] **Step 8: Replace `app/src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-sans;
  }
}

@layer components {
  .bento {
    @apply rounded-2xl border border-line bg-white/60 p-6 dark:border-line-dark dark:bg-white/5;
  }
}
```

- [ ] **Step 9: Import fonts in `app/src/root.tsx`** — add these imports at the top, above `./index.css`:

```tsx
import '@fontsource/instrument-serif';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
```

- [ ] **Step 10: Verify all gates and commit**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app"
npm test && npm run build
cd .. && git add -A app/
git commit -m "feat: design tokens, self-hosted fonts, and dark mode theme system"
```

---

### Task 4: Data layer — projects (+research merged), experience, site constants

**Files:**
- Modify: `app/src/data/types.ts`, `app/src/data/projects.ts`, `app/src/data/experience.ts`
- Delete: `app/src/data/research.ts`, `app/src/assets/companies/mgh.png`, `app/src/assets/companies/realm.png`
- Create: `app/src/data/site.ts`, `app/src/data/data.test.ts`
- Keep unchanged: `app/src/data/skills.ts`

**Interfaces:**
- Consumes: existing asset files under `app/src/assets/{projects,companies,research}/`. The research thumbnail `app/src/assets/research/fast-breaks-fast.png` is created in Task 5 — see Step 4 note for the temporary placeholder.
- Produces:
  - `types.ts`: `type ProjectKind = 'Software' | 'Hardware' | 'Research'`; `interface Project { id: string; title: string; tags: ProjectKind[]; thumbnail: string; href?: string; description: string; year: number; featured: boolean }`; `interface ExperienceEntry { period: string; company: string; role: string; logo: string }`; `interface Skill { name: string; icon: string }` (kept).
  - `projects.ts`: `export const projects: Project[]` — 18 entries (15 projects + 3 research), exactly 5 with `featured: true`.
  - `experience.ts`: `export const experience: ExperienceEntry[]` — 4 industry entries, newest first.
  - `site.ts`: `export const site` with `name, email, github, linkedin, photography, cvFile`.

- [ ] **Step 1: Write the failing data integrity tests** — `app/src/data/data.test.ts`

```ts
import { projects } from './projects';
import { experience } from './experience';
import { skills } from './skills';
import { site } from './site';

test('has 18 projects (15 builds + 3 research)', () => {
  expect(projects).toHaveLength(18);
});

test('exactly the 5 chosen projects are featured', () => {
  const featured = projects.filter((p) => p.featured).map((p) => p.id).sort();
  expect(featured).toEqual(['autobot', 'comp-robot', 'fitclassifier', 'led-display', 'ps70']);
});

test('every project has required fields', () => {
  for (const p of projects) {
    expect(p.id).toBeTruthy();
    expect(p.title).toBeTruthy();
    expect(p.tags.length).toBeGreaterThan(0);
    expect(p.thumbnail).toBeTruthy();
    expect(p.description).toBeTruthy();
    expect(p.year).toBeGreaterThanOrEqual(2022);
    expect(p.year).toBeLessThanOrEqual(2026);
  }
});

test('every research entry links out', () => {
  const research = projects.filter((p) => p.tags.includes('Research'));
  expect(research).toHaveLength(3);
  for (const r of research) expect(r.href).toMatch(/^https:\/\//);
});

test('PS70 links to Dami’s own portfolio, not the course page', () => {
  const ps70 = projects.find((p) => p.id === 'ps70');
  expect(ps70?.href).toBe('https://dvthomas01.github.io/PS70_Portfolio/');
});

test('experience is industry-only, newest first', () => {
  expect(experience.map((e) => e.company)).toEqual([
    'National Instruments',
    'Rockwell Automation',
    'Nasdaq',
    'Elinta Robotics',
  ]);
  for (const e of experience) {
    expect(e.period).toBeTruthy();
    expect(e.role).toBeTruthy();
    expect(e.logo).toBeTruthy();
  }
});

test('16 skills present', () => {
  expect(skills).toHaveLength(16);
});

test('site constants', () => {
  expect(site.email).toBe('dvthomas@mit.edu');
  expect(site.github).toBe('https://github.com/dvthomas01');
  expect(site.cvFile).toBe('Dami_Thomas_CV_Labs.pdf');
});
```

- [ ] **Step 2: Run to verify failure**

Run: `cd app && npx vitest run src/data` — Expected: FAIL (site.ts missing, shape mismatches).

- [ ] **Step 3: Rewrite `app/src/data/types.ts`**

```ts
export type ProjectKind = 'Software' | 'Hardware' | 'Research';

export interface Project {
  id: string;
  title: string;
  tags: ProjectKind[];
  thumbnail: string; // imported asset URL
  href?: string; // external link, opens new tab
  description: string;
  year: number;
  featured: boolean;
}

export interface ExperienceEntry {
  period: string; // e.g. 'Summer 2026'
  company: string;
  role: string;
  logo: string; // imported asset URL
}

export interface Skill {
  name: string;
  icon: string; // imported asset URL
}

export interface Photo {
  id: string;
  src: string; // imported asset URL
  category: PhotoCategory;
  alt: string;
}

export type PhotoCategory =
  | 'cities'
  | 'concerts'
  | 'formal'
  | 'grad'
  | 'live-events'
  | 'sports';
```

- [ ] **Step 4: Rewrite `app/src/data/projects.ts`** — 18 entries. Years marked `// VERIFY` are best-guess estimates; Dami confirms them at final review.

First create a temporary placeholder so imports resolve until Task 5 captures the real screenshot:

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app"
cp src/assets/research/audio.png src/assets/research/fast-breaks-fast.png
```

```ts
import type { Project } from './types';
import autobot from '../assets/projects/autobot.jpeg';
import glasslamp from '../assets/projects/glasslamp.jpeg';
import compRobot from '../assets/projects/comp-robot.jpeg';
import launcher from '../assets/projects/launcher.png';
import chess from '../assets/projects/chess.png';
import nba from '../assets/projects/nba.png';
import waldo from '../assets/projects/waldo.png';
import dictionary from '../assets/projects/dictionary.png';
import lectureNote from '../assets/projects/lecture-note.jpeg';
import deck from '../assets/projects/deck.jpg';
import pacman from '../assets/projects/pacman.png';
import fitclassifier from '../assets/projects/fitclassifier.png';
import fmab from '../assets/projects/fmab.jpg';
import ps70 from '../assets/projects/ps70.jpg';
import ledDisplay from '../assets/projects/led-display.jpg';
import audio from '../assets/research/audio.png';
import rover from '../assets/research/rover.png';
import fastBreaks from '../assets/research/fast-breaks-fast.png';

const SITE = 'https://dvthomas01.github.io/Personal-Website';

export const projects: Project[] = [
  // ---- featured (5) ----
  { id: 'ps70', title: 'PS70 Portfolio', tags: ['Hardware', 'Software'], thumbnail: ps70, href: 'https://dvthomas01.github.io/PS70_Portfolio/', description: 'Rapid prototyping, embedded controllers, CNC, and laser-cutting workflows.', year: 2025, featured: true },
  { id: 'led-display', title: 'Customizable Display Screen', tags: ['Hardware', 'Software'], thumbnail: ledDisplay, href: 'https://dvthomas01.github.io/PS70_Portfolio/13_finalproject/index.html', description: 'Low-latency display-driving firmware, custom power routing, modular hardware framing.', year: 2025, featured: true },
  { id: 'autobot', title: 'Autonomous Navigation Robot', tags: ['Hardware'], thumbnail: autobot, href: `${SITE}/hardware/autobot/autobot.html`, description: 'Semantic visual navigation with ROS 2, SLAM, and natural-language commands.', year: 2025, featured: true },
  { id: 'comp-robot', title: '2.S007 Competition Robot', tags: ['Hardware'], thumbnail: compRobot, href: `${SITE}/hardware/2.s007/2.s007.html`, description: 'Competition robot for MIT 2.S007.', year: 2024, featured: true }, // VERIFY year
  { id: 'fitclassifier', title: 'FitClassifier', tags: ['Software'], thumbnail: fitclassifier, href: `${SITE}/software/fitclassifier/fitclassifier.html`, description: 'Shazam for Clothes — outfit classifier.', year: 2024, featured: true }, // VERIFY year
  // ---- research (3) ----
  { id: 'fast-breaks-fast', title: 'Fast Breaks Fast: Robustness Performance in Compliant Terrain Locomotion', tags: ['Research'], thumbnail: fastBreaks, href: 'https://fast-breaks-fast.vercel.app/', description: 'PPO quadruped locomotion in MuJoCo — compliance randomization vs. robustness on unseen compliant terrain.', year: 2026, featured: false },
  { id: 'audio-forecast', title: 'Attention vs. Recurrence: Benchmarking Transformers and LSTMs for Music Spectral Forecasting', tags: ['Research'], thumbnail: audio, href: 'https://lisheld.github.io/DL_FINAL/', description: 'Benchmarking sequence models for music spectral forecasting.', year: 2025, featured: false },
  { id: 'lunarloc', title: 'LunarLoc: Segment-Based Global Localization on the Moon', tags: ['Research'], thumbnail: rover, href: 'https://arxiv.org/pdf/2506.16940', description: 'Segment-based global localization for lunar rovers (arXiv:2506.16940).', year: 2025, featured: false },
  // ---- archive (10) ----
  { id: 'glasslamp', title: 'Glass Metal Lamp', tags: ['Hardware'], thumbnail: glasslamp, href: `${SITE}/hardware/glasslamp/lamp.html`, description: 'Fabricated glass and metal lamp.', year: 2023, featured: false }, // VERIFY year
  { id: 'launcher', title: 'Vacuum-Formed Launcher Stadium', tags: ['Hardware'], thumbnail: launcher, href: `${SITE}/hardware/2.00b/2.00b.html`, description: 'Vacuum-formed launcher stadium build.', year: 2023, featured: false }, // VERIFY year
  { id: 'fmab', title: 'FMAB Mirror', tags: ['Hardware'], thumbnail: fmab, href: `${SITE}/hardware/fmab_mirror/fmab_mirror.html`, description: 'Interactive smart mirror.', year: 2023, featured: false }, // VERIFY year
  { id: 'chess', title: 'Chess Engine', tags: ['Software'], thumbnail: chess, href: `${SITE}/software/chess/chess.html`, description: 'Chess engine implementation.', year: 2024, featured: false }, // VERIFY year
  { id: 'nba', title: 'NBA Chatbot', tags: ['Software'], thumbnail: nba, href: `${SITE}/software/nba/nba.html`, description: 'Conversational NBA stats chatbot.', year: 2024, featured: false }, // VERIFY year
  { id: 'waldo', title: "Where's Waldo Solver", tags: ['Software'], thumbnail: waldo, href: `${SITE}/software/waldo/waldo.html`, description: 'Computer-vision Waldo solver.', year: 2024, featured: false }, // VERIFY year
  { id: 'dictionary', title: 'Dictionary App', tags: ['Software'], thumbnail: dictionary, href: `${SITE}/software/dictionary/dictionary.html`, description: 'Dictionary lookup web app.', year: 2023, featured: false }, // VERIFY year
  { id: 'lecture-note', title: 'Lecture Notes Helper', tags: ['Software'], thumbnail: lectureNote, href: `${SITE}/software/Lecture_Note/Lecture_Note.html`, description: 'RAG-based lecture notes helper.', year: 2025, featured: false }, // VERIFY year
  { id: 'deck', title: 'Yu-Gi-Oh! Deck Builder', tags: ['Software'], thumbnail: deck, href: `${SITE}/software/deck_builder/deck-builder-project.html`, description: 'Deck-building web app.', year: 2023, featured: false }, // VERIFY year
  { id: 'pacman', title: 'Pac-Man Bot', tags: ['Software'], thumbnail: pacman, href: `${SITE}/software/pacman/pacman.html`, description: 'Pac-Man playing bot.', year: 2024, featured: false }, // VERIFY year
];
```

- [ ] **Step 5: Rewrite `app/src/data/experience.ts`**

```ts
import type { ExperienceEntry } from './types';
import ni from '../assets/companies/national-instruments.png';
import rockwell from '../assets/companies/rockwell.png';
import nasdaq from '../assets/companies/nasdaq.png';
import elinta from '../assets/companies/elinta.png';

export const experience: ExperienceEntry[] = [
  { period: 'Summer 2026', company: 'National Instruments', role: 'Engineering Intern', logo: ni },
  { period: 'Jun – Aug 2025', company: 'Rockwell Automation', role: 'AI Engineer Intern', logo: rockwell },
  { period: 'Jan – Feb 2025', company: 'Nasdaq', role: 'AI Engineer Intern', logo: nasdaq },
  { period: 'Jun – Aug 2023', company: 'Elinta Robotics', role: 'Assembly & Design Engineer Intern', logo: elinta },
];
```

- [ ] **Step 6: Create `app/src/data/site.ts`**

```ts
export const site = {
  name: 'Dami Thomas',
  email: 'dvthomas@mit.edu',
  github: 'https://github.com/dvthomas01',
  linkedin: 'https://www.linkedin.com/in/damithomas',
  photography: 'https://photography-portfolio-mocha-eight.vercel.app/',
  cvFile: 'Dami_Thomas_CV_Labs.pdf',
  whoami: ["Dami Thomas", "MIT '26 — S.B. AI & Decision Making, minor in MechE", 'Cambridge, MA'],
} as const;
```

- [ ] **Step 7: Delete research.ts and orphaned logos**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website"
git rm --quiet app/src/data/research.ts app/src/assets/companies/mgh.png app/src/assets/companies/realm.png
```

- [ ] **Step 8: Run tests to verify pass, then commit**

```bash
cd app && npx vitest run src/data
```

Expected: all data tests PASS.

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website"
git add -A app/src/data app/src/assets
git commit -m "feat: rebuild data layer — merged research into projects, industry-only experience, site constants"
```

---

### Task 5: Asset preparation — hero photo, CV, research screenshot, curated gallery

**Files:**
- Create: `app/src/assets/profile/dami-grad.jpg`, `app/public/Dami_Thomas_CV_Labs.pdf`, `app/src/assets/research/fast-breaks-fast.png` (real screenshot, replaces placeholder), `app/src/assets/photos/` (24 images), `app/src/data/photos.ts`, `app/src/data/photos.test.ts`
- Delete: `app/src/assets/profile/profile-pic-1.jpeg`

**Interfaces:**
- Consumes: source files on disk (paths below); `Photo`/`PhotoCategory` types from Task 4.
- Produces: `export const photos: Photo[]` (24 entries) and `export const PHOTO_CATEGORIES: PhotoCategory[]` from `app/src/data/photos.ts`; hero image importable as `../assets/profile/dami-grad.jpg`.

- [ ] **Step 1: Hero photo + CV**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app"
git rm --quiet src/assets/profile/profile-pic-1.jpeg
sips --resampleHeightWidthMax 1600 -s format jpeg -s formatOptions 82 \
  "/Users/damithomas/Documents/My Grad Photos/Ready Photos/DSC06468.jpg" \
  --out src/assets/profile/dami-grad.jpg
cp "/Users/damithomas/Documents/Career:Job/Dami_Thomas_CV_Labs.pdf" public/Dami_Thomas_CV_Labs.pdf
```

Verify: `ls -la src/assets/profile/dami-grad.jpg public/Dami_Thomas_CV_Labs.pdf` — hero should be well under 500 KB.

- [ ] **Step 2: Real Fast Breaks Fast screenshot (replaces Task 4 placeholder)**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app"
npx playwright screenshot --viewport-size=1280,800 --wait-for-timeout=4000 \
  "https://fast-breaks-fast.vercel.app/" src/assets/research/fast-breaks-fast.png
```

Verify the image is a real page render (not blank): `sips -g pixelWidth -g pixelHeight src/assets/research/fast-breaks-fast.png` and open it if unsure.

- [ ] **Step 3: Copy + resize the 24 curated gallery photos**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app"
SRC="/Users/damithomas/Documents/Photography Website/public/images/gallery"
mkdir -p src/assets/photos
for f in \
  cities/city-boston-01.jpg cities/city-lisbon-01.jpg cities/city-lisbon-07.jpg cities/city-madrid-02.jpg cities/city-ny-03.jpg \
  concerts/concert-01.jpg concerts/concert-04.jpg concerts/concert-06.jpg \
  formal/formal-02.jpg formal/formal-bsu-01.jpg formal/formal-f25-03.jpg formal/formal-07.jpg \
  grad/grad-com-03.jpg grad/grad-mb-01.jpg grad/grad-saas-02.jpg grad/grad-05.jpg \
  live-events/event-loco-03.jpg live-events/event-market-02.jpg live-events/event-spring-05.jpg live-events/event-umunna-01.jpg \
  sports/sports-bm-04.jpg sports/sports-wr-03.jpg sports/sports-bm-09.jpg sports/sports-wr-08.jpg \
; do
  base=$(basename "$f")
  sips --resampleHeightWidthMax 1200 -s format jpeg -s formatOptions 78 "$SRC/$f" --out "src/assets/photos/$base" >/dev/null
done
ls src/assets/photos | wc -l
```

Expected: `24`.

- [ ] **Step 4: Write failing photos data test** — `app/src/data/photos.test.ts`

```ts
import { photos, PHOTO_CATEGORIES } from './photos';

test('24 curated photos across all six categories', () => {
  expect(photos).toHaveLength(24);
  const categories = new Set(photos.map((p) => p.category));
  expect([...categories].sort()).toEqual([...PHOTO_CATEGORIES].sort());
});

test('every photo has src and alt', () => {
  for (const p of photos) {
    expect(p.src).toBeTruthy();
    expect(p.alt).toBeTruthy();
  }
});
```

Run: `cd app && npx vitest run src/data/photos` — Expected: FAIL (photos.ts missing).

- [ ] **Step 5: Create `app/src/data/photos.ts`**

```ts
import type { Photo, PhotoCategory } from './types';
import cityBoston01 from '../assets/photos/city-boston-01.jpg';
import cityLisbon01 from '../assets/photos/city-lisbon-01.jpg';
import cityLisbon07 from '../assets/photos/city-lisbon-07.jpg';
import cityMadrid02 from '../assets/photos/city-madrid-02.jpg';
import cityNy03 from '../assets/photos/city-ny-03.jpg';
import concert01 from '../assets/photos/concert-01.jpg';
import concert04 from '../assets/photos/concert-04.jpg';
import concert06 from '../assets/photos/concert-06.jpg';
import formal02 from '../assets/photos/formal-02.jpg';
import formalBsu01 from '../assets/photos/formal-bsu-01.jpg';
import formalF2503 from '../assets/photos/formal-f25-03.jpg';
import formal07 from '../assets/photos/formal-07.jpg';
import gradCom03 from '../assets/photos/grad-com-03.jpg';
import gradMb01 from '../assets/photos/grad-mb-01.jpg';
import gradSaas02 from '../assets/photos/grad-saas-02.jpg';
import grad05 from '../assets/photos/grad-05.jpg';
import eventLoco03 from '../assets/photos/event-loco-03.jpg';
import eventMarket02 from '../assets/photos/event-market-02.jpg';
import eventSpring05 from '../assets/photos/event-spring-05.jpg';
import eventUmunna01 from '../assets/photos/event-umunna-01.jpg';
import sportsBm04 from '../assets/photos/sports-bm-04.jpg';
import sportsWr03 from '../assets/photos/sports-wr-03.jpg';
import sportsBm09 from '../assets/photos/sports-bm-09.jpg';
import sportsWr08 from '../assets/photos/sports-wr-08.jpg';

export const PHOTO_CATEGORIES: PhotoCategory[] = [
  'cities',
  'concerts',
  'formal',
  'grad',
  'live-events',
  'sports',
];

export const photos: Photo[] = [
  { id: 'city-boston-01', src: cityBoston01, category: 'cities', alt: 'Boston cityscape' },
  { id: 'city-lisbon-01', src: cityLisbon01, category: 'cities', alt: 'Lisbon street scene' },
  { id: 'city-lisbon-07', src: cityLisbon07, category: 'cities', alt: 'Lisbon architecture' },
  { id: 'city-madrid-02', src: cityMadrid02, category: 'cities', alt: 'Madrid city view' },
  { id: 'city-ny-03', src: cityNy03, category: 'cities', alt: 'New York City street' },
  { id: 'concert-01', src: concert01, category: 'concerts', alt: 'Concert stage lights' },
  { id: 'concert-04', src: concert04, category: 'concerts', alt: 'Live concert performance' },
  { id: 'concert-06', src: concert06, category: 'concerts', alt: 'Concert crowd' },
  { id: 'formal-02', src: formal02, category: 'formal', alt: 'Formal event portrait' },
  { id: 'formal-bsu-01', src: formalBsu01, category: 'formal', alt: 'BSU formal event' },
  { id: 'formal-f25-03', src: formalF2503, category: 'formal', alt: 'Fall formal portrait' },
  { id: 'formal-07', src: formal07, category: 'formal', alt: 'Formal group shot' },
  { id: 'grad-com-03', src: gradCom03, category: 'grad', alt: 'Commencement ceremony' },
  { id: 'grad-mb-01', src: gradMb01, category: 'grad', alt: 'Graduation portrait' },
  { id: 'grad-saas-02', src: gradSaas02, category: 'grad', alt: 'Graduation celebration' },
  { id: 'grad-05', src: grad05, category: 'grad', alt: 'Graduate portrait at MIT' },
  { id: 'event-loco-03', src: eventLoco03, category: 'live-events', alt: 'Live event performance' },
  { id: 'event-market-02', src: eventMarket02, category: 'live-events', alt: 'Market event scene' },
  { id: 'event-spring-05', src: eventSpring05, category: 'live-events', alt: 'Spring event' },
  { id: 'event-umunna-01', src: eventUmunna01, category: 'live-events', alt: 'Umunna event' },
  { id: 'sports-bm-04', src: sportsBm04, category: 'sports', alt: 'Basketball game action' },
  { id: 'sports-wr-03', src: sportsWr03, category: 'sports', alt: 'Wrestling match' },
  { id: 'sports-bm-09', src: sportsBm09, category: 'sports', alt: 'Basketball court action' },
  { id: 'sports-wr-08', src: sportsWr08, category: 'sports', alt: 'Wrestling competition' },
];
```

- [ ] **Step 6: Run tests, build, commit**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app"
npx vitest run src/data && npm run build
cd .. && git add -A app/
git commit -m "feat: hero photo, Labs CV, research screenshot, 24 curated gallery photos"
```

---

### Task 6: Shell components — Nav, Footer, DirectoryListing

**Files:**
- Create: `app/src/components/Nav.tsx`, `app/src/components/Nav.test.tsx`, `app/src/components/Footer.tsx`, `app/src/components/Footer.test.tsx`, `app/src/components/DirectoryListing.tsx`, `app/src/components/DirectoryListing.test.tsx`
- Modify: `app/src/root.tsx` (mount Nav + Footer around `<Outlet />`)

**Interfaces:**
- Consumes: `site` from `./data/site` (Task 4), `<ThemeToggle />` (Task 3), `Link` from `react-router`.
- Produces: `<Nav />` (logo `dami@home:~$`, links Projects/Photos/CV, theme toggle); `<Footer />` (whoami / Pages / Elsewhere); `<DirectoryListing />` (terminal block used on Home). CV href pattern used everywhere: `` `${import.meta.env.BASE_URL}${site.cvFile}` ``.

- [ ] **Step 1: Write failing Nav test** — `app/src/components/Nav.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Nav } from './Nav';

test('renders terminal logo and page links', () => {
  render(<Nav />, { wrapper: MemoryRouter });
  expect(screen.getByText(/dami@home:~\$/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
  expect(screen.getByRole('link', { name: 'Photos' })).toHaveAttribute('href', '/photos');
  expect(screen.getByRole('link', { name: 'CV' })).toHaveAttribute('href', expect.stringContaining('Dami_Thomas_CV_Labs.pdf'));
  expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
});
```

Run: `cd app && npx vitest run src/components/Nav` — Expected: FAIL.

- [ ] **Step 2: Implement `app/src/components/Nav.tsx`**

```tsx
import { Link } from 'react-router';
import { site } from '../data/site';
import { ThemeToggle } from './ThemeToggle';

export function Nav() {
  const cvHref = `${import.meta.env.BASE_URL}${site.cvFile}`;
  return (
    <header className="flex items-center justify-between py-6 font-mono text-sm">
      <Link to="/" className="hover:text-accent dark:hover:text-accent-dark">
        dami@home:~$ <span className="animate-blink" aria-hidden="true">█</span>
      </Link>
      <nav className="flex items-center gap-2 text-ink/70 dark:text-ink-dark/70">
        <Link to="/projects" className="hover:text-accent dark:hover:text-accent-dark">Projects</Link>
        <span aria-hidden="true">/</span>
        <Link to="/photos" className="hover:text-accent dark:hover:text-accent-dark">Photos</Link>
        <span aria-hidden="true">/</span>
        <a href={cvHref} target="_blank" rel="noreferrer" className="hover:text-accent dark:hover:text-accent-dark">CV</a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
```

- [ ] **Step 3: Write failing Footer test** — `app/src/components/Footer.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Footer } from './Footer';

test('renders whoami block and elsewhere links', () => {
  render(<Footer />, { wrapper: MemoryRouter });
  expect(screen.getByText('whoami')).toBeInTheDocument();
  // "Dami Thomas" appears in both the whoami line and the © line
  expect(screen.getAllByText(/Dami Thomas/).length).toBeGreaterThanOrEqual(1);
  expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/dvthomas01');
  expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Photography' })).toBeInTheDocument();
});
```

Run: `cd app && npx vitest run src/components/Footer` — Expected: FAIL.

- [ ] **Step 4: Implement `app/src/components/Footer.tsx`**

```tsx
import { Link } from 'react-router';
import { site } from '../data/site';

export function Footer() {
  return (
    <footer className="mt-20 grid gap-8 border-t border-line py-10 text-sm sm:grid-cols-3 dark:border-line-dark">
      <div>
        <p className="font-mono text-xs text-accent dark:text-accent-dark">whoami</p>
        {site.whoami.map((line) => (
          <p key={line} className="mt-1 text-ink/70 dark:text-ink-dark/70">{line}</p>
        ))}
        <p className="mt-4 font-mono text-xs text-ink/40 dark:text-ink-dark/40">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
      <nav aria-label="Pages">
        <p className="font-mono text-xs uppercase text-ink/40 dark:text-ink-dark/40">Pages</p>
        <ul className="mt-2 space-y-1">
          <li><Link to="/" className="hover:text-accent dark:hover:text-accent-dark">Home</Link></li>
          <li><Link to="/projects" className="hover:text-accent dark:hover:text-accent-dark">Projects</Link></li>
          <li><Link to="/photos" className="hover:text-accent dark:hover:text-accent-dark">Photos</Link></li>
        </ul>
      </nav>
      <nav aria-label="Elsewhere">
        <p className="font-mono text-xs uppercase text-ink/40 dark:text-ink-dark/40">Elsewhere</p>
        <ul className="mt-2 space-y-1">
          <li><a href={site.github} target="_blank" rel="noreferrer" className="hover:text-accent dark:hover:text-accent-dark">GitHub</a></li>
          <li><a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent dark:hover:text-accent-dark">LinkedIn</a></li>
          <li><a href={site.photography} target="_blank" rel="noreferrer" className="hover:text-accent dark:hover:text-accent-dark">Photography</a></li>
        </ul>
      </nav>
    </footer>
  );
}
```

- [ ] **Step 5: Write failing DirectoryListing test** — `app/src/components/DirectoryListing.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { DirectoryListing } from './DirectoryListing';

test('renders terminal directory entries and say-hi link', () => {
  render(<DirectoryListing />, { wrapper: MemoryRouter });
  expect(screen.getByText(/drwxr-xr-x dami/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /projects\// })).toHaveAttribute('href', '/projects');
  expect(screen.getByRole('link', { name: /photos\// })).toHaveAttribute('href', '/photos');
  expect(screen.getByRole('link', { name: /cv\.pdf/ })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /github/ })).toHaveAttribute('href', 'https://github.com/dvthomas01');
  expect(screen.getByRole('link', { name: /say hi/i })).toHaveAttribute('href', 'mailto:dvthomas@mit.edu');
});
```

Run: `cd app && npx vitest run src/components/DirectoryListing` — Expected: FAIL.

- [ ] **Step 6: Implement `app/src/components/DirectoryListing.tsx`**

```tsx
import { Link } from 'react-router';
import { site } from '../data/site';

const ROW = 'flex items-baseline gap-4 py-1 hover:text-accent dark:hover:text-accent-dark';

export function DirectoryListing() {
  const cvHref = `${import.meta.env.BASE_URL}${site.cvFile}`;
  return (
    <section className="bento font-mono text-sm">
      <p className="text-ink/40 dark:text-ink-dark/40">drwxr-xr-x dami {new Date().getFullYear()} ./</p>
      <nav className="mt-2">
        <Link to="/projects" className={ROW}>
          <span className="text-accent dark:text-accent-dark">d</span>
          <span>projects/</span>
          <span className="text-ink/40 dark:text-ink-dark/40">things I built</span>
        </Link>
        <Link to="/photos" className={ROW}>
          <span className="text-accent dark:text-accent-dark">d</span>
          <span>photos/</span>
          <span className="text-ink/40 dark:text-ink-dark/40">photography</span>
        </Link>
        <a href={cvHref} target="_blank" rel="noreferrer" className={ROW}>
          <span className="text-ink/40 dark:text-ink-dark/40">-</span>
          <span>cv.pdf</span>
          <span className="text-ink/40 dark:text-ink-dark/40">résumé</span>
        </a>
        <a href={site.github} target="_blank" rel="noreferrer" className={ROW}>
          <span className="text-ink/40 dark:text-ink-dark/40">-</span>
          <span>github</span>
          <span className="text-ink/40 dark:text-ink-dark/40">@dvthomas01</span>
        </a>
      </nav>
      <a
        href={`mailto:${site.email}`}
        className="mt-4 inline-block text-accent underline-offset-4 hover:underline dark:text-accent-dark"
      >
        Say hi →
      </a>
    </section>
  );
}
```

- [ ] **Step 7: Mount Nav + Footer in `app/src/root.tsx`** — replace the default export:

```tsx
export default function Root() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

Add imports at top of `root.tsx`:

```tsx
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
```

- [ ] **Step 8: Run all tests + build, commit**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app"
npm test && npm run build
cd .. && git add -A app/src
git commit -m "feat: nav, footer, and terminal directory-listing shell components"
```

---

### Task 7: Encrypted-text hook upgrade + Hero

**Files:**
- Modify: `app/src/hooks/useEncryptedText.ts`, `app/src/hooks/useEncryptedText.test.ts`
- Create: `app/src/components/Hero.tsx`, `app/src/components/Hero.test.tsx`

**Interfaces:**
- Consumes: existing `scramble`/`useEncryptedText` from Task 1; hero image `app/src/assets/profile/dami-grad.jpg` (Task 5).
- Produces: `useEncryptedText(target: string, opts?: { speed?: number }): string` — now SSR-safe and reduced-motion-aware (returns `target` immediately in both cases); `<Hero />` — bento row with decrypting headline card + photo card. Home route (Task 8) renders `<Hero />`.

- [ ] **Step 1: Add failing reduced-motion test** — append to `app/src/hooks/useEncryptedText.test.ts`

```ts
import { renderHook } from '@testing-library/react';
import { useEncryptedText } from './useEncryptedText';

test('renders target immediately when prefers-reduced-motion', () => {
  const original = window.matchMedia;
  window.matchMedia = ((query: string) => ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;

  const { result } = renderHook(() => useEncryptedText('hello world'));
  expect(result.current).toBe('hello world');

  window.matchMedia = original;
});
```

Run: `cd app && npx vitest run src/hooks` — Expected: new test FAILS (hook scrambles regardless).

- [ ] **Step 2: Upgrade `app/src/hooks/useEncryptedText.ts`** — replace whole file:

```ts
import { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$';

export function scramble(target: string, revealed: number): string {
  let out = '';
  for (let i = 0; i < target.length; i++) {
    if (i < revealed) out += target[i];
    else if (target[i] === ' ') out += ' ';
    else out += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return out;
}

function shouldSkipAnimation(): boolean {
  if (typeof window === 'undefined') return true; // SSR/prerender: emit real text
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useEncryptedText(target: string, opts: { speed?: number } = {}): string {
  const speed = opts.speed ?? 45;
  const skip = shouldSkipAnimation();
  const [revealed, setRevealed] = useState(0);
  const [text, setText] = useState(() => (skip ? target : scramble(target, 0)));

  useEffect(() => {
    if (skip) {
      setText(target);
      return;
    }
    setRevealed(0);
    setText(scramble(target, 0));
  }, [target, skip]);

  useEffect(() => {
    if (skip) return;
    if (revealed >= target.length) {
      setText(target);
      return;
    }
    const id = setInterval(() => {
      setRevealed((r) => {
        const next = Math.min(r + 1, target.length);
        setText(scramble(target, next));
        return next;
      });
    }, speed);
    return () => clearInterval(id);
  }, [revealed, target, speed, skip]);

  return text;
}
```

Run: `cd app && npx vitest run src/hooks` — Expected: ALL hook tests PASS.

- [ ] **Step 3: Write failing Hero test** — `app/src/components/Hero.test.tsx`

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import { Hero } from './Hero';

test('decrypts to the exact headline', async () => {
  render(<Hero />);
  await waitFor(
    () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Hello, I build machines and the software that drives them.',
      );
    },
    { timeout: 8000 },
  );
}, 10000);

test('renders the hero photo', () => {
  render(<Hero />);
  expect(screen.getByRole('img', { name: /dami thomas/i })).toBeInTheDocument();
});
```

Run: `cd app && npx vitest run src/components/Hero` — Expected: FAIL.

- [ ] **Step 4: Implement `app/src/components/Hero.tsx`**

```tsx
import type { ReactNode } from 'react';
import { useEncryptedText } from '../hooks/useEncryptedText';
import damiGrad from '../assets/profile/dami-grad.jpg';

const SEGMENTS = [
  { text: 'Hello, I build ' },
  { text: 'machines', className: 'font-bold' },
  { text: ' and the ' },
  { text: 'software', className: 'italic' },
  { text: ' that drives them.' },
] as const;

const FULL_TEXT = SEGMENTS.map((s) => s.text).join('');

export function Hero() {
  const text = useEncryptedText(FULL_TEXT, { speed: 25 });

  const parts = SEGMENTS.reduce<{ offset: number; nodes: ReactNode[] }>(
    (acc, segment, i) => {
      const slice = text.slice(acc.offset, acc.offset + segment.text.length);
      acc.nodes.push(
        <span key={i} className={'className' in segment ? segment.className : undefined}>
          {slice}
        </span>,
      );
      return { offset: acc.offset + segment.text.length, nodes: acc.nodes };
    },
    { offset: 0, nodes: [] },
  ).nodes;

  return (
    <section className="grid gap-4 md:grid-cols-[3fr_2fr]">
      <div className="bento flex items-center">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">{parts}</h1>
      </div>
      <div className="bento overflow-hidden p-0">
        <img
          src={damiGrad}
          alt="Dami Thomas at MIT"
          className="h-full max-h-96 w-full object-cover object-top transition-[filter] dark:brightness-90"
          loading="eager"
        />
      </div>
    </section>
  );
}
```

Note: `import type { ReactNode }` is needed if TS complains about `React.ReactNode` — use `import type { ReactNode } from 'react'` and `ReactNode[]` instead of `React.ReactNode[]`.

- [ ] **Step 5: Run tests + commit**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app"
npm test
cd .. && git add -A app/src
git commit -m "feat: reduced-motion-aware encrypted-text hook and decrypting hero"
```

---

### Task 8: Home page — experience card, skills strip, featured carousel, photo teaser

**Files:**
- Create: `app/src/components/ExperienceCard.tsx`, `app/src/components/ExperienceCard.test.tsx`, `app/src/components/FeaturedCarousel.tsx`, `app/src/components/FeaturedCarousel.test.tsx`, `app/src/components/PhotoTeaser.tsx`, `app/src/components/PhotoTeaser.test.tsx`
- Modify: `app/src/routes/home.tsx`

**Interfaces:**
- Consumes: `experience` + `skills` + `projects` + `photos` + `site` data (Tasks 4–5); `<Hero />` (Task 7); `<DirectoryListing />` (Task 6).
- Produces: `<ExperienceCard />` (timeline + skills strip), `<FeaturedCarousel />` (cycles `projects.filter(p => p.featured)`), `<PhotoTeaser />` (4 shots + photos link); assembled Home route.

- [ ] **Step 1: Write failing ExperienceCard test** — `app/src/components/ExperienceCard.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import { ExperienceCard } from './ExperienceCard';

test('renders all four industry entries with logos', () => {
  render(<ExperienceCard />);
  for (const company of ['National Instruments', 'Rockwell Automation', 'Nasdaq', 'Elinta Robotics']) {
    expect(screen.getByText(company)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: company })).toBeInTheDocument();
  }
});

test('renders the 16-skill mono strip', () => {
  render(<ExperienceCard />);
  expect(screen.getByText(/python · arduino/i)).toBeInTheDocument();
});
```

Run: `cd app && npx vitest run src/components/ExperienceCard` — Expected: FAIL.

- [ ] **Step 2: Implement `app/src/components/ExperienceCard.tsx`**

```tsx
import { experience } from '../data/experience';
import { skills } from '../data/skills';

export function ExperienceCard() {
  return (
    <section className="bento">
      <h2 className="font-mono text-xs uppercase tracking-widest text-accent dark:text-accent-dark">
        Experience
      </h2>
      <p className="mt-1 text-sm text-ink/60 dark:text-ink-dark/60">
        A few of the places I’ve contributed to.
      </p>
      <ul className="mt-6 divide-y divide-line dark:divide-line-dark">
        {experience.map((entry) => (
          <li key={entry.company} className="flex items-center gap-4 py-4">
            <img
              src={entry.logo}
              alt={entry.company}
              className="h-9 w-9 rounded-full border border-line bg-white object-contain p-1 dark:border-line-dark"
            />
            <span className="font-mono text-xs text-ink/50 dark:text-ink-dark/50">{entry.period}</span>
            <span className="ml-auto text-right">
              <span className="block font-medium">{entry.company}</span>
              <span className="block text-sm text-ink/60 dark:text-ink-dark/60">{entry.role}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-line pt-4 font-mono text-xs leading-relaxed text-ink/50 dark:border-line-dark dark:text-ink-dark/50">
        {skills.map((s) => s.name.toLowerCase()).join(' · ')}
      </p>
    </section>
  );
}
```

- [ ] **Step 3: Write failing FeaturedCarousel test** — `app/src/components/FeaturedCarousel.test.tsx`

```tsx
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { FeaturedCarousel } from './FeaturedCarousel';
import { projects } from '../data/projects';

const featured = projects.filter((p) => p.featured);

test('shows a featured project and advances on a timer', () => {
  vi.useFakeTimers();
  render(<FeaturedCarousel />, { wrapper: MemoryRouter });
  expect(screen.getByText(featured[0].title, { exact: false })).toBeInTheDocument();
  act(() => {
    vi.advanceTimersByTime(4000);
  });
  expect(screen.getByText(featured[1].title, { exact: false })).toBeInTheDocument();
  vi.useRealTimers();
});

test('links to the projects page', () => {
  render(<FeaturedCarousel />, { wrapper: MemoryRouter });
  expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '/projects');
});
```

Run: `cd app && npx vitest run src/components/FeaturedCarousel` — Expected: FAIL.

- [ ] **Step 4: Implement `app/src/components/FeaturedCarousel.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '../data/projects';

const INTERVAL_MS = 4000;
const featured = projects.filter((p) => p.featured);

export function FeaturedCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % featured.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPaused]);

  const current = featured[index];

  return (
    <section
      className="bento"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2 className="font-mono text-xs uppercase tracking-widest text-accent dark:text-accent-dark">
        Projects · {current.title}
      </h2>
      <p className="mt-1 text-sm text-ink/60 dark:text-ink-dark/60">{current.description}</p>
      <div className="mt-4 overflow-hidden rounded-xl border border-line dark:border-line-dark">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={current.id}
            src={current.thumbnail}
            alt={current.title}
            className="aspect-video w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1.5" aria-hidden="true">
          {featured.map((p, i) => (
            <span
              key={p.id}
              className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-accent dark:bg-accent-dark' : 'bg-line dark:bg-line-dark'}`}
            />
          ))}
        </div>
        <Link to="/projects" className="font-mono text-sm text-accent hover:underline dark:text-accent-dark">
          all projects →
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Write failing PhotoTeaser test** — `app/src/components/PhotoTeaser.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { PhotoTeaser } from './PhotoTeaser';

test('renders four teaser photos and a photos link', () => {
  render(<PhotoTeaser />, { wrapper: MemoryRouter });
  expect(screen.getAllByRole('img')).toHaveLength(4);
  expect(screen.getByRole('link', { name: /photos\/ →/ })).toHaveAttribute('href', '/photos');
});
```

Run: `cd app && npx vitest run src/components/PhotoTeaser` — Expected: FAIL.

- [ ] **Step 6: Implement `app/src/components/PhotoTeaser.tsx`**

```tsx
import { Link } from 'react-router';
import { photos } from '../data/photos';

// One representative shot per vibe: city, concert, grad, sports.
const TEASER_IDS = ['city-lisbon-01', 'concert-01', 'grad-com-03', 'sports-bm-04'];
const teaser = photos.filter((p) => TEASER_IDS.includes(p.id));

export function PhotoTeaser() {
  return (
    <section className="bento">
      <div className="flex items-baseline justify-between">
        <h2 className="font-mono text-xs uppercase tracking-widest text-accent dark:text-accent-dark">
          Photography
        </h2>
        <Link to="/photos" className="font-mono text-sm text-accent hover:underline dark:text-accent-dark">
          photos/ →
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {teaser.map((photo) => (
          <img
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="aspect-square w-full rounded-lg object-cover"
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Assemble `app/src/routes/home.tsx`**

```tsx
import { Hero } from '../components/Hero';
import { ExperienceCard } from '../components/ExperienceCard';
import { FeaturedCarousel } from '../components/FeaturedCarousel';
import { PhotoTeaser } from '../components/PhotoTeaser';
import { DirectoryListing } from '../components/DirectoryListing';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 pb-8">
      <Hero />
      <div className="grid gap-4 md:grid-cols-2">
        <ExperienceCard />
        <FeaturedCarousel />
      </div>
      <PhotoTeaser />
      <DirectoryListing />
    </div>
  );
}
```

- [ ] **Step 8: Run all tests + build, commit**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app"
npm test && npm run build
cd .. && git add -A app/src
git commit -m "feat: home page — experience timeline, featured carousel, photo teaser"
```

---

### Task 9: Projects page — filters, featured cards, archive

**Files:**
- Create: `app/src/lib/projectFilters.ts`, `app/src/lib/projectFilters.test.ts`, `app/src/components/ProjectCard.tsx`, `app/src/components/ProjectCard.test.tsx`
- Modify: `app/src/routes/projects.tsx`

**Interfaces:**
- Consumes: `projects`, `Project`, `ProjectKind` (Task 4).
- Produces: `type ProjectFilter = 'All' | ProjectKind`; `filterProjects(list: Project[], filter: ProjectFilter): Project[]` (sorted year desc); `countFor(list: Project[], filter: ProjectFilter): number`; `<ProjectCard project={p} />`; full Projects route.

- [ ] **Step 1: Write failing filter tests** — `app/src/lib/projectFilters.test.ts`

```ts
import { filterProjects, countFor, FILTERS } from './projectFilters';
import { projects } from '../data/projects';

test('All returns everything sorted by year desc', () => {
  const result = filterProjects(projects, 'All');
  expect(result).toHaveLength(projects.length);
  for (let i = 1; i < result.length; i++) {
    expect(result[i - 1].year).toBeGreaterThanOrEqual(result[i].year);
  }
});

test('Research filter returns exactly the 3 research entries', () => {
  expect(filterProjects(projects, 'Research')).toHaveLength(3);
});

test('counts add up per filter', () => {
  expect(countFor(projects, 'All')).toBe(projects.length);
  expect(countFor(projects, 'Research')).toBe(3);
  expect(countFor(projects, 'Hardware')).toBe(projects.filter((p) => p.tags.includes('Hardware')).length);
});

test('FILTERS covers all chips in order', () => {
  expect(FILTERS).toEqual(['All', 'Hardware', 'Software', 'Research']);
});
```

Run: `cd app && npx vitest run src/lib` — Expected: FAIL.

- [ ] **Step 2: Implement `app/src/lib/projectFilters.ts`**

```ts
import type { Project, ProjectKind } from '../data/types';

export type ProjectFilter = 'All' | ProjectKind;

export const FILTERS: ProjectFilter[] = ['All', 'Hardware', 'Software', 'Research'];

export function filterProjects(list: Project[], filter: ProjectFilter): Project[] {
  const matched = filter === 'All' ? list : list.filter((p) => p.tags.includes(filter));
  return [...matched].sort((a, b) => b.year - a.year);
}

export function countFor(list: Project[], filter: ProjectFilter): number {
  return filterProjects(list, filter).length;
}
```

Run: `cd app && npx vitest run src/lib` — Expected: PASS.

- [ ] **Step 3: Write failing ProjectCard test** — `app/src/components/ProjectCard.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/projects';

const ps70 = projects.find((p) => p.id === 'ps70')!;

test('renders title, year, tags, thumbnail, and external link', () => {
  render(<ProjectCard project={ps70} />);
  expect(screen.getByText('PS70 Portfolio')).toBeInTheDocument();
  expect(screen.getByText('2025')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'PS70 Portfolio' })).toBeInTheDocument();
  expect(screen.getByRole('link')).toHaveAttribute('href', 'https://dvthomas01.github.io/PS70_Portfolio/');
});
```

Run: `cd app && npx vitest run src/components/ProjectCard` — Expected: FAIL.

- [ ] **Step 4: Implement `app/src/components/ProjectCard.tsx`**

```tsx
import type { Project } from '../data/types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="bento group block transition-transform hover:-translate-y-0.5 hover:border-accent dark:hover:border-accent-dark"
    >
      <div className="flex items-baseline justify-between font-mono text-xs">
        <span className="text-accent dark:text-accent-dark"># {project.tags.join(' · ').toLowerCase()}</span>
        <span className="text-ink/40 dark:text-ink-dark/40">{project.year}</span>
      </div>
      <h3 className="mt-2 font-serif text-2xl">{project.title}</h3>
      <p className="mt-1 text-sm text-ink/60 dark:text-ink-dark/60">{project.description}</p>
      <div className="mt-4 overflow-hidden rounded-xl border border-line dark:border-line-dark">
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    </a>
  );
}
```

- [ ] **Step 5: Assemble `app/src/routes/projects.tsx`**

```tsx
import { useState } from 'react';
import { projects } from '../data/projects';
import { FILTERS, countFor, filterProjects, type ProjectFilter } from '../lib/projectFilters';
import { ProjectCard } from '../components/ProjectCard';

export default function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>('All');
  const visible = filterProjects(projects, filter);
  const featured = visible.filter((p) => p.featured);
  const archive = visible.filter((p) => !p.featured);

  return (
    <div className="pb-8">
      <h1 className="font-serif text-5xl">Projects.</h1>
      <p className="mt-2 text-ink/60 dark:text-ink-dark/60">
        Things I’ve built — robots, hardware, software, and research.
      </p>

      <div role="group" aria-label="Filter projects" className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
              filter === f
                ? 'border-accent text-accent dark:border-accent-dark dark:text-accent-dark'
                : 'border-line text-ink/60 hover:border-accent dark:border-line-dark dark:text-ink-dark/60 dark:hover:border-accent-dark'
            }`}
          >
            {f} · {countFor(projects, f)}
          </button>
        ))}
      </div>

      {featured.length > 0 && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}

      {archive.length > 0 && (
        <section className="mt-10">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/40 dark:text-ink-dark/40">
            Archive
          </p>
          <ul className="mt-3 divide-y divide-line dark:divide-line-dark">
            {archive.map((p) => (
              <li key={p.id}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3 hover:text-accent dark:hover:text-accent-dark"
                >
                  <span className="font-mono text-xs text-ink/40 dark:text-ink-dark/40">{p.year}</span>
                  <span className="font-medium">{p.title}</span>
                  <span className="text-sm text-ink/50 dark:text-ink-dark/50">{p.description}</span>
                  <span className="ml-auto font-mono text-xs text-accent dark:text-accent-dark">
                    {p.tags.join(' · ').toLowerCase()}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
```

- [ ] **Step 6: Run all tests + build, commit**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app"
npm test && npm run build
cd .. && git add -A app/src
git commit -m "feat: projects page with filter chips, featured cards, and archive list"
```

---

### Task 10: Photos page — category chips, masonry grid, lightbox, CTA

**Files:**
- Create: `app/src/components/Lightbox.tsx`, `app/src/components/Lightbox.test.tsx`
- Modify: `app/src/routes/photos.tsx`

**Interfaces:**
- Consumes: `photos`, `PHOTO_CATEGORIES`, `Photo`, `PhotoCategory` (Tasks 4–5).
- Produces: `<Lightbox photos={Photo[]} index={number} onClose={() => void} onNavigate={(nextIndex: number) => void} />`; full Photos route.

- [ ] **Step 1: Write failing Lightbox test** — `app/src/components/Lightbox.test.tsx`

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Lightbox } from './Lightbox';
import { photos } from '../data/photos';

test('shows current photo and navigates with arrow keys', () => {
  const onNavigate = vi.fn();
  const onClose = vi.fn();
  render(<Lightbox photos={photos} index={0} onClose={onClose} onNavigate={onNavigate} />);
  expect(screen.getByRole('img', { name: photos[0].alt })).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(onNavigate).toHaveBeenCalledWith(1);
  fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(onNavigate).toHaveBeenCalledWith(photos.length - 1);
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();
});

test('close button works', () => {
  const onClose = vi.fn();
  render(<Lightbox photos={photos} index={0} onClose={onClose} onNavigate={() => {}} />);
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(onClose).toHaveBeenCalled();
});
```

Run: `cd app && npx vitest run src/components/Lightbox` — Expected: FAIL.

- [ ] **Step 2: Implement `app/src/components/Lightbox.tsx`**

```tsx
import { useEffect, useRef } from 'react';
import type { Photo } from '../data/types';

interface LightboxProps {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

const SWIPE_THRESHOLD_PX = 40;

export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const count = photos.length;
  const photo = photos[index];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate((index + 1) % count);
      if (event.key === 'ArrowLeft') onNavigate((index - 1 + count) % count);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index, count, onClose, onNavigate]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta < -SWIPE_THRESHOLD_PX) onNavigate((index + 1) % count);
        if (delta > SWIPE_THRESHOLD_PX) onNavigate((index - 1 + count) % count);
        touchStartX.current = null;
      }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 font-mono text-2xl text-white/70 hover:text-white"
      >
        ×
      </button>
      <button
        type="button"
        aria-label="Previous photo"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index - 1 + count) % count);
        }}
        className="absolute left-4 hidden font-mono text-3xl text-white/70 hover:text-white sm:block"
      >
        ‹
      </button>
      <img
        src={photo.src}
        alt={photo.alt}
        className="max-h-full max-w-full rounded-lg object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        aria-label="Next photo"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index + 1) % count);
        }}
        className="absolute right-4 hidden font-mono text-3xl text-white/70 hover:text-white sm:block"
      >
        ›
      </button>
    </div>
  );
}
```

Run: `cd app && npx vitest run src/components/Lightbox` — Expected: PASS.

- [ ] **Step 3: Assemble `app/src/routes/photos.tsx`**

```tsx
import { useState } from 'react';
import { photos, PHOTO_CATEGORIES } from '../data/photos';
import type { PhotoCategory } from '../data/types';
import { site } from '../data/site';
import { Lightbox } from '../components/Lightbox';

type CategoryFilter = 'all' | PhotoCategory;

export default function Photos() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = category === 'all' ? photos : photos.filter((p) => p.category === category);

  return (
    <div className="pb-8">
      <h1 className="font-serif text-5xl">Photos.</h1>
      <p className="mt-2 text-ink/60 dark:text-ink-dark/60">
        A selection of my photography — cities, concerts, campus life, and more.
      </p>

      <div role="group" aria-label="Filter photos" className="mt-6 flex flex-wrap gap-2">
        {(['all', ...PHOTO_CATEGORIES] as CategoryFilter[]).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
              category === c
                ? 'border-accent text-accent dark:border-accent-dark dark:text-accent-dark'
                : 'border-line text-ink/60 hover:border-accent dark:border-line-dark dark:text-ink-dark/60 dark:hover:border-accent-dark'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-2 gap-4 md:columns-3">
        {visible.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="mb-4 block w-full overflow-hidden rounded-xl"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="w-full transition-transform duration-300 hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      <a
        href={site.photography}
        target="_blank"
        rel="noreferrer"
        className="bento mt-6 block text-center font-mono text-sm text-accent hover:border-accent dark:text-accent-dark dark:hover:border-accent-dark"
      >
        View the full gallery →
      </a>

      {lightboxIndex !== null && (
        <Lightbox
          photos={visible}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run all tests + build, commit**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app"
npm test && npm run build
cd .. && git add -A app/src
git commit -m "feat: photos page with category filters, masonry grid, and lightbox"
```

---

### Task 11: End-to-end tests + final verification

**Files:**
- Replace: `app/e2e/flow.spec.ts`

**Interfaces:**
- Consumes: the complete site from Tasks 1–10; Playwright config (Task 2) that builds + serves static output at `http://localhost:4173/Personal-Website/`.
- Produces: e2e coverage of the spec's critical flows on desktop + mobile.

- [ ] **Step 1: Replace `app/e2e/flow.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

const HEADLINE = 'Hello, I build machines and the software that drives them.';

test('home loads and hero decrypts to the exact headline', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(HEADLINE, { timeout: 15000 });
  await expect(page.getByText('dami@home:~$')).toBeVisible();
});

test('projects page filters work', async ({ page }) => {
  await page.goto('/projects/');
  await expect(page.getByRole('heading', { name: 'Projects.' })).toBeVisible();
  await page.getByRole('button', { name: /Research · 3/ }).click();
  await expect(page.getByText(/Fast Breaks Fast/)).toBeVisible();
  await expect(page.getByText('PS70 Portfolio')).toHaveCount(0);
});

test('photos lightbox opens, navigates, and closes', async ({ page }) => {
  await page.goto('/photos/');
  await expect(page.getByRole('heading', { name: 'Photos.' })).toBeVisible();
  await page.locator('.columns-2 button').first().click();
  const dialog = page.getByRole('dialog', { name: 'Photo viewer' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
});

test('theme toggle flips and persists across reload', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const wasDark = await html.evaluate((el) => el.classList.contains('dark'));
  await page.getByRole('button', { name: /toggle theme/i }).click();
  await expect(html).toHaveClass(wasDark ? /^(?!.*dark).*$/ : /dark/);
  await page.reload();
  const isDarkAfterReload = await html.evaluate((el) => el.classList.contains('dark'));
  expect(isDarkAfterReload).toBe(!wasDark);
});

test('prerendered projects HTML contains real content', async ({ request }) => {
  const res = await request.get('/Personal-Website/projects/');
  const body = await res.text();
  expect(body).toContain('Projects.');
});
```

- [ ] **Step 2: Run the full gate suite**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app"
npm test && npm run build && npm run e2e
```

Expected: all unit tests pass; build exit 0; all e2e tests pass on both desktop and mobile projects. Fix any failures before committing (adjust selectors, not behavior).

- [ ] **Step 3: Visual smoke via dev server**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website/app"
npm run dev
```

Open `http://localhost:5173/Personal-Website/` and verify by eye: hero decrypts, dark/light both look right, all three pages render, mobile viewport stacks correctly. Stop the server after.

- [ ] **Step 4: Commit**

```bash
cd "/Users/damithomas/Documents/Portfolio Website/Personal-Website"
git add -A app/
git commit -m "test: e2e coverage for hero, filters, lightbox, and theme persistence"
```

- [ ] **Step 5: Flag open items for Dami's review**

Report at the final review:
1. All `// VERIFY` project years in `app/src/data/projects.ts` need Dami's confirmation.
2. The 24 curated photos + 4 teaser picks are my selection — Dami may want to swap some.
3. Extra Display Screen media was offered — can be added to the featured card later.
4. Cutover (pointing GitHub Pages at the new app) remains a separate, user-gated decision.
