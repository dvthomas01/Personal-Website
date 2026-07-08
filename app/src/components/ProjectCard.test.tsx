import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/projects';

const ps70 = projects.find((p) => p.id === 'ps70')!;

test('renders title, year, tags, thumbnail, and external link', () => {
  render(<ProjectCard project={ps70} />);
  expect(screen.getByText('PS70 Portfolio')).toBeInTheDocument();
  expect(screen.getByText('2025')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'PS70 Portfolio' })).toBeInTheDocument();
  expect(screen.getByRole('link')).toHaveAttribute('href', 'https://dvthomas01.github.io/PS70_Portfolio/');
});
