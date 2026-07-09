import { render, screen, fireEvent } from '@testing-library/react';
import { DetailBlocks } from './DetailBlocks';
import type { DetailBlock } from '../data/types';

const blocks: DetailBlock[] = [
  { type: 'video', src: '/vid.mp4', poster: '/poster.jpg', caption: 'demo caption' },
  { type: 'bullets', heading: 'What I built', items: ['first bullet', 'second bullet'] },
  { type: 'text', heading: 'Background', paragraphs: ['paragraph one.'] },
  { type: 'image', src: '/pic.jpg', alt: 'a single picture', caption: 'pic caption' },
  {
    type: 'gallery',
    heading: 'Gallery',
    images: [
      { src: '/g1.jpg', alt: 'gallery photo one' },
      { src: '/g2.jpg', alt: 'gallery photo two' },
    ],
  },
];

test('renders a video block with preload="none" and a poster', () => {
  render(<DetailBlocks blocks={blocks} />);
  const video = document.querySelector('video');
  expect(video).toHaveAttribute('preload', 'none');
  expect(video).toHaveAttribute('poster', '/poster.jpg');
});

test('renders bullets block items', () => {
  render(<DetailBlocks blocks={blocks} />);
  expect(screen.getByText('What I built')).toBeInTheDocument();
  expect(screen.getByText('first bullet')).toBeInTheDocument();
  expect(screen.getByText('second bullet')).toBeInTheDocument();
});

test('renders text block heading and paragraphs', () => {
  render(<DetailBlocks blocks={blocks} />);
  expect(screen.getByText('Background')).toBeInTheDocument();
  expect(screen.getByText('paragraph one.')).toBeInTheDocument();
});

test('renders image block', () => {
  render(<DetailBlocks blocks={blocks} />);
  expect(screen.getByRole('img', { name: 'a single picture' })).toBeInTheDocument();
  expect(screen.getByText('pic caption')).toBeInTheDocument();
});

test('gallery images render as buttons that open the lightbox dialog on click', () => {
  render(<DetailBlocks blocks={blocks} />);
  const button = screen.getByRole('button', { name: 'gallery photo one' });
  fireEvent.click(button);
  expect(screen.getByRole('dialog', { name: 'Photo viewer' })).toBeInTheDocument();
});
