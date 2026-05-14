export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface WorkExperience {
  company: string;
  department: string;
  position: string;
  startDate: string;
  endDate: string | null;
  highlights: string[];
}

export interface Education {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface Language {
  language: string;
  fluency: string;
}

export interface ExpertiseArea {
  title: string;
  description: string;
}

export interface Award {
  title: string;
  description: string;
}

export interface PublicInfoLink {
  title: string;
  url: string;
}

export interface PublicInfoCategory {
  label: string;
  links: PublicInfoLink[];
}

export interface OssProject {
  name: string;
  slug: string;
  description: string;
  url: string;
  stars: number | null;
  tags: string[];
  highlight: string;
}

export interface CV {
  basics: {
    name: string;
    label: string;
    nickname: string;
    email: string;
    phone: string;
    url: string;
    summary: string;
    location: {
      address: string;
      postalCode: string;
      city: string;
      countryCode: string;
      region: string;
    };
    profiles: Profile[];
  };
  education: Education[];
  languages: Language[];
  skills: string[];
  expertise: ExpertiseArea[];
  work: WorkExperience[];
  awards: Award[];
  publicInfo: Record<string, PublicInfoCategory>;
  pr: string;
  oss: OssProject[];
}
