import type { AbstractIntlMessages } from "next-intl";
import { getRequestConfig } from "next-intl/server";

// Import all the locale JSON files
import en_us from "~/data/i18n/en-us.json";
import es_es from "~/data/i18n/es-es.json";

// Create a mapping from locale identifiers
// to the specific imported JSON modules
const localeMessages = {
  "en-us": en_us,
  "es-es": es_es,
};

// Exporting default function that asynchronously receives
// the locale object and returns the configuration object
export default getRequestConfig(({ locale }) => {
  // When using Turbopack we enable HMR for locale
  // This approach also works fine without --turbo
  const messages: AbstractIntlMessages =
    localeMessages[locale] || localeMessages["es-es"];
  return { messages };
});

// When not using next dev --turbo, we can simplify imports:
// export default getRequestConfig(async ({ locale }) => ({
//   messages: (await import(`./data/i18n/${locale}.json`)).default,
// }));

/**
 * Learn more and resources
 * ========================
 * @see https://next-intl-docs.vercel.app/docs/environments/server-client-components
 * @see https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router
 * @see https://github.com/amannn/next-intl/issues?q=turbo
 * @see https://github.com/amannn/next-intl/issues/718
 * @see https://github.com/amannn/next-intl/pull/641
 * @see https://github.com/vercel/turbo/issues/2372
 */
