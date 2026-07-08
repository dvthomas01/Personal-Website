import { useState } from 'react';
import { photos, PHOTO_CATEGORIES } from '../data/photos';
import type { PhotoCategory } from '../data/types';
import { site } from '../data/site';
import { Lightbox } from '../components/Lightbox';

type CategoryFilter = 'all' | PhotoCategory;

export default function Photos() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = category === 'all' ? photos : photos.filter((p) => p.category === category);

  return (
    <div className="pb-8">
      <h1 className="font-serif text-5xl">Photos.</h1>
      <p className="mt-2 text-ink/60 dark:text-ink-dark/60">
        A selection of my photography — cities, concerts, campus life, and more.
      </p>

      <div role="group" aria-label="Filter photos" className="mt-6 flex flex-wrap gap-2">
        {(['all', ...PHOTO_CATEGORIES] as CategoryFilter[]).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
              category === c
                ? 'border-accent text-accent dark:border-accent-dark dark:text-accent-dark'
                : 'border-line text-ink/60 hover:border-accent dark:border-line-dark dark:text-ink-dark/60 dark:hover:border-accent-dark'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-2 gap-4 md:columns-3">
        {visible.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="mb-4 block w-full overflow-hidden rounded-xl"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="w-full transition-transform duration-300 hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      <a
        href={site.photography}
        target="_blank"
        rel="noreferrer"
        className="bento mt-6 block text-center font-mono text-sm text-accent hover:border-accent dark:text-accent-dark dark:hover:border-accent-dark"
      >
        View the full gallery →
      </a>

      {lightboxIndex !== null && (
        <Lightbox
          photos={visible}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
