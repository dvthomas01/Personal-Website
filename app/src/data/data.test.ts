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

test("PS70 links to Dami's own portfolio, not the course page", () => {
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
