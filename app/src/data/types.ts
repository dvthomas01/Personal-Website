export type ProjectKind = 'Software' | 'Hardware' | 'Research';

export interface Project {
  id: string;
  title: string;
  tags: ProjectKind[];
  thumbnail: string; // imported asset URL
  href?: string; // external link, opens new tab
  description: string;
  year: number;
  featured: boolean;
}

export interface ExperienceEntry {
  period: string; // e.g. 'Summer 2026'
  company: string;
  role: string;
  logo: string; // imported asset URL
}

export interface Skill {
  name: string;
}

export interface Photo {
  id: string;
  src: string; // imported asset URL
  category: PhotoCategory;
  alt: string;
}

export type PhotoCategory =
  | 'cities'
  | 'concerts'
  | 'formal'
  | 'grad'
  | 'live-events'
  | 'sports';
