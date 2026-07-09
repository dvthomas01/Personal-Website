import { render, screen } from '@testing-library/react';
import { ResearchCard } from './ResearchCard';
import { projects } from '../data/projects';

const research = projects.filter((p) => p.tags.includes('Research'));

test('renders every research entry as an external link', () => {
  render(<ResearchCard />);
  expect(research.length).toBeGreaterThan(0);
  for (const entry of research) {
    const link = screen.getByRole('link', { name: new RegExp(entry.title.slice(0, 30)) });
    expect(link).toHaveAttribute('href', entry.href);
    expect(link).toHaveAttribute('target', '_blank');
  }
});
