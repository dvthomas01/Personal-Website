import type { Publication } from './types';
import audio from '../assets/research/audio.png';
import rover from '../assets/research/rover.png';

export const publications: Publication[] = [
  { title: 'Attention vs. Recurrence: Benchmarking Transformers and LSTMs for Music Spectral Forecasting', href: 'https://lisheld.github.io/DL_FINAL/', thumbnail: audio },
  { title: 'LunarLoc: Segment-Based Global Localization on the Moon', href: 'https://arxiv.org/pdf/2506.16940', thumbnail: rover },
];
