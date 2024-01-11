/**
 * [app.ts] App Configuration
 * ==========================
 *
 * To reduce the number of config files, we aim to
 * combine as much as possible into a single file.
 */

import type { OAuthStrategy } from "@clerk/types";
import type { ContentSection, FooterItem, MainMenuItem } from "~/types";
import { slugify } from "~/utils";

import { productCategories } from "~/server/config/products";
import { networks } from "~/server/config/socials";

import { env } from "./env.mjs";
import { Icons } from "./islands/icons";

// todo: parse this from clerk's dashboard instead of hardcoding it
export const oauthProvidersClerk = [
  { name: "Google", strategy: "oauth_google", icon: "google" },
  { name: "Discord", strategy: "oauth_discord", icon: "discord" },
  // { name: "Microsoft", strategy: "oauth_microsoft", icon: "microsoft" },
  // { name: "Facebook", strategy: "oauth_facebook", icon: "facebook" },
  // { name: "Github", strategy: "oauth_github", icon: "gitHub" },
] satisfies {
  name: string;
  icon: keyof typeof Icons;
  strategy: OAuthStrategy;
}[];

export const appts = {
  name: "Relivator",
  debug: false,
  social: networks({
    youtube: "@ganocancun",
    discord: "Pb8uKbwpsJ",
    facebook: "groups/bleverse",
    twitter: "ganocancun",
    github: "ganocancun",
  }),
};

export default appts;

const links = {
  twitter: "https://x.com/ganocancun",
  github: "https://github.com/ganocancun/ganocancun-next",
  githubAccount: "https://github.com/ganocancun",
  youtube: "https://www.youtube.com/@ganocancun",
  discord: "https://discord.gg/Pb8uKbwpsJ",
  facebook: "https://www.facebook.com/ganocancun/",
};

export const contactConfig = {
  email: "info@ganocancun.com",
};

export const REPOSITORY_OWNER = "ganocancun";
export const REPOSITORY_NAME = "ganocancun-next";
export const REPOSITORY_URL = `https://github.com/${REPOSITORY_OWNER}/${REPOSITORY_NAME}`;
export const DISCORD_URL = "https://discord.gg/Pb8uKbwpsJ";
export const baseUrl = new URL(
  env.NEXT_PUBLIC_APP_URL ?? "http://ganocancun.com",
);

export const BASE_URL =
  process.env.NODE_ENV === "production" ? baseUrl : "http://localhost:3000";
export const BRAND_NAME = "Relivator";
export const BRAND_DESCRIPTION =
  "Next.js 14 free store and dashboard template. It helps you build great eCommerce and SaaS apps faster than ever. Get it now!";

export const OWNER_ROLE = "owner";
export const ADMIN_ROLE = "admin";
export const MEMBER_ROLE = "member";

export const TRIAL_LENGTH_IN_DAYS = 7;
export const ROLES = [OWNER_ROLE, ADMIN_ROLE, MEMBER_ROLE] as const;

export const settings = {
  themeToggleEnabled: true,
};

export const siteConfig = {
  name: "GanoCancún",
  shortName: "GanoCancun",
  author: "Enrique Montes",
  description:
    "Descubre Gano Excel en Cancún: líderes en productos de bienestar enriquecidos con Ganoderma Lucidum. Experimenta la fusión de salud y sabor tropical en nuestros cafés,  y suplementos nutricionales. ¡Eleva tu bienestar con Gano Excel Cancun!",
  company: {
    name: "Ganoexcel Cancun",
    link: "https://ganocancun.com",
    email: "info@ganocancun.com",
    twitter: "@el_ade",
  },
  handles: {
    twitter: "@el_ade",
  },
  keywords: [
    "Gano Excel Cancun",
    "Productos Gano Excel",
    "Ganoderma Lucidum",
    "Café de bienestar Cancun",
    "Suplementos de salud Cancun",
    "Bienestar y nutrición Cancun",
    "Gano café beneficios",
    "Gano Excel oportunidad de negocio",
    "Café saludable Cancun",
    "Mejora de salud natural Cancun",
    "Emprendimiento en bienestar Cancun",
    "Gano Excel experiencias",
    "Nutrición avanzada Cancun",
    "Gano Excel estilo de vida",
    "Productos Ganoderma en Cancun",
  ],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: REPOSITORY_OWNER,
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og-image.png`,
  mainNav: [
    {
      title: "Ganoderma",
      items: [
        {
          title: "El Hongo de la Inmortalidad",
          href: "/ganoderma-lucidum/hongo-la-inmortalidad",
          description: "El Ganoderma Lucidum.",
          items: [],
        },
        {
          title: "¿Qué es el Ganoderma Lucidum?",
          href: "/ganoderma-lucidum/beneficios-del-ganoderma",
          description: "Qué es y Cuáles son sus beneficios.",
          items: [],
        },
        {
          title: "Ganoderma Lucidum",
          href: "/ganoderma-lucidum/ganoderma-lucidum-dr-ruiz",
          description: "Video Explicativo del Dr. Ruiz.",
          items: [],
        },
      ],
    },
    ...productCategories.map((category) => ({
      title: category.title,
      items: [
        {
          title: "All",
          href: `/categories/${slugify(category.title)}`,
          description: `All ${category.title}.`,
          items: [],
        },
        ...category.subcategories.map((subcategory) => ({
          title: subcategory.title,
          href: `/categories/${slugify(category.title)}/${subcategory.slug}`,
          description: subcategory.description,
          items: [],
        })),
      ],
    })),
  ] satisfies MainMenuItem[],
  links,
  footerNav: [
    {
      title: "Ganoexcel",
      items: [
        {
          title: "Ganoexcel México",
          href: "https://www.ganoexcel.mx",
          external: true,
        },
        {
          title: "Oficina Virtual",
          href: "https://mexico.ganoexcel.com",
          external: true,
        },
        {
          title: "Ganoexcel US",
          href: "https://www.ganoexcel.us",
          external: true,
        },
        {
          title: "Enrique Montes",
          href: "https://enriquemontes.com",
          external: true,
        },
      ],
    },
    {
      title: "Ayuda",
      items: [
        {
          title: "Contacto",
          href: "/contact",
          external: false,
        },
        {
          title: "Privacidad",
          href: "/privacy",
          external: false,
        },
        {
          title: "Términos",
          href: "/terms",
          external: false,
        },
        {
          title: "Acerca de",
          href: "/about",
          external: false,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "Facebook",
          href: links.facebook,
          external: true,
        },
        {
          title: "YoutTube",
          href: links.youtube,
          external: true,
        },
        {
          title: "Twitter",
          href: links.twitter,
          external: true,
        },
        {
          title: "Github",
          href: links.githubAccount,
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
};

export const featureCards: ContentSection = {
  header: "Powered by",
  subheader: "What Makes Relivator Possible",
  content: [
    {
      text: "Next.js",
      subtext: "The React Framework",
    },
    {
      text: "shadcn/ui",
      subtext: "Beautifully Designed Components",
    },
    {
      text: "Vercel",
      subtext: "Develop. Preview. Ship.",
    },
  ],
};

export const features: ContentSection = {
  header: "Features",
  subheader: "Why You Need to Download Relivator",
  content: [
    {
      text: "SEO Optimized",
      subtext: "Improved website visibility on search engines",
    },
    {
      text: "Highly Performant",
      subtext: "Fast loading times and smooth performance",
    },
    {
      text: "Easy Customization",
      subtext: "Change your content and layout with little effort",
    },
  ],
};
