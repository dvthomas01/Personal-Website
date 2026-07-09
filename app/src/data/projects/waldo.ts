import type { ProjectDetail } from '../types';

const BASE = `${import.meta.env.BASE_URL}media/waldo/`;

export const waldo: ProjectDetail = {
  id: 'waldo',
  tech: ['python'],
  blocks: [
    { type: 'image', src: `${BASE}waldo-pic.jpg`, alt: "Where's Waldo character" },
    {
      type: 'bullets',
      heading: 'What I built',
      items: [
        "Built an object detector on the YOLOv8 architecture to solve Where's Waldo puzzles, reaching 80% accuracy.",
        'Curated and processed datasets from Kaggle and Roboflow, using CVAT for image annotation and bounding box labeling.',
      ],
    },
    { type: 'image', src: `${BASE}waldo-train-pic.jpg`, alt: 'annotated Waldo training images with bounding boxes', caption: 'annotated training examples' },
  ],
};
