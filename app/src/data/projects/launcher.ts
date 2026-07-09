import type { ProjectDetail } from '../types';

const BASE = `${import.meta.env.BASE_URL}media/launcher/`;

export const launcher: ProjectDetail = {
  id: 'launcher',
  tech: ['3d printer', 'cad', 'vacuum form'],
  blocks: [
    {
      type: 'text',
      heading: 'About',
      paragraphs: [
        "This was a project for 2.00b, MIT's toy product design class.",
      ],
    },
    {
      type: 'bullets',
      heading: 'What I built',
      items: [
        "Designed a children's game inspired by dodgeball, built around custom launchers.",
        'The game included a vacuum-formed stadium, 3D-printed cannon launchers, and figurines with embedded magnets.',
      ],
    },
    { type: 'image', src: `${BASE}launcher-pic-1.jpg`, alt: '2.00b project', caption: 'the launcher stadium' },
    {
      type: 'gallery',
      heading: 'Gallery',
      images: [
        { src: `${BASE}launcher-pic-2.jpg`, alt: 'players at the Go, Go, Dino! launcher booth' },
        { src: `${BASE}launcher-pic-3.jpg`, alt: 'players at the Go, Go, Dino! launcher booth' },
      ],
    },
  ],
};
