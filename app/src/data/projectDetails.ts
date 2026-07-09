import type { ProjectDetail } from './types';
import { autobot } from './projects/autobot';
import { compRobot } from './projects/comp-robot';
import { glasslamp } from './projects/glasslamp';
import { launcher } from './projects/launcher';
import { fmab } from './projects/fmab';

// TODO(task-5): spread in chess, nba, waldo, dictionary, lecture-note, deck,
// pacman, fitclassifier as their content files land, so this covers all 13
// detailIds.
export const projectDetails: Record<string, ProjectDetail> = {
  autobot,
  'comp-robot': compRobot,
  glasslamp,
  launcher,
  fmab,
};
