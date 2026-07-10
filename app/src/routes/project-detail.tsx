import { Link, useParams } from 'react-router';
import { projects } from '../data/projects';
import { projectDetails } from '../data/projectDetails';
import { detailIds } from '../data/detailIds';
import { DetailBlocks } from '../components/DetailBlocks';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const detail = id ? projectDetails[id] : undefined;

  if (!project || !detail) {
    return (
      <div className="py-12">
        <p className="font-mono text-sm text-ink/60 dark:text-ink-dark/60">
          Project not found.{' '}
          <Link to="/projects" className="text-accent hover:underline dark:text-accent-dark">
            Back to ~/projects
          </Link>
        </p>
      </div>
    );
  }

  const currentIndex = detailIds.indexOf(project.id);
  const prevId = detailIds[(currentIndex - 1 + detailIds.length) % detailIds.length];
  const nextId = detailIds[(currentIndex + 1) % detailIds.length];
  const prevProject = projects.find((p) => p.id === prevId);
  const nextProject = projects.find((p) => p.id === nextId);

  return (
    <div className="pb-12">
      <p className="font-mono text-xs text-ink/40 dark:text-ink-dark/40">
        <Link to="/projects" className="hover:text-accent dark:hover:text-accent-dark">
          ~/projects
        </Link>{' '}
        / {project.id}
      </p>

      <div className="mt-6 flex items-baseline justify-between font-mono text-xs">
        <span className="text-accent dark:text-accent-dark"># {project.tags.join(' · ').toLowerCase()}</span>
        <span className="text-ink/40 dark:text-ink-dark/40">{project.year}</span>
      </div>
      <h1 className="mt-2 font-serif text-5xl">{project.title}</h1>
      <p className="mt-2 text-ink/60 dark:text-ink-dark/60">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {detail.tech.map((label) => (
          <span
            key={label}
            className="rounded-full border border-line px-3 py-1 font-mono text-xs text-ink/60 dark:border-line-dark dark:text-ink-dark/60"
          >
            {label}
          </span>
        ))}
      </div>

      <DetailBlocks key={project.id} blocks={detail.blocks} />

      {prevProject && nextProject && (
        <div className="mt-12 flex items-start justify-between border-t border-line pt-6 font-mono text-sm dark:border-line-dark">
          <Link to={`/projects/${prevProject.id}`} className="text-accent hover:underline dark:text-accent-dark">
            <span className="block text-xs text-ink/40 dark:text-ink-dark/40">← previous</span>
            {prevProject.title}
          </Link>
          <Link
            to={`/projects/${nextProject.id}`}
            className="text-right text-accent hover:underline dark:text-accent-dark"
          >
            <span className="block text-xs text-ink/40 dark:text-ink-dark/40">next →</span>
            {nextProject.title}
          </Link>
        </div>
      )}
    </div>
  );
}
