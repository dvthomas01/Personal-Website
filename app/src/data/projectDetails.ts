import type { ProjectDetail } from './types';
import { autobot } from './projects/autobot';
import { compRobot } from './projects/comp-robot';
import { glasslamp } from './projects/glasslamp';
import { launcher } from './projects/launcher';
import { fmab } from './projects/fmab';
import { chess } from './projects/chess';
import { nba } from './projects/nba';
import { waldo } from './projects/waldo';
import { dictionary } from './projects/dictionary';
import { lectureNote } from './projects/lecture-note';
import { pacman } from './projects/pacman';

// TODO(task-5): spread in deck and fitclassifier as their content files
// land, so this covers all 13 detailIds.
export const projectDetails: Record<string, ProjectDetail> = {
  autobot,
  'comp-robot': compRobot,
  glasslamp,
  launcher,
  fmab,
  chess,
  nba,
  waldo,
  dictionary,
  'lecture-note': lectureNote,
  pacman,
};
