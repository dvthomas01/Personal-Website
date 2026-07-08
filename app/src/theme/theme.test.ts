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
