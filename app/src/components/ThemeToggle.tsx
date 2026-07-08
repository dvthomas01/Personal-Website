import { useTheme } from '../theme/useTheme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="rounded-lg border border-line px-2 py-1 font-mono text-xs transition-colors hover:border-accent dark:border-line-dark dark:hover:border-accent-dark"
    >
      {theme === 'dark' ? '☾' : '☀'}
    </button>
  );
}
