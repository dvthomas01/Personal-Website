import { useState } from 'react';
import { projects } from '../data/projects';
import { FILTERS, countFor, filterProjects, type ProjectFilter } from '../lib/projectFilters';
import { ProjectCard } from '../components/ProjectCard';

export default function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>('All');
  const visible = filterProjects(projects, filter);
  const featured = visible.filter((p) => p.featured);
  const archive = visible.filter((p) => !p.featured);

  return (
    <div className="pb-8">
      <h1 className="font-serif text-5xl">Projects</h1>
      <p className="mt-2 text-ink/60 dark:text-ink-dark/60">
        Class builds, side projects, and research.
      </p>

      <div role="group" aria-label="Filter projects" className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
              filter === f
                ? 'border-accent text-accent dark:border-accent-dark dark:text-accent-dark'
                : 'border-line text-ink/60 hover:border-accent dark:border-line-dark dark:text-ink-dark/60 dark:hover:border-accent-dark'
            }`}
          >
            {f} · {countFor(projects, f)}
          </button>
        ))}
      </div>

      {featured.length > 0 && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}

      {archive.length > 0 && (
        <section className="mt-10">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/40 dark:text-ink-dark/40">
            Archive
          </p>
          <ul className="mt-3 divide-y divide-line dark:divide-line-dark">
            {archive.map((p) => (
              <li key={p.id}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3 hover:text-accent dark:hover:text-accent-dark"
                >
                  <span className="font-mono text-xs text-ink/40 dark:text-ink-dark/40">{p.year}</span>
                  <span className="font-medium">{p.title}</span>
                  <span className="text-sm text-ink/50 dark:text-ink-dark/50">{p.description}</span>
                  <span className="ml-auto font-mono text-xs text-accent dark:text-accent-dark">
                    {p.tags.join(' · ').toLowerCase()}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
