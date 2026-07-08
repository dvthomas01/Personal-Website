import { render, screen } from '@testing-library/react';
import { ExperienceCard } from './ExperienceCard';

test('renders all four industry entries with logos', () => {
  render(<ExperienceCard />);
  for (const company of ['National Instruments', 'Rockwell Automation', 'Nasdaq', 'Elinta Robotics']) {
    expect(screen.getByText(company)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: company })).toBeInTheDocument();
  }
});

test('renders the 16-skill mono strip', () => {
  render(<ExperienceCard />);
  expect(screen.getByText(/python · arduino/i)).toBeInTheDocument();
});
