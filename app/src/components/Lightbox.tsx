import { useEffect, useRef } from 'react';
import type { Photo } from '../data/types';

interface LightboxProps {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

const SWIPE_THRESHOLD_PX = 40;

export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const count = photos.length;
  const photo = photos[index];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate((index + 1) % count);
      if (event.key === 'ArrowLeft') onNavigate((index - 1 + count) % count);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index, count, onClose, onNavigate]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta < -SWIPE_THRESHOLD_PX) onNavigate((index + 1) % count);
        if (delta > SWIPE_THRESHOLD_PX) onNavigate((index - 1 + count) % count);
        touchStartX.current = null;
      }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 font-mono text-2xl text-white/70 hover:text-white"
      >
        ×
      </button>
      <button
        type="button"
        aria-label="Previous photo"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index - 1 + count) % count);
        }}
        className="absolute left-4 hidden font-mono text-3xl text-white/70 hover:text-white sm:block"
      >
        ‹
      </button>
      <img
        src={photo.src}
        alt={photo.alt}
        className="max-h-full max-w-full rounded-lg object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        aria-label="Next photo"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index + 1) % count);
        }}
        className="absolute right-4 hidden font-mono text-3xl text-white/70 hover:text-white sm:block"
      >
        ›
      </button>
    </div>
  );
}
