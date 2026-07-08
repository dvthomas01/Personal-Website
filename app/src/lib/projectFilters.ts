import type { Project, ProjectKind } from '../data/types';

export type ProjectFilter = 'All' | ProjectKind;

export const FILTERS: ProjectFilter[] = ['All', 'Hardware', 'Software', 'Research'];

export function filterProjects(list: Project[], filter: ProjectFilter): Project[] {
  const matched = filter === 'All' ? list : list.filter((p) => p.tags.includes(filter));
  return [...matched].sort((a, b) => b.year - a.year);
}

export function countFor(list: Project[], filter: ProjectFilter): number {
  return filterProjects(list, filter).length;
}
