export interface PersonalData {
  hero: {
    name: string;
    taglines: string[];
    avatar: string;
  };
  about: {
    bio: string;
    location: string;
  };
  skills: {
    name: string;
    icon: string;
    category: string;
  }[];
  projects: {
    title: string;
    description: string;
    tags: string[];
    link: string;
    image: string;
  }[];
  contact: {
    email: string;
    socials: {
      platform: string;
      url: string;
      icon: string;
    }[];
  };
}
