import type { ProjectDetail } from '../types';

const BASE = `${import.meta.env.BASE_URL}media/fmab/`;

export const fmab: ProjectDetail = {
  id: 'fmab',
  tech: ['laser cutting'],
  blocks: [
    {
      type: 'text',
      heading: 'Overview',
      paragraphs: [
        'This mirror started as a screenshot from Fullmetal Alchemist: Brotherhood and ended up laser-cut in acrylic on my wall. It was my first attempt at this kind of build, and I learned a lot along the way.',
      ],
    },
    {
      type: 'bullets',
      items: [
        'Custom-designed acrylic mirror inspired by "The Gate" from Fullmetal Alchemist: Brotherhood.',
        'Designed in Adobe Illustrator, then laser-cut and engraved on 32" x 20" x 1/8" acrylic.',
        'Filled the engraved lines with black Sharpie for contrast.',
        'Functional, meaningful room decor.',
      ],
    },
    {
      type: 'bullets',
      heading: 'Design and build',
      items: [
        'Collected reference art of the scene.',
        'Sketched a vector design in Adobe Illustrator.',
        'Laser-cut and engraved the acrylic.',
        'Filled in the engraved lines.',
        'Mounted it and enjoyed it.',
      ],
    },
    {
      type: 'bullets',
      heading: 'Fabrication',
      items: [
        'Verified alignment and scale before laser cutting.',
        'Laser-cut and engraved the acrylic sheet.',
        'Filled the engraved lines with black Sharpie for contrast.',
        'Did a final cleaning and mounted it.',
      ],
    },
    {
      type: 'gallery',
      heading: 'Gallery',
      images: [
        { src: `${BASE}demo-1.jpg`, alt: 'acrylic sheet after laser cutting and engraving' },
        { src: `${BASE}demo-2.jpg`, alt: 'final installed mirror in room' },
        { src: `${BASE}demo-3.jpg`, alt: 'close-up of the finished mirror' },
        { src: `${BASE}adobe-illustrator-design.png`, alt: 'Adobe Illustrator vector design for laser cutting' },
      ],
    },
    {
      type: 'bullets',
      heading: 'Lessons learned',
      items: [
        'Gained proficiency with laser cutting and acrylic fabrication.',
        'Learned about vector prep tolerances and engraving fill techniques.',
        "Realized I can make a lot more of the things I see online than I thought.",
      ],
    },
  ],
};
