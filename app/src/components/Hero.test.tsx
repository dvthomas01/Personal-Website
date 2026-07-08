import { render, screen, waitFor } from '@testing-library/react';
import { Hero } from './Hero';

test('decrypts to the exact headline', async () => {
  render(<Hero />);
  await waitFor(
    () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Hello, I build machines and the software that drives them.',
      );
    },
    { timeout: 8000 },
  );
}, 10000);

test('renders the hero photo', () => {
  render(<Hero />);
  expect(screen.getByRole('img', { name: /dami thomas/i })).toBeInTheDocument();
});
