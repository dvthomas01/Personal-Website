# Project Detail Pages (Phase B) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the 13 legacy project pages as prerendered in-app pages at `/projects/<id>/` per spec `docs/superpowers/specs/2026-07-09-project-detail-pages-design.md`, so no project link dies at cutover.

**Architecture:** A single `ProjectDetailPage` template renders typed content files (`app/src/data/projects/<id>.ts`). A shared `detailIds` list drives the route prerender list, the pager order, and the "internal vs external" card decision. Media lives in `app/public/media/<id>/` (NOT `public/projects/` — that top-level name would collide with the prerendered `projects/*` HTML in the flatten step and trip the collision guard in `scripts/flatten-prerender.mjs`).

**Tech Stack:** unchanged (React Router 7 framework mode, prerender, Vite 7, Tailwind 3, Vitest, Playwright).

## Global Constraints

- Branch `redesign` only. NEVER modify the legacy source pages (`hardware/`, `software/`, root `index.html`, `style.css`, `images/`) — they are read-only migration sources until cutover.
- Media destination is `app/public/media/<id>/` — never `app/public/projects/`.
- Videos: copy originals unchanged; every `video` block has `controls preload="none"` and a `poster`. Posters and images: process with `sips --resampleHeightWidthMax 1200 -s format jpeg -s formatOptions 80` (PNG diagrams/screenshots may stay PNG at original size if under ~500 KB). Skip `.HEIC` files (JPG twins exist) and `.txt` files.
- Public assets are referenced `${import.meta.env.BASE_URL}media/<id>/<file>` — never a hardcoded `/Personal-Website/` prefix.
- Migrated text: meaning identical to the legacy page, lightly humanized (no em dashes, no noun-pile fragments, no invented facts). Tech chips = the legacy page's tech buttons, lowercased.
- `verbatimModuleSyntax` on → `import type { X }` for type-only imports. All code SSR-safe.
- TDD: failing test first for every component/data deliverable. Build gate: `cd app && npm test && npm run build`. E2E gate at the end: `npm run e2e`.
- Commit format `<type>: <description>`.

---

### Task 1: Content model, detail route, template — proven with autobot

**Files:**
- Create: `app/src/data/detailIds.ts`, `app/src/data/projectDetails.ts`, `app/src/data/projects/autobot.ts`, `app/src/data/projectDetails.test.ts`, `app/src/routes/project-detail.tsx`, `app/src/components/DetailBlocks.tsx`, `app/src/components/DetailBlocks.test.tsx`
- Modify: `app/src/data/types.ts`, `app/src/routes.ts`, `app/react-router.config.ts`
- Media: `app/public/media/autobot/` (video + poster)

