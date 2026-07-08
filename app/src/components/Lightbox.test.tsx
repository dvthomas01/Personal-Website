import { render, screen, fireEvent } from '@testing-library/react';
import { Lightbox } from './Lightbox';
import { photos } from '../data/photos';

test('shows current photo and navigates with arrow keys', () => {
  const onNavigate = vi.fn();
  const onClose = vi.fn();
  render(<Lightbox photos={photos} index={0} onClose={onClose} onNavigate={onNavigate} />);
  expect(screen.getByRole('img', { name: photos[0].alt })).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(onNavigate).toHaveBeenCalledWith(1);
  fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(onNavigate).toHaveBeenCalledWith(photos.length - 1);
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();
});

test('close button works', () => {
  const onClose = vi.fn();
  render(<Lightbox photos={photos} index={0} onClose={onClose} onNavigate={() => {}} />);
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(onClose).toHaveBeenCalled();
});
