import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';

export default defineConfig({
  base: '/Personal-Website/',
  plugins: [reactRouter()],
  server: {
    watch: {
      // The repo carries a large public/media tree and build output; watching
      // them recursively exhausts the OS file-descriptor limit (EMFILE) in dev.
      ignored: ['**/public/media/**', '**/build/**', '**/.react-router/**', '**/test-results/**'],
    },
  },
});
