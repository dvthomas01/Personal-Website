import { useEffect, useState } from 'react';
import type { Theme } from './theme';

// The site always loads in light mode. Dark is a per-session toggle only — it is
// intentionally NOT persisted, so every fresh load starts light.
export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggle = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  return { theme, toggle };
}
