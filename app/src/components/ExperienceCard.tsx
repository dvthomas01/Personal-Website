import { experience } from '../data/experience';
import { skills } from '../data/skills';

export function ExperienceCard() {
  return (
    <section className="bento">
      <h2 className="font-mono text-xs uppercase tracking-widest text-accent dark:text-accent-dark">
        Experience
      </h2>
      <p className="mt-1 text-sm text-ink/60 dark:text-ink-dark/60">
        A few of the places I've contributed to.
      </p>
      <ul className="mt-6 divide-y divide-line dark:divide-line-dark">
        {experience.map((entry) => (
          <li key={entry.company} className="flex items-center gap-4 py-4">
            <img
              src={entry.logo}
              alt={entry.company}
              className="h-9 w-9 rounded-full border border-line bg-white object-contain p-1 dark:border-line-dark"
            />
            <span className="font-mono text-xs text-ink/50 dark:text-ink-dark/50">{entry.period}</span>
            <span className="ml-auto text-right">
              <span className="block font-medium">{entry.company}</span>
              <span className="block text-sm text-ink/60 dark:text-ink-dark/60">{entry.role}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-line pt-4 font-mono text-xs leading-relaxed text-ink/50 dark:border-line-dark dark:text-ink-dark/50">
        {skills.map((s) => s.name.toLowerCase()).join(' · ')}
      </p>
    </section>
  );
}
