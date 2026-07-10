import { Link } from 'react-router';
import { site } from '../data/site';

const ROW = 'flex items-baseline gap-4 py-1 hover:text-accent dark:hover:text-accent-dark';

export function DirectoryListing() {
  const cvHref = `${import.meta.env.BASE_URL}${site.cvFile}`;
  return (
    <section className="bento font-mono text-sm">
      <p className="text-ink/40 dark:text-ink-dark/40">drwxr-xr-x dami {new Date().getFullYear()} ./</p>
      <nav className="mt-2">
        <Link to="/projects" className={ROW}>
          <span className="text-accent dark:text-accent-dark">d</span>
          <span>projects/</span>
          <span className="text-ink/40 dark:text-ink-dark/40">things I built</span>
        </Link>
        <Link to="/photos" className={ROW}>
          <span className="text-accent dark:text-accent-dark">d</span>
          <span>photos/</span>
          <span className="text-ink/40 dark:text-ink-dark/40">photography</span>
        </Link>
        <a href={cvHref} target="_blank" rel="noreferrer" className={ROW}>
          <span className="text-ink/40 dark:text-ink-dark/40">-</span>
          <span>resume</span>
        </a>
        <a href={site.github} target="_blank" rel="noreferrer" className={ROW}>
          <span className="text-ink/40 dark:text-ink-dark/40">-</span>
          <span>github</span>
          <span className="text-ink/40 dark:text-ink-dark/40">@dvthomas01</span>
        </a>
      </nav>
      <a
        href={`mailto:${site.email}`}
        className="mt-4 inline-block text-accent underline-offset-4 hover:underline dark:text-accent-dark"
      >
        Say hi →
      </a>
    </section>
  );
}
