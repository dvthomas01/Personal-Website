import { filterProjects, countFor, FILTERS } from './projectFilters';
import { projects } from '../data/projects';

test('All returns everything sorted by year desc', () => {
  const result = filterProjects(projects, 'All');
  expect(result).toHaveLength(projects.length);
  for (let i = 1; i < result.length; i++) {
    expect(result[i - 1].year).toBeGreaterThanOrEqual(result[i].year);
  }
});

test('Research filter returns exactly the 3 research entries', () => {
  expect(filterProjects(projects, 'Research')).toHaveLength(3);
});

test('counts add up per filter', () => {
  expect(countFor(projects, 'All')).toBe(projects.length);
  expect(countFor(projects, 'Research')).toBe(3);
  expect(countFor(projects, 'Hardware')).toBe(projects.filter((p) => p.tags.includes('Hardware')).length);
});

test('FILTERS covers all chips in order', () => {
  expect(FILTERS).toEqual(['All', 'Hardware', 'Software', 'Research']);
});
