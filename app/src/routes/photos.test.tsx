import { render, screen, fireEvent } from '@testing-library/react';
import Photos from './photos';

test('changing category closes an open lightbox (no stale index crash)', () => {
  render(<Photos />);
  // Open the lightbox on a photo (click the first photo to open lightbox)
  const photoButtons = screen.getAllByRole('button', { name: /^(Boston|Lisbon|Madrid|New York|Concert|Formal|Commencement|Graduation|Spring|Market|Boxing|Wrestling)/ });
  fireEvent.click(photoButtons[photoButtons.length - 1]); // Click last photo to set high index

  // Verify lightbox is open
  expect(screen.getByRole('dialog', { name: 'Photo viewer' })).toBeInTheDocument();

  // Switch to a category with fewer photos (concerts has only 3)
  const categoryButtons = screen.getAllByRole('button', { name: /^(all|cities|concerts|formal|grad|live-events|sports)$/ });
  const concertsButton = categoryButtons.find(btn => btn.textContent === 'concerts');
  fireEvent.click(concertsButton!);

  // Lightbox should be closed after changing category
  expect(screen.queryByRole('dialog', { name: 'Photo viewer' })).not.toBeInTheDocument();
});
