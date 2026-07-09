import type { ProjectDetail } from '../types';

const BASE = `${import.meta.env.BASE_URL}media/pacman/`;

export const pacman: ProjectDetail = {
  id: 'pacman',
  tech: ['python'],
  blocks: [
    { type: 'video', src: `${BASE}pacman-bot-vid.mp4`, poster: `${BASE}poster.jpg`, caption: 'demo · the trained bot playing Pac-Man' },
    {
      type: 'bullets',
      heading: 'What I built',
      items: [
        'Trained a Deep Convolutional Q-Network to play Pac-Man with PyTorch and OpenAI Gymnasium, achieving average scores of 1000.',
        'Implemented epsilon-greedy exploration, an experience replay buffer, and a target network for stable Q-learning updates.',
        'Designed a custom CNN to process game frames and extract features for decision-making.',
        'Used CUDA for GPU acceleration to speed up training and convergence.',
      ],
    },
  ],
};
