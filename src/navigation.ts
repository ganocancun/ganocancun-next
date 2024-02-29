/**
 * This module provides utilities for managing navigation and
 * locale information in Next.js application using next-intl.
 *
 * @see https://next-intl-docs.vercel.app/docs/routing/navigation
 * @see https://github.com/meienberger/runtipi/blob/develop/src/shared/internationalization/locales.ts
 */

import {
  createLocalizedPathnamesNavigation,
  createSharedPathnamesNavigation,
  type Pathnames,
} from "next-intl/navigation";

// todo: finish the new version of this file:
// todo: src/islands/switchers/navigation-new-beta.tsx

// Default locale for the application.
// export const defaultLocale = "en-us";
export const defaultLocale = "es-es" as const;

// Supported locales.
export const locales = ["es-es", "en-us"] as const;

// Labels for each supported locale, used for displaying human-readable names.
export const labels = {
  "es-es": "Español",
  "en-us": "English",
} as const;

// Type representing valid locale strings.
export type Locale = (typeof locales)[number];

// Ensure every locale has a label.
if (process.env.NODE_ENV === "development") {
  // biome-ignore lint/complexity/noForEach: <explanation>
  locales.forEach((locale) => {
    if (!labels[locale]) {
      console.warn(`No label found for locale: ${locale}`);
    }
  });
}

// Navigation utilities configured for the defined locales.
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

// === NEXT-INTERNATIONAL ===

/* export const localesNI = {
  "en-us": () => import("~/data/i18n/en-us.json"),
  "uk-ua": () => import("~/data/i18n/uk-ua.json"),
} as const;

type LocalesKeys = keyof typeof locales;

export const localeListNI = Object.keys(locales) as LocalesKeys[];

const allLocales = {
  "en-us": "en-us",
  "uk-ua": "uk-ua",
} as const;

export const LOCALES_NI: typeof allLocales = allLocales;

export const defaultLocaleNI = "en-us" as const satisfies keyof typeof localesNI; */
