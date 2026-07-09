import type { ProjectDetail } from '../types';

const BASE = `${import.meta.env.BASE_URL}media/chess/`;

export const chess: ProjectDetail = {
  id: 'chess',
  tech: ['python'],
  blocks: [
    { type: 'video', src: `${BASE}chess-vid.mp4`, poster: `${BASE}poster.jpg`, caption: 'demo · playing against the engine' },
    {
      type: 'bullets',
      heading: 'What I built',
      items: [
        'Wrote a chess engine in Python using the chess library, with minimax and alpha-beta pruning for move evaluation.',
        'Built a Tkinter GUI with an interactive board so users can play against the engine.',
        'Added move validation and game state management to keep every move legal and the game progressing correctly.',
        'Added depth-limited search to balance computational efficiency with playing strength, with configurable AI difficulty levels.',
      ],
    },
  ],
};
