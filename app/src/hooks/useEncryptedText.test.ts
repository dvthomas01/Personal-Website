import { scramble } from './useEncryptedText';

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
