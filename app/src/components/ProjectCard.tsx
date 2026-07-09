import { Link } from 'react-router';
import type { Project } from '../data/types';
import { detailIds } from '../data/detailIds';

export function ProjectCard({ project }: { project: Project }) {
  const className =
    'bento group block transition-transform hover:-translate-y-0.5 hover:border-accent dark:hover:border-accent-dark';

  const content = (
    <>
      <div className="flex items-baseline justify-between font-mono text-xs">
        <span className="text-accent dark:text-accent-dark"># {project.tags.join(' · ').toLowerCase()}</span>
        <span className="text-ink/40 dark:text-ink-dark/40">{project.year}</span>
      </div>
      <h3 className="mt-2 font-serif text-2xl">{project.title}</h3>
      <p className="mt-1 text-sm text-ink/60 dark:text-ink-dark/60">{project.description}</p>
      <div className="mt-4 overflow-hidden rounded-xl border border-line bg-ink/[0.03] dark:border-line-dark dark:bg-white/[0.03]">
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          className="aspect-[4/3] w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    </>
  );

  if (detailIds.includes(project.id)) {
    return (
      <Link to={`/projects/${project.id}`} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a href={project.href} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  );
}
