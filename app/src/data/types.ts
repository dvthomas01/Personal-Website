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

export type DetailBlock =
  | { type: 'text'; heading?: string; paragraphs: string[] }
  | { type: 'bullets'; heading?: string; items: string[] }
  | { type: 'video'; src: string; poster: string; caption?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'gallery'; heading?: string; images: { src: string; alt: string }[] };

export interface ProjectDetail {
  id: string; // must match a Project id
  tech: string[]; // chip labels
  blocks: DetailBlock[];
}
