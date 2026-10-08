import type { IconName } from "@/types/icon";

export interface NavItem {
  label: string;
  href: string;
}

export interface SkillItem {
  name: string;
  tag: string;
  icon: IconName;
}

export interface SkillGroup {
  icon: IconName;
  title: string;
  subtitle: string;
  items: SkillItem[];
}

export type ProjectType = "Web app" | "App móvil" | "Full Stack" | "Sitio" | "Panel";


export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  tags: string[];
  title: string;
  description: string;
  repo?: string;
  repoApi?: string;
  demo?: string;
  image?: string;
}

export interface SocialLink {
  label: string;
  value: string;
  href: string;
  icon: IconName;
}

export type StatTone = "on" | "lv" | "hi";

export interface Stat {
  value: string;
  label: string;
  tone: StatTone;
  filled: number;
  total: number;
}

export interface HeroCard {
  role: string;
  focus: string;
  stack: string;
}

export interface SiteInfo {
  name: string;
  role: string;
  brandName: string;
  brandSubtitle: string;
  kicker: string;
  heroMessage: string;
  bio: string[];
  quote: string;
  quoteCitation: string;
  footerText: string;
  photo?: string;
  heroCard: HeroCard;
  contactIntro: string;
}
