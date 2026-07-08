import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

test('toggles dark class on html and persists choice', async () => {
  render(<ThemeToggle />);
  const button = screen.getByRole('button', { name: /toggle theme/i });
  await userEvent.click(button);
  expect(document.documentElement).toHaveClass('dark');
  expect(localStorage.getItem('theme')).toBe('dark');
  await userEvent.click(button);
  expect(document.documentElement).not.toHaveClass('dark');
  expect(localStorage.getItem('theme')).toBe('light');
});
