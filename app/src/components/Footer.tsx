import { Link } from 'react-router';
import { site } from '../data/site';

export function Footer() {
  return (
    <footer className="mt-20 grid gap-8 border-t border-line py-10 text-sm sm:grid-cols-3 dark:border-line-dark">
      <div>
        <p className="font-mono text-xs text-accent dark:text-accent-dark">whoami</p>
        {site.whoami.map((line) => (
          <p key={line} className="mt-1 text-ink/70 dark:text-ink-dark/70">{line}</p>
        ))}
        <p className="mt-4 font-mono text-xs text-ink/40 dark:text-ink-dark/40">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
      <nav aria-label="Pages">
        <p className="font-mono text-xs uppercase text-ink/40 dark:text-ink-dark/40">Pages</p>
        <ul className="mt-2 space-y-1">
          <li><Link to="/" className="hover:text-accent dark:hover:text-accent-dark">Home</Link></li>
          <li><Link to="/projects" className="hover:text-accent dark:hover:text-accent-dark">Projects</Link></li>
          <li><Link to="/photos" className="hover:text-accent dark:hover:text-accent-dark">Photos</Link></li>
        </ul>
      </nav>
      <nav aria-label="Elsewhere">
        <p className="font-mono text-xs uppercase text-ink/40 dark:text-ink-dark/40">Elsewhere</p>
        <ul className="mt-2 space-y-1">
          <li><a href={site.github} target="_blank" rel="noreferrer" className="hover:text-accent dark:hover:text-accent-dark">GitHub</a></li>
          <li><a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent dark:hover:text-accent-dark">LinkedIn</a></li>
          <li><a href={site.photography} target="_blank" rel="noreferrer" className="hover:text-accent dark:hover:text-accent-dark">Photography</a></li>
        </ul>
      </nav>
    </footer>
  );
}
