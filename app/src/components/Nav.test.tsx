import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Nav } from './Nav';

test('renders terminal logo and page links', () => {
  render(<Nav />, { wrapper: MemoryRouter });
  expect(screen.getByText(/dami@home:~\$/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
  expect(screen.getByRole('link', { name: 'Photos' })).toHaveAttribute('href', '/photos');
  expect(screen.getByRole('link', { name: 'CV' })).toHaveAttribute('href', expect.stringContaining('Dami_Thomas_CV_Labs.pdf'));
  expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
});
