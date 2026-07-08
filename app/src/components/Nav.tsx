import { Link } from 'react-router';
import { site } from '../data/site';
import { ThemeToggle } from './ThemeToggle';

export function Nav() {
  const cvHref = `${import.meta.env.BASE_URL}${site.cvFile}`;
  return (
    <header className="flex items-center justify-between py-6 font-mono text-sm">
      <Link to="/" className="hover:text-accent dark:hover:text-accent-dark">
        dami@home:~$ <span className="animate-blink" aria-hidden="true">█</span>
      </Link>
      <nav className="flex items-center gap-2 text-ink/70 dark:text-ink-dark/70">
        <Link to="/projects" className="hover:text-accent dark:hover:text-accent-dark">Projects</Link>
        <span aria-hidden="true">/</span>
        <Link to="/photos" className="hover:text-accent dark:hover:text-accent-dark">Photos</Link>
        <span aria-hidden="true">/</span>
        <a href={cvHref} target="_blank" rel="noreferrer" className="hover:text-accent dark:hover:text-accent-dark">CV</a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
