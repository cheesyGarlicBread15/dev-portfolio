export type TechItem = {
  name: string;
  icon: string;
};

export type TechCategory = {
  label: string;
  items: TechItem[];
};

export type ProjectLink = {
  type: string;
  url: string;
};

export type Project = {
  name: string;
  description: string;
  image: string;
  tech: string[];
  screenshots: string[];
  links: ProjectLink[];
};

export type ProjectWithIndex = Project & { index: number };

export type Social = {
  label: string;
  url: string;
  icon: string | null;
  isImg: boolean;
  component: (() => JSX.Element) | null;
};