import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '../data/projects';

const INTERVAL_MS = 4000;
const featured = projects.filter((p) => p.featured);

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function FeaturedCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % featured.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPaused, reducedMotion]);

  const current = featured[index];

  return (
    <section
      className="bento"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2 className="font-mono text-xs uppercase tracking-widest text-accent dark:text-accent-dark">
        Projects · {current.title}
      </h2>
      <p className="mt-1 text-sm text-ink/60 dark:text-ink-dark/60">{current.description}</p>
      <div className="mt-4 overflow-hidden rounded-xl border border-line dark:border-line-dark">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={current.id}
            src={current.thumbnail}
            alt={current.title}
            className="aspect-video w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
          />
        </AnimatePresence>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1.5" aria-hidden="true">
          {featured.map((p, i) => (
            <span
              key={p.id}
              className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-accent dark:bg-accent-dark' : 'bg-line dark:bg-line-dark'}`}
            />
          ))}
        </div>
        <Link to="/projects" className="font-mono text-sm text-accent hover:underline dark:text-accent-dark">
          all projects →
        </Link>
      </div>
    </section>
  );
}
