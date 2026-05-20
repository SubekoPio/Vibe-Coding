export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  aboutStory: string;
  email: string;
  location: string;
  whatsapp: string;
  avatarUrl: string;
  resumeUrl: string;
  socials: SocialLink[];
}

export interface Skill {
  id: string;
  name: string;
  category: "languages" | "frameworks" | "tools" | "other";
  imageUrl: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  imageUrl: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  publishedAt: string;
  published: boolean;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl: string;
  rating: number;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
}
