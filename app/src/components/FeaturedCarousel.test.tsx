import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { FeaturedCarousel } from './FeaturedCarousel';
import { projects } from '../data/projects';

const featured = projects.filter((p) => p.featured);

test('shows a featured project and advances on a timer', () => {
  vi.useFakeTimers();
  render(<FeaturedCarousel />, { wrapper: MemoryRouter });
  expect(screen.getByText(featured[0].title, { exact: false })).toBeInTheDocument();
  act(() => {
    vi.advanceTimersByTime(4000);
  });
  expect(screen.getByText(featured[1].title, { exact: false })).toBeInTheDocument();
  vi.useRealTimers();
});

test('links to the projects page', () => {
  render(<FeaturedCarousel />, { wrapper: MemoryRouter });
  expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '/projects');
});
