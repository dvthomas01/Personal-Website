import { useEffect, useState } from 'react';
import { getInitialTheme, type Theme } from './theme';

function detectTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return getInitialTheme(
    localStorage.getItem('theme'),
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
}

export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>(detectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggle = () =>
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });

  return { theme, toggle };
}
