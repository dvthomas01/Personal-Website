import { Link } from 'react-router';
import { photos } from '../data/photos';

// One representative shot per vibe, derived from the gallery so the teaser
// survives photo reshuffles: first city, concert, grad, and sports photo.
const TEASER_CATEGORIES = ['cities', 'concerts', 'grad', 'sports'] as const;
const teaser = TEASER_CATEGORIES.map(
  (category) => photos.find((p) => p.category === category),
).filter((p) => p !== undefined);

export function PhotoTeaser() {
  return (
    <section className="bento">
      <div className="flex items-baseline justify-between">
        <h2 className="font-mono text-xs uppercase tracking-widest text-accent dark:text-accent-dark">
          Photography
        </h2>
        <Link to="/photos" className="font-mono text-sm text-accent hover:underline dark:text-accent-dark">
          photos/ →
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {teaser.map((photo) => (
          <img
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="aspect-square w-full rounded-lg object-cover"
          />
        ))}
      </div>
    </section>
  );
}
