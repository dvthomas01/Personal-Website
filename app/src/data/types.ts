export type ProjectKind = 'Software' | 'Hardware';

export interface Project {
  id: string;
  title: string;
  tags: ProjectKind[];
  thumbnail: string;     // imported asset URL
  href?: string;         // external link, opens new tab
  description: string;
}

export interface Skill {
  name: string;
  icon: string;          // imported asset URL
}

export interface Company {
  name: string;
  logo: string;          // imported asset URL
}

export interface Publication {
  title: string;
  href: string;
  thumbnail: string;
}

export type AppId =
  | 'about' | 'skills' | 'projects' | 'experience'
  | 'research' | 'photos' | 'resume' | 'contact';

export interface AppMeta {
  id: AppId;
  label: string;
  icon: string;          // imported asset URL or inline data URI
}
