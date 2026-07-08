import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';

export default defineConfig({
  base: '/Personal-Website/',
  plugins: [reactRouter()],
});
