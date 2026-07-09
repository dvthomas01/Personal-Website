import { projectDetails } from './projectDetails';
import { detailIds } from './detailIds';
import { projects } from './projects';

// TODO(task-5): once all 13 content files land, assert
// `Object.keys(projectDetails).sort()` equals `[...detailIds].sort()`.
// Until then only autobot, comp-robot, glasslamp, launcher, and fmab exist,
// so we assert containment, not full coverage.
test('every projectDetails key is one of the 13 detailIds', () => {
  for (const key of Object.keys(projectDetails)) {
    expect(detailIds).toContain(key);
  }
});

test('the four hardware projects from Task 3 have content', () => {
  for (const id of ['comp-robot', 'glasslamp', 'launcher', 'fmab']) {
    expect(projectDetails[id]).toBeDefined();
  }
});

test('every projectDetails key matches a real project id', () => {
  const projectIds = projects.map((p) => p.id);
  for (const key of Object.keys(projectDetails)) {
    expect(projectIds).toContain(key);
  }
});

test('every video block has a poster', () => {
  for (const detail of Object.values(projectDetails)) {
    for (const block of detail.blocks) {
      if (block.type === 'video') {
        expect(block.poster).toBeTruthy();
      }
    }
  }
});

test('every gallery block is non-empty', () => {
  for (const detail of Object.values(projectDetails)) {
    for (const block of detail.blocks) {
      if (block.type === 'gallery') {
        expect(block.images.length).toBeGreaterThan(0);
      }
    }
  }
});
