import type { ProjectDetail } from '../types';

const BASE = `${import.meta.env.BASE_URL}media/dictionary/`;

export const dictionary: ProjectDetail = {
  id: 'dictionary',
  tech: ['javascript', 'html', 'css', 'react'],
  blocks: [
    { type: 'video', src: `${BASE}dictionary-vid.mp4`, poster: `${BASE}poster.jpg`, caption: 'demo · looking up a word' },
    {
      type: 'bullets',
      heading: 'What I built',
      items: [
        'Built a dictionary web app in React with interactive, real-time lookups.',
        'Integrated the Merriam-Webster Dictionary API to pull definitions and example sentences.',
        'Styled it with Material-UI components for a consistent, accessible look.',
        'Used Axios for HTTP requests and state management between the app and the API.',
        'Rounded it out with JavaScript, HTML, and CSS for a clean, usable interface.',
      ],
    },
  ],
};
