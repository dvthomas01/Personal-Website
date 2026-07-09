import { useState } from 'react';
import { photos } from '../data/photos';
import { site } from '../data/site';
import { Lightbox } from '../components/Lightbox';

export default function Photos() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="pb-8">
      <h1 className="font-serif text-5xl">Photos</h1>
      <p className="mt-2 text-ink/60 dark:text-ink-dark/60">
        A snippet of what I shoot: cities, concerts, campus life, sports.
      </p>

      <div className="mt-8 columns-2 gap-4 md:columns-3">
        {photos.map((photo, i) => (
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
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
