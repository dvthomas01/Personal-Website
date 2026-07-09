import type { ProjectDetail } from '../types';

const BASE = `${import.meta.env.BASE_URL}media/autobot/`;

export const autobot: ProjectDetail = {
  id: 'autobot',
  tech: ['arduino', 'cad', 'waterjet'],
  blocks: [
    { type: 'video', src: `${BASE}autobot-vid.mp4`, poster: `${BASE}poster.jpg`, caption: 'demo · maze and line-tracking runs' },
    {
      type: 'bullets',
      heading: 'What I built',
      items: [
        'Built and programmed an Arduino robot that navigates using IMU, encoder, and line-tracking sensor readings.',
        'Used PID and bang-bang control to maneuver through mazes and line-tracking maps.',
        'Added an ultrasound sensor for object detection and dynamic path adjustment.',
      ],
    },
  ],
};
