import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { PhotoTeaser } from './PhotoTeaser';

test('renders four teaser photos and a photos link', () => {
  render(<PhotoTeaser />, { wrapper: MemoryRouter });
  expect(screen.getAllByRole('img')).toHaveLength(4);
  expect(screen.getByRole('link', { name: /photos\/ →/ })).toHaveAttribute('href', '/photos');
});
