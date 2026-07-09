import type { ProjectDetail } from './types';
import { autobot } from './projects/autobot';

// TODO(task-5): spread in comp-robot, glasslamp, launcher, fmab, chess, nba,
// waldo, dictionary, lecture-note, deck, pacman, fitclassifier as their
// content files land in Tasks 3-5, so this covers all 13 detailIds.
export const projectDetails: Record<string, ProjectDetail> = {
  autobot,
};
