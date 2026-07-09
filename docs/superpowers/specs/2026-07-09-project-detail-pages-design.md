# Project Detail Pages (Phase B)

> Spec date: 2026-07-09
> Status: Approved by Dami (mockup reviewed: claude.ai/code/artifact/30194267-eed8-48d6-9567-295b787430c0)
> Extends: `2026-07-08-portfolio-redesign-design.md` (which marked detail pages out of scope)

## Why now

At cutover, GitHub Pages serves only the new app. The 13 projects that link to
legacy `/hardware/...` and `/software/...` pages would have dead links. Those
pages must be rebuilt inside the app, in the new design, before going live.

## Scope

13 in-app pages at `/projects/<id>/`, prerendered to static HTML:
autobot, comp-robot (2.S007), glasslamp, launcher (2.00b), fmab,
chess, nba, waldo, dictionary, lecture-note, deck, pacman, fitclassifier.

NOT in scope: PS70 Portfolio, Customizable Display Screen, and the 3 research
entries keep their external links. No new projects (the CV's Semantic
Navigation Robot stays off the site for now).

## Template (per approved mockup)

Top to bottom, inside the existing site shell (Nav + Footer):
1. Mono breadcrumb: `~/projects / <id>` — `~/projects` links to /projects.
2. Meta line `# <tags> · <year>`, serif H1 title, one-line summary.
3. Tech chips (mono pills, non-interactive): the legacy pages' tech buttons
   (arduino, cad, waterjet, python, ...) lowercased.
4. Content blocks in order, from a typed content file per project:
   - `video`: bento frame, `controls preload="none"` with a poster image,
     so nothing heavy loads until clicked.
   - `image`: single image with optional caption.
   - `bullets`: heading + list, green `>` markers.
   - `text`: heading + paragraphs, max-width ~42rem.
   - `gallery`: grid of images (2 cols mobile / 3 desktop) that open in the
     SAME Lightbox component the Photos page uses.
5. Prev/next pager (mono, accent links) cycling through the 13 detail
   projects in the projects-page order, plus the breadcrumb for "all".

## Content model

```ts
type DetailBlock =
  | { type: 'text'; heading?: string; paragraphs: string[] }
  | { type: 'bullets'; heading?: string; items: string[] }
  | { type: 'video'; src: string; poster: string; caption?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'gallery'; heading?: string; images: { src: string; alt: string }[] };

interface ProjectDetail {
  id: string;          // must match a Project id
  tech: string[];      // chip labels
  blocks: DetailBlock[];
}
```

One content file per project under `app/src/data/projects/<id>.ts`, aggregated
by `app/src/data/projectDetails.ts`.

## Content migration rules

- Text and bullets carry over from the legacy HTML, lightly humanized
  (no em dashes, no noun-pile fragments); meaning never changes and no
  facts are invented.
- Media moves to `app/public/projects/<id>/` and is referenced via
  `import.meta.env.BASE_URL`. Videos keep original quality; posters come
  from each project's existing still image. HEIC files are skipped (their
  JPG twins migrate). Stray `.txt` prompt files do not migrate.
- comp-robot: 2.S007's page text + comp_robot's media (video + pic).
- launcher (2.00b): thin legacy text; a short factual summary written from
  the page and images, flagged for Dami's review.
- fitclassifier + deck: full long-form migration (sections + galleries).

## Card linking

The 13 projects' cards and archive rows navigate internally (client `Link`
to `/projects/<id>/`) instead of `href` to legacy pages. External-link
projects (PS70, led-display, research ×3) are unchanged. The autobot card
description is corrected to match the real project (Arduino maze robot with
IMU/encoders/line tracking, PID and bang-bang control, ultrasound obstacle
detection) — the ROS 2 wording described a different project.

## Prerender & tests

- All 13 routes added to the prerender list (data-driven, not hand-listed).
- Unit: every ProjectDetail id matches a Project id; every internal project
  has a detail; block invariants (video has poster, gallery non-empty).
- E2E: card click navigates to a detail page with real content; prerendered
  detail HTML contains project text; lightbox opens from a detail gallery.
