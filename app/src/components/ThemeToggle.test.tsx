import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

test('toggles the dark class on html without persisting a preference', async () => {
  render(<ThemeToggle />);
  const button = screen.getByRole('button', { name: /toggle theme/i });
  await userEvent.click(button);
  expect(document.documentElement).toHaveClass('dark');
  await userEvent.click(button);
  expect(document.documentElement).not.toHaveClass('dark');
  // Theme is session-only — nothing is written to storage.
  expect(localStorage.getItem('theme')).toBeNull();
});
