import { defineConfig, mergeConfig, defaultExclude } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      globals: true,
      exclude: [...defaultExclude, 'e2e/**'],
    },
  }),
);
