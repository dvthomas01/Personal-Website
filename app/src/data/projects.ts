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
  { id: 'ps70', title: 'PS70 Portfolio', tags: ['Hardware', 'Software'], thumbnail: ps70, href: 'https://dvthomas01.github.io/PS70_Portfolio/', description: 'A semester of digital fabrication: microcontrollers, CNC, laser cutting, and the week-by-week builds that came out of it.', year: 2025, featured: true },
  { id: 'led-display', title: 'Customizable Display Screen', tags: ['Hardware', 'Software'], thumbnail: ledDisplay, href: 'https://dvthomas01.github.io/PS70_Portfolio/13_finalproject/index.html', description: 'My PS70 final project: an LED panel that shows custom patterns. I wrote the firmware and built the frame myself.', year: 2025, featured: true },
  { id: 'autobot', title: 'Autonomous Navigation Robot', tags: ['Hardware'], thumbnail: autobot, href: `${SITE}/hardware/autobot/autobot.html`, description: 'An Arduino robot that finds its way through mazes and line-tracking courses, adjusting when something gets in the way.', year: 2025, featured: true },
  { id: 'comp-robot', title: '2.S007 Competition Robot', tags: ['Hardware'], thumbnail: compRobot, href: `${SITE}/hardware/2.s007/2.s007.html`, description: "My robot for 2.S007, MIT's design and build competition.", year: 2024, featured: true },
  { id: 'fitclassifier', title: 'FitClassifier', tags: ['Software'], thumbnail: fitclassifier, href: `${SITE}/software/fitclassifier/fitclassifier.html`, description: "Shazam for clothes. Upload an outfit photo and it tells you what you're looking at.", year: 2025, featured: true },
  // ---- research (3) ----
  { id: 'fast-breaks-fast', title: 'Fast Breaks Fast: Robustness Performance in Compliant Terrain Locomotion', tags: ['Research'], thumbnail: fastBreaks, href: 'https://fast-breaks-fast.vercel.app/', description: 'I trained quadrupeds in MuJoCo to walk on soft ground they never saw in training, then measured what actually kept them upright.', year: 2026, featured: false },
  { id: 'audio-forecast', title: 'Attention vs. Recurrence: Benchmarking Transformers and LSTMs for Music Spectral Forecasting', tags: ['Research'], thumbnail: audio, href: 'https://lisheld.github.io/DL_FINAL/', description: 'A head-to-head test of transformers and LSTMs at predicting music spectra.', year: 2025, featured: false },
  { id: 'lunarloc', title: 'LunarLoc: Segment-Based Global Localization on the Moon', tags: ['Research'], thumbnail: rover, href: 'https://arxiv.org/pdf/2506.16940', description: 'Segment-based global localization for lunar rovers (arXiv:2506.16940).', year: 2025, featured: false },
  // ---- archive (10) ----
  { id: 'glasslamp', title: 'Glass Metal Lamp', tags: ['Hardware'], thumbnail: glasslamp, href: `${SITE}/hardware/glasslamp/lamp.html`, description: 'A lamp I fabricated from glass and metal.', year: 2024, featured: false },
  { id: 'launcher', title: 'Vacuum-Formed Launcher Stadium', tags: ['Hardware'], thumbnail: launcher, href: `${SITE}/hardware/2.00b/2.00b.html`, description: "A vacuum-formed stadium built for MIT's toy design class.", year: 2023, featured: false },
  { id: 'fmab', title: 'FMAB Mirror', tags: ['Hardware'], thumbnail: fmab, href: `${SITE}/hardware/fmab_mirror/fmab_mirror.html`, description: 'A laser-cut acrylic mirror inspired by Fullmetal Alchemist: Brotherhood.', year: 2025, featured: false },
  { id: 'chess', title: 'Chess Engine', tags: ['Software'], thumbnail: chess, href: `${SITE}/software/chess/chess.html`, description: 'A chess engine I wrote from scratch.', year: 2024, featured: false },
  { id: 'nba', title: 'NBA Chatbot', tags: ['Software'], thumbnail: nba, href: `${SITE}/software/nba/nba.html`, description: 'A chatbot that answers questions about NBA stats.', year: 2024, featured: false },
  { id: 'waldo', title: "Where's Waldo Solver", tags: ['Software'], thumbnail: waldo, href: `${SITE}/software/waldo/waldo.html`, description: 'A computer vision program that finds Waldo.', year: 2024, featured: false },
  { id: 'dictionary', title: 'Dictionary App', tags: ['Software'], thumbnail: dictionary, href: `${SITE}/software/dictionary/dictionary.html`, description: 'A simple web app for looking up word definitions.', year: 2024, featured: false },
  { id: 'lecture-note', title: 'Lecture Notes Helper', tags: ['Software'], thumbnail: lectureNote, href: `${SITE}/software/Lecture_Note/Lecture_Note.html`, description: 'Ask questions about your lecture notes and get answers pulled straight from them.', year: 2024, featured: false },
  { id: 'deck', title: 'Yu-Gi-Oh! Deck Builder', tags: ['Software'], thumbnail: deck, href: `${SITE}/software/deck_builder/deck-builder-project.html`, description: 'Card search and deck building for Yu-Gi-Oh! players.', year: 2024, featured: false },
  { id: 'pacman', title: 'Pac-Man Bot', tags: ['Software'], thumbnail: pacman, href: `${SITE}/software/pacman/pacman.html`, description: 'A bot that plays Pac-Man on its own.', year: 2024, featured: false },
];
