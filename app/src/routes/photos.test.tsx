import { render, screen, fireEvent } from '@testing-library/react';
import Photos from './photos';
import { photos } from '../data/photos';

test('renders the full snippet gallery with no filter chips', () => {
  render(<Photos />);
  // Every photo is shown; there is no filtering UI anymore.
  expect(screen.getAllByRole('img')).toHaveLength(photos.length);
  expect(screen.queryByRole('group', { name: /filter/i })).not.toBeInTheDocument();
});

test('clicking a photo opens the lightbox and Escape closes it', () => {
  render(<Photos />);
  fireEvent.click(screen.getByRole('button', { name: photos[0].alt }));
  expect(screen.getByRole('dialog', { name: 'Photo viewer' })).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('links out to the full gallery', () => {
  render(<Photos />);
  expect(screen.getByRole('link', { name: /view the full gallery/i })).toHaveAttribute(
    'href',
    expect.stringContaining('vercel.app'),
  );
});
