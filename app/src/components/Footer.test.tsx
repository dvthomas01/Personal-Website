import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Footer } from './Footer';

test('renders whoami block and elsewhere links', () => {
  render(<Footer />, { wrapper: MemoryRouter });
  expect(screen.getByText('whoami')).toBeInTheDocument();
  // "Dami Thomas" appears in both the whoami line and the © line
  expect(screen.getAllByText(/Dami Thomas/).length).toBeGreaterThanOrEqual(1);
  expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/dvthomas01');
  expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Photography' })).toBeInTheDocument();
});
