import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/projects';

const ps70 = projects.find((p) => p.id === 'ps70')!;
const autobot = projects.find((p) => p.id === 'autobot')!;

test('renders title, year, tags, thumbnail, and external link', () => {
  render(<ProjectCard project={ps70} />);
  expect(screen.getByText('PS70 Portfolio')).toBeInTheDocument();
  expect(screen.getByText('2025')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'PS70 Portfolio' })).toBeInTheDocument();
  expect(screen.getByRole('link')).toHaveAttribute('href', 'https://dvthomas01.github.io/PS70_Portfolio/');
});

test('links internally to the detail page when the project has one', () => {
  render(<ProjectCard project={autobot} />, { wrapper: MemoryRouter });
  expect(screen.getByRole('link')).toHaveAttribute('href', '/projects/autobot');
});

test('keeps an external, new-tab link when the project has no detail page', () => {
  render(<ProjectCard project={ps70} />);
  expect(screen.getByRole('link')).toHaveAttribute('href', 'https://dvthomas01.github.io/PS70_Portfolio/');
  expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
});
