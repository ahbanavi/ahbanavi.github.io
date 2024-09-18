import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Yedoost",
  EMAIL: "ahbanavi@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Yedoost",
  DESCRIPTION: "Amir Hossein Banavi (Yedoost) personal website and portfolio.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "github",
    HREF: "https://github.com/ahbanavi",
  },
  {
    NAME: "twitter",
    HREF: "https://x.com/iyedoost",
  },
  {
    NAME: "telegram",
    HREF: "https://t.me/yedoost",
  },
  {
    NAME: "instagram",
    HREF: "https://www.instagram.com/ahbanavi",
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/ahbanavi",
  },
];
