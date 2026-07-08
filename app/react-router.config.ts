import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src',
  ssr: false,
  prerender: ['/', '/projects', '/photos'],
  basename: '/Personal-Website/',
} satisfies Config;
