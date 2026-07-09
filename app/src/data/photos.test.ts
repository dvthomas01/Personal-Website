import { photos, PHOTO_CATEGORIES } from './photos';

test('24 photos drawn from the chosen categories, none dominating', () => {
  expect(photos).toHaveLength(24);
  const counts = new Map<string, number>();
  for (const p of photos) {
    expect(PHOTO_CATEGORIES).toContain(p.category);
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  }
  // Snippet gallery pulls from cities, concerts, grad, live-events, sports.
  expect([...counts.keys()].sort()).toEqual(
    ['cities', 'concerts', 'grad', 'live-events', 'sports'].sort(),
  );
  // Balanced mix: no category takes over the grid. Cities run widest (many
  // different cities), so the cap sits at 9; everything else stays under it.
  for (const count of counts.values()) {
    expect(count).toBeLessThanOrEqual(9);
  }
});

test('every photo has src and alt', () => {
  for (const p of photos) {
    expect(p.src).toBeTruthy();
    expect(p.alt).toBeTruthy();
  }
});
