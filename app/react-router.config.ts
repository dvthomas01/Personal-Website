import type { Config } from '@react-router/dev/config';
import { detailIds } from './src/data/detailIds';

export default {
  appDirectory: 'src',
  ssr: false,
  prerender: ['/', '/projects', '/photos', ...detailIds.map((id) => `/projects/${id}`)],
  basename: '/Personal-Website/',
} satisfies Config;
