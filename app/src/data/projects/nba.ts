import type { ProjectDetail } from '../types';

const BASE = `${import.meta.env.BASE_URL}media/nba/`;

export const nba: ProjectDetail = {
  id: 'nba',
  tech: ['python', 'html', 'css', 'flask'],
  blocks: [
    { type: 'video', src: `${BASE}chatbot-vid.mp4`, poster: `${BASE}poster.jpg`, caption: 'demo · asking the chatbot about NBA stats' },
    {
      type: 'bullets',
      heading: 'What I built',
      items: [
        "Built a Flask chatbot that answers NBA stats questions using cosine similarity between the user's input and a set of known questions.",
        'Used Python with nltk and numpy/pandas for text processing and similarity scoring.',
        'Tokenized user input and stripped stopwords, then compared it against a CSV of pre-defined questions.',
        "Returns the matching answer when it finds one, or tells the user it can't answer otherwise.",
      ],
    },
  ],
};
