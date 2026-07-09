import type { ProjectDetail } from '../types';

const BASE = `${import.meta.env.BASE_URL}media/comp-robot/`;

export const compRobot: ProjectDetail = {
  id: 'comp-robot',
  tech: ['arduino', 'waterjet', '3d printer', 'cad'],
  blocks: [
    { type: 'video', src: `${BASE}comp-robot-vid.mp4`, poster: `${BASE}poster.jpg`, caption: 'demo · autonomous and manual runs' },
    {
      type: 'bullets',
      heading: 'What I built',
      items: [
        'Developed and programmed a competition robot with both autonomous and manual modes.',
        'Added a 3D-printed pushplate and gripper system so it can grab, push, and maneuver objects around the game board and into a pit.',
        'Built on my earlier autonomous bot, layering in more advanced control systems and sensor readings for navigation and object manipulation.',
      ],
    },
  ],
};
