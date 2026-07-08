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
