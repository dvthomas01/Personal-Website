// react-router's prerenderer nests HTML under the basename directory
// (build/client/Personal-Website/) while Vite assets stay at the client root.
// GitHub Pages serves the artifact root AT /Personal-Website/, so the nested
// HTML must be flattened into the client root before upload.
import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const clientDir = 'build/client';
const nested = join(clientDir, 'Personal-Website');

if (!existsSync(nested)) {
  console.error(`flatten-prerender: ${nested} not found — did the basename change?`);
  process.exit(1);
}

// Refuse to silently merge a prerendered route over Vite output (e.g. a route
// named "assets"). index.html is allowed through: the prerendered page must
// win over any SPA-fallback index.html at the root.
for (const entry of readdirSync(nested)) {
  if (entry !== 'index.html' && existsSync(join(clientDir, entry))) {
    console.error(`flatten-prerender: collision on "${entry}" between a prerendered route and the client root`);
    process.exit(1);
  }
}

cpSync(nested, clientDir, { recursive: true });
rmSync(nested, { recursive: true });
