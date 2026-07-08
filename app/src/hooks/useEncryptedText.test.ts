import { renderHook } from '@testing-library/react';
import { scramble, useEncryptedText } from './useEncryptedText';

test('keeps revealed prefix and preserves length', () => {
  const out = scramble('hello world', 3);
  expect(out.startsWith('hel')).toBe(true);
  expect(out).toHaveLength('hello world'.length);
});

test('preserves spaces in unrevealed region', () => {
  const out = scramble('ab cd', 0);
  expect(out[2]).toBe(' ');
});

test('fully revealed equals target', () => {
  expect(scramble('done', 4)).toBe('done');
});

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
