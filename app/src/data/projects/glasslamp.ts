import type { ProjectDetail } from '../types';

const BASE = `${import.meta.env.BASE_URL}media/glasslamp/`;

export const glasslamp: ProjectDetail = {
  id: 'glasslamp',
  tech: ['cad', 'adobe illustrator', 'plasma cutter', 'metal welder'],
  blocks: [
    { type: 'video', src: `${BASE}glasslamp-vid.mp4`, poster: `${BASE}poster.jpg`, caption: 'demo · the finished lamp' },
    {
      type: 'bullets',
      heading: 'What I built',
      items: [
        'Designed a sheet metal lamp in Adobe Illustrator.',
        'Cut the pieces on a plasma cutter, then welded them together with stained glass panels.',
      ],
    },
  ],
};