**Interfaces:**
- Consumes: `Project`/`projects` from Task-0 state; `.bento` class; `Lightbox` (existing).
- Produces (later tasks rely on these exact names):
  - `types.ts`: `DetailBlock` union + `interface ProjectDetail { id: string; tech: string[]; blocks: DetailBlock[] }` exactly as in the spec.
  - `detailIds.ts`: `export const detailIds = ['ps70-placeholder-no'…]` — actually: `export const detailIds: string[] = ['autobot', 'comp-robot', 'glasslamp', 'launcher', 'fmab', 'chess', 'nba', 'waldo', 'dictionary', 'lecture-note', 'deck', 'pacman', 'fitclassifier'];` (plain strings, no asset imports — importable from `react-router.config.ts`).
  - `projectDetails.ts`: `export const projectDetails: Record<string, ProjectDetail>` (spreads per-project files; until Tasks 3–5 land, only `autobot` — the unit test asserting full coverage is written `test.each(detailIds)` and till then SKIPS missing ids with `expect.soft`? NO — keep it strict per current content: test asserts every KEY of projectDetails is in detailIds and matches a Project id; the "all 13 present" assertion lands in Task 5's step when migration completes. Document this in the test with a TODO(task-5) comment.)
  - Route `projects/:id` renders `ProjectDetailPage`; unknown id renders a mono "not found" line with a link back (no crash).
  - `DetailBlocks.tsx`: `export function DetailBlocks({ blocks }: { blocks: DetailBlock[] })` rendering all five block types per the mockup (video bento frame, `>`-marker bullets, serif H2 text sections, single image with mono caption, gallery grid wired to the existing `Lightbox`).

- [ ] **Step 1: types + failing data/component tests** (write `projectDetails.test.ts` asserting: every projectDetails key ∈ detailIds; every key matches a `projects` id; every video block has a poster; every gallery non-empty. Write `DetailBlocks.test.tsx` rendering one of each block and asserting: video has `preload="none"` + poster attr; bullets render items; gallery images render as buttons that open a dialog on click.) Run: fail.
- [ ] **Step 2: implement types.ts additions, detailIds.ts, DetailBlocks.tsx** (styling mirrors the approved mockup: `.bento` frames, mono captions `text-xs text-ink/40`, serif `text-2xl` section headings, `>` bullet markers in accent via `before:` or a flex span — match ProjectCard/site conventions).
- [ ] **Step 3: migrate autobot content + media**
```bash
mkdir -p app/public/media/autobot
cp hardware/autobot/autobot-vid.mp4 app/public/media/autobot/autobot-vid.mp4
sips --resampleHeightWidthMax 1200 -s format jpeg -s formatOptions 80 hardware/autobot/autobot-pic.jpeg --out app/public/media/autobot/poster.jpg
```
`app/src/data/projects/autobot.ts` (exact content):
```ts
import type { ProjectDetail } from '../types';

const BASE = `${import.meta.env.BASE_URL}media/autobot/`;

export const autobot: ProjectDetail = {
  id: 'autobot',
  tech: ['arduino', 'cad', 'waterjet'],
  blocks: [
    { type: 'video', src: `${BASE}autobot-vid.mp4`, poster: `${BASE}poster.jpg`, caption: 'demo · maze and line-tracking runs' },
    {
      type: 'bullets',
      heading: 'What I built',
      items: [
        'Built and programmed an Arduino robot that navigates using IMU, encoder, and line-tracking sensor readings.',
        'Used PID and bang-bang control to maneuver through mazes and line-tracking maps.',
        'Added an ultrasound sensor for object detection and dynamic path adjustment.',
      ],
    },
  ],
};
```
- [ ] **Step 4: route + prerender.** `routes.ts` adds `route('projects/:id', 'routes/project-detail.tsx')`. `react-router.config.ts`: `import { detailIds } from './src/data/detailIds'` and `prerender: ['/', '/projects', '/photos', ...detailIds.map((id) => `/projects/${id}`)]`. `project-detail.tsx` uses `useParams()`; renders breadcrumb (`~/projects / <id>`, `~/projects` → Link to /projects), meta line, serif title, summary (= the matching `Project.description`), chips, `<DetailBlocks/>`, pager (prev/next through `detailIds` order, wrapping, showing project titles).
- [ ] **Step 5: gates + verify prerender output** — `npm test && npm run build`; `ls build/client/projects/autobot/index.html` exists; `grep -c "bang-bang" build/client/projects/autobot/index.html` ≥ 1. NOTE: 12 of 13 prerender paths render the not-found state until Tasks 3–5 — that is expected and fine (they still emit HTML); confirm build doesn't error on them.
- [ ] **Step 6: commit** `feat: project detail template, content model, and autobot page`

### Task 2: Cards link internally; autobot description corrected

**Files:**
- Modify: `app/src/components/ProjectCard.tsx` (+test), `app/src/routes/projects.tsx`, `app/src/components/FeaturedCarousel.tsx`, `app/src/data/projects.ts`, `app/src/data/data.test.ts`

**Interfaces:** consumes `detailIds` to decide internal vs external. Produces: `ProjectCard` renders a react-router `Link to={'/projects/'+id}` when `detailIds.includes(project.id)`, else the existing external `<a>`; archive rows in `projects.tsx` do the same; the carousel's whole-card link target for detail-backed projects is `/projects/<id>` (keep the "all projects →" link as is).

- [ ] Step 1: failing tests — ProjectCard renders internal href `/projects/autobot` for autobot and external for ps70; data test asserts autobot description mentions Arduino (not ROS).
- [ ] Step 2: implement. New autobot description (exact): `An Arduino robot that finds its way through mazes and line-tracking courses, adjusting when something gets in the way.` Keep `href` field on the 13 for now (unused by cards once internal; harmless).
- [ ] Step 3: gates + commit `feat: project cards route to in-app detail pages`

### Task 3: Migrate hardware projects — comp-robot, glasslamp, launcher, fmab

**Files:** create `app/src/data/projects/{comp-robot,glasslamp,launcher,fmab}.ts`; media to `app/public/media/<id>/`; register in `projectDetails.ts`.

Sources (read each fully; text carries over lightly humanized):
- comp-robot: text `hardware/2.s007/2.s007.html`; media `hardware/comp_robot/comp-robot-vid.mp4` + `comp-robot-pic.jpeg` (poster). Tech buttons from that page.
- glasslamp: `hardware/glasslamp/lamp.html`; `glasslamp-vid.mp4` + `glasslamp-pic.jpeg`.
- launcher: `hardware/2.00b/2.00b.html`; images `2.00b-project-pic.jpg`, `2.00b-project-pic2.jpg`, `2.00b-pic3.png` (no video — use image + gallery blocks). Thin text: write a short factual summary strictly from the page + CV context (2.00b = MIT toy design class); flag in report for Dami's review.
- fmab: `hardware/fmab_mirror/fmab_mirror.html`; jpgs `demo_1.jpg`, `demo_2.jpg`, `demo_3.jpg` (skip HEIC), `adobe_illustrator_design.png` — gallery block; skip `.txt` files.

- [ ] Per project: failing coverage assertion (extend `projectDetails.test.ts` expected-ids list), migrate media (videos `cp`, images via sips per constraints), write content file, register, test green.
- [ ] Gates + spot-check one page in prerendered output (`grep` a distinctive phrase). Commit `feat: hardware project detail pages`.

### Task 4: Migrate simple software projects — chess, nba, waldo, dictionary, lecture-note, pacman

**Files:** create `app/src/data/projects/{chess,nba,waldo,dictionary,lecture-note,pacman}.ts`; media; register.

Sources: `software/chess/chess.html` (+`chess-vid.mp4`, poster `chess-pic.png`), `software/nba/nba.html` (+`chatbot-vid.mp4`, poster `chatbot-pic.png`), `software/waldo/waldo.html` (no video; images `waldo-pic.png`, `waldo-train-pic.png`), `software/dictionary/dictionary.html` (+`dictionary-vid.mp4`, poster `dictionary-pic.png`), `software/Lecture_Note/Lecture_Note.html` (+`RAG_PDF_vid.mp4`, poster `RAG_PDF_pic.JPEG` → jpeg), `software/pacman/pacman.html` (+`pacman-bot-vid.mp4`, poster `pacman-pic.png`).

- [ ] Same TDD loop as Task 3. Gates + commit `feat: software project detail pages`.

### Task 5: Long-form migrations — fitclassifier, deck; full-coverage test

**Files:** create `app/src/data/projects/{fitclassifier,deck}.ts`; media; register; tighten `projectDetails.test.ts` to assert ALL 13 detailIds have details (remove the TODO(task-5) allowance).

Sources:
- fitclassifier: `software/fitclassifier/fitclassifier.html` (677 lines: Overview / System Architecture / Key Features / Performance Analysis). Media from `software/fitclassifier/project_demo/`: `project_demo_vid.mp4` (poster `PROJECT_DEMO_PHOTO.png` or `fitclassifier-pic.png`), feature screenshots (`search_results_*.jpg`, `fitclassifier_ex_1.png`, `outfit*.{jpeg,avif}` — avif copies as-is), performance charts as a gallery (`confusion_matrix_normalized.png`, `PR_curve.png`, `F1_curve.png`, `train_instances_distribution-1.png`, `val_batch0_labels.jpg`, `labels_correlogram.jpg`). Skip `.txt`.
- deck: `software/deck_builder/deck-builder-project.html` (410 lines; ignore the stray `Deck_Builder.html`). Media: `deck-vid.mp4` (poster `deck-pic.jpg`), gallery `deck_builder_chatbot.png`, `Tornado Dragon API response.png` → rename copy to `tornado-dragon-api.png` (no spaces in public paths).

- [ ] TDD loop; long-form text uses `text` blocks with serif headings mirroring the legacy sections. Gates + commit `feat: long-form detail pages for FitClassifier and deck builder`.

### Task 6: E2E + full verification

**Files:** modify `app/e2e/flow.spec.ts` (append; existing 5 tests unchanged).

- [ ] Append e2e (relative `goto` style):
```ts
test('project card opens the in-app detail page', async ({ page }) => {
  await page.goto('./projects/');
  await page.getByRole('link', { name: /Autonomous Navigation Robot/ }).click();
  await expect(page).toHaveURL(/\/projects\/autobot/);
  await expect(page.getByRole('heading', { name: 'Autonomous Navigation Robot' })).toBeVisible();
  await expect(page.getByText(/bang-bang control/i)).toBeVisible();
});

test('prerendered detail HTML contains real content', async ({ request }) => {
  const res = await request.get('/Personal-Website/projects/fitclassifier/');
  expect(await res.text()).toContain('FitClassifier');
});

test('detail gallery opens the lightbox', async ({ page }) => {
  await page.goto('./projects/fitclassifier/');
  await page.locator('main button:has(img)').first().click();
  await expect(page.getByRole('dialog', { name: 'Photo viewer' })).toBeVisible();
});
```
(Adapt selectors to the real DOM if needed — adjust selectors, not behavior.)
- [ ] Full gates: `npm test && npm run build && npm run e2e` all green. Verify all 13 `build/client/projects/<id>/index.html` exist and none contain the not-found text. Report `du -sh app/public/media` and `build/client` total.
- [ ] Commit `test: e2e coverage for project detail pages`

## Self-review notes
- Flatten-collision risk: media served from `public/media/` avoids the `projects/` top-level merge collision — verified against `scripts/flatten-prerender.mjs` semantics.
- `react-router.config.ts` imports `./src/data/detailIds` (plain strings, no Vite asset imports) — safe under vite-node.
- Not-found state keeps prerender resilient mid-plan (Tasks 1–4 emit placeholder HTML for unmigrated ids; Task 5 closes coverage and the test tightens).
