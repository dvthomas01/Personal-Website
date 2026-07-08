import type { Project } from './types';
import autobot from '../assets/projects/autobot.jpeg';
import glasslamp from '../assets/projects/glasslamp.jpeg';
import compRobot from '../assets/projects/comp-robot.jpeg';
import launcher from '../assets/projects/launcher.png';
import chess from '../assets/projects/chess.png';
import nba from '../assets/projects/nba.png';
import waldo from '../assets/projects/waldo.png';
import dictionary from '../assets/projects/dictionary.png';
import lectureNote from '../assets/projects/lecture-note.jpeg';
import deck from '../assets/projects/deck.jpg';
import pacman from '../assets/projects/pacman.png';
import fitclassifier from '../assets/projects/fitclassifier.png';
import fmab from '../assets/projects/fmab.jpg';
import ps70 from '../assets/projects/ps70.jpg';
import ledDisplay from '../assets/projects/led-display.jpg';
import audio from '../assets/research/audio.png';
import rover from '../assets/research/rover.png';
import fastBreaks from '../assets/research/fast-breaks-fast.png';

const SITE = 'https://dvthomas01.github.io/Personal-Website';

export const projects: Project[] = [
  // ---- featured (5) ----
  { id: 'ps70', title: 'PS70 Portfolio', tags: ['Hardware', 'Software'], thumbnail: ps70, href: 'https://dvthomas01.github.io/PS70_Portfolio/', description: 'Rapid prototyping, embedded controllers, CNC, and laser-cutting workflows.', year: 2025, featured: true },
  { id: 'led-display', title: 'Customizable Display Screen', tags: ['Hardware', 'Software'], thumbnail: ledDisplay, href: 'https://dvthomas01.github.io/PS70_Portfolio/13_finalproject/index.html', description: 'Low-latency display-driving firmware, custom power routing, modular hardware framing.', year: 2025, featured: true },
  { id: 'autobot', title: 'Autonomous Navigation Robot', tags: ['Hardware'], thumbnail: autobot, href: `${SITE}/hardware/autobot/autobot.html`, description: 'Semantic visual navigation with ROS 2, SLAM, and natural-language commands.', year: 2025, featured: true },
  { id: 'comp-robot', title: '2.S007 Competition Robot', tags: ['Hardware'], thumbnail: compRobot, href: `${SITE}/hardware/2.s007/2.s007.html`, description: 'Competition robot for MIT 2.S007.', year: 2024, featured: true }, // VERIFY year
  { id: 'fitclassifier', title: 'FitClassifier', tags: ['Software'], thumbnail: fitclassifier, href: `${SITE}/software/fitclassifier/fitclassifier.html`, description: 'Shazam for Clothes — outfit classifier.', year: 2024, featured: true }, // VERIFY year
  // ---- research (3) ----
  { id: 'fast-breaks-fast', title: 'Fast Breaks Fast: Robustness Performance in Compliant Terrain Locomotion', tags: ['Research'], thumbnail: fastBreaks, href: 'https://fast-breaks-fast.vercel.app/', description: 'PPO quadruped locomotion in MuJoCo — compliance randomization vs. robustness on unseen compliant terrain.', year: 2026, featured: false },
  { id: 'audio-forecast', title: 'Attention vs. Recurrence: Benchmarking Transformers and LSTMs for Music Spectral Forecasting', tags: ['Research'], thumbnail: audio, href: 'https://lisheld.github.io/DL_FINAL/', description: 'Benchmarking sequence models for music spectral forecasting.', year: 2025, featured: false },
  { id: 'lunarloc', title: 'LunarLoc: Segment-Based Global Localization on the Moon', tags: ['Research'], thumbnail: rover, href: 'https://arxiv.org/pdf/2506.16940', description: 'Segment-based global localization for lunar rovers (arXiv:2506.16940).', year: 2025, featured: false },
  // ---- archive (10) ----
  { id: 'glasslamp', title: 'Glass Metal Lamp', tags: ['Hardware'], thumbnail: glasslamp, href: `${SITE}/hardware/glasslamp/lamp.html`, description: 'Fabricated glass and metal lamp.', year: 2023, featured: false }, // VERIFY year
  { id: 'launcher', title: 'Vacuum-Formed Launcher Stadium', tags: ['Hardware'], thumbnail: launcher, href: `${SITE}/hardware/2.00b/2.00b.html`, description: 'Vacuum-formed launcher stadium build.', year: 2023, featured: false }, // VERIFY year
  { id: 'fmab', title: 'FMAB Mirror', tags: ['Hardware'], thumbnail: fmab, href: `${SITE}/hardware/fmab_mirror/fmab_mirror.html`, description: 'Interactive smart mirror.', year: 2023, featured: false }, // VERIFY year
  { id: 'chess', title: 'Chess Engine', tags: ['Software'], thumbnail: chess, href: `${SITE}/software/chess/chess.html`, description: 'Chess engine implementation.', year: 2024, featured: false }, // VERIFY year
  { id: 'nba', title: 'NBA Chatbot', tags: ['Software'], thumbnail: nba, href: `${SITE}/software/nba/nba.html`, description: 'Conversational NBA stats chatbot.', year: 2024, featured: false }, // VERIFY year
  { id: 'waldo', title: "Where's Waldo Solver", tags: ['Software'], thumbnail: waldo, href: `${SITE}/software/waldo/waldo.html`, description: 'Computer-vision Waldo solver.', year: 2024, featured: false }, // VERIFY year
  { id: 'dictionary', title: 'Dictionary App', tags: ['Software'], thumbnail: dictionary, href: `${SITE}/software/dictionary/dictionary.html`, description: 'Dictionary lookup web app.', year: 2023, featured: false }, // VERIFY year
  { id: 'lecture-note', title: 'Lecture Notes Helper', tags: ['Software'], thumbnail: lectureNote, href: `${SITE}/software/Lecture_Note/Lecture_Note.html`, description: 'RAG-based lecture notes helper.', year: 2025, featured: false }, // VERIFY year
  { id: 'deck', title: 'Yu-Gi-Oh! Deck Builder', tags: ['Software'], thumbnail: deck, href: `${SITE}/software/deck_builder/deck-builder-project.html`, description: 'Deck-building web app.', year: 2023, featured: false }, // VERIFY year
  { id: 'pacman', title: 'Pac-Man Bot', tags: ['Software'], thumbnail: pacman, href: `${SITE}/software/pacman/pacman.html`, description: 'Pac-Man playing bot.', year: 2024, featured: false }, // VERIFY year
];
