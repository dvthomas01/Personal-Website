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

export const projects: Project[] = [
  { id: 'autobot', title: 'Autonomous Navigation Robot', tags: ['Hardware'], thumbnail: autobot, href: 'https://dvthomas01.github.io/Personal-Website/hardware/autobot/autobot.html', description: 'Autonomous navigation robot project.' },
  { id: 'glasslamp', title: 'Glass Metal Lamp', tags: ['Hardware'], thumbnail: glasslamp, href: 'https://dvthomas01.github.io/Personal-Website/hardware/glasslamp/lamp.html', description: 'Fabricated glass and metal lamp.' },
  { id: 'comp-robot', title: '2.S007 Competition Robot', tags: ['Hardware'], thumbnail: compRobot, href: 'https://dvthomas01.github.io/Personal-Website/hardware/2.s007/2.s007.html', description: 'Competition robot for MIT 2.S007.' },
  { id: 'launcher', title: 'Vacuum-Formed Launcher Stadium', tags: ['Hardware'], thumbnail: launcher, href: 'https://dvthomas01.github.io/Personal-Website/hardware/2.00b/2.00b.html', description: 'Vacuum-formed launcher stadium build.' },
  { id: 'fmab', title: 'FMAB Mirror', tags: ['Hardware'], thumbnail: fmab, href: 'https://dvthomas01.github.io/Personal-Website/hardware/fmab_mirror/fmab_mirror.html', description: 'Interactive smart mirror.' },
  { id: 'chess', title: 'Chess Engine', tags: ['Software'], thumbnail: chess, href: 'https://dvthomas01.github.io/Personal-Website/software/chess/chess.html', description: 'Chess engine implementation.' },
  { id: 'nba', title: 'NBA Chatbot', tags: ['Software'], thumbnail: nba, href: 'https://dvthomas01.github.io/Personal-Website/software/nba/nba.html', description: 'Conversational NBA stats chatbot.' },
  { id: 'waldo', title: "Where's Waldo Solver", tags: ['Software'], thumbnail: waldo, href: 'https://dvthomas01.github.io/Personal-Website/software/waldo/waldo.html', description: 'Computer-vision Waldo solver.' },
  { id: 'dictionary', title: 'Dictionary App', tags: ['Software'], thumbnail: dictionary, href: 'https://dvthomas01.github.io/Personal-Website/software/dictionary/dictionary.html', description: 'Dictionary lookup web app.' },
  { id: 'lecture-note', title: 'Lecture Notes Helper', tags: ['Software'], thumbnail: lectureNote, href: 'https://dvthomas01.github.io/Personal-Website/software/Lecture_Note/Lecture_Note.html', description: 'RAG-based lecture notes helper.' },
  { id: 'deck', title: 'Yu-Gi-Oh! Deck Builder', tags: ['Software'], thumbnail: deck, href: 'https://dvthomas01.github.io/Personal-Website/software/deck_builder/deck-builder-project.html', description: 'Deck-building web app.' },
  { id: 'pacman', title: 'Pac-Man Bot', tags: ['Software'], thumbnail: pacman, href: 'https://dvthomas01.github.io/Personal-Website/software/pacman/pacman.html', description: 'Pac-Man playing bot.' },
  { id: 'fitclassifier', title: 'FitClassifier', tags: ['Software'], thumbnail: fitclassifier, href: 'https://dvthomas01.github.io/Personal-Website/software/fitclassifier/fitclassifier.html', description: 'Shazam for Clothes — outfit classifier.' },
  { id: 'ps70', title: 'PS70 Portfolio', tags: ['Hardware', 'Software'], thumbnail: ps70, href: 'https://nathanmelenbrink.github.io/ps70/about.html', description: 'Rapid prototyping, embedded controllers, CNC, and laser-cutting workflows.' },
  { id: 'led-display', title: 'Customizable Display Screen', tags: ['Hardware', 'Software'], thumbnail: ledDisplay, href: 'https://dvthomas01.github.io/PS70_Portfolio/13_finalproject/index.html', description: 'Low-latency display-driving firmware, custom power routing, modular hardware framing.' },
];
