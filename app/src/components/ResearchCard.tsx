import { projects } from '../data/projects';

const research = projects.filter((p) => p.tags.includes('Research'));

export function ResearchCard() {
  return (
    <section className="bento">
      <h2 className="font-mono text-xs uppercase tracking-widest text-accent dark:text-accent-dark">
        Research
      </h2>
      <ul className="mt-4 divide-y divide-line dark:divide-line-dark">
        {research.map((entry) => (
          <li key={entry.id}>
            <a
              href={entry.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3 hover:text-accent dark:hover:text-accent-dark"
            >
              <span className="font-mono text-xs text-ink/40 dark:text-ink-dark/40">
                {entry.year}
              </span>
              <span className="font-medium">{entry.title}</span>
              <span className="ml-auto font-mono text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100 dark:text-accent-dark">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
