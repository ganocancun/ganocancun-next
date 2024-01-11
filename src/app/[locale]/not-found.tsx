/**
 * This file is used to render a 404 page.
 * This file serves as Layout for 404 page.
 * Visit <NotFoundContent /> to check more.
 */

"use client";

import { getCookie } from "cookies-next";
import pick from "lodash/pick";
import type { AbstractIntlMessages } from "next-intl";
import { NextIntlClientProvider } from "next-intl";

import en_us from "~/data/i18n/en-us.json";
import es_es from "~/data/i18n/es-es.json";
import NotFoundContent from "~/islands/content/not-found-content";
import { defaultLocale } from "~/navigation";

// Create a mapping from locale identifiers
// to the specific imported JSON modules
const localeMessages = {
  "en-us": en_us,
  "es-es": es_es,
};

export default function NotFoundPage() {
  const locale = getCookie("NEXT_LOCALE")?.toString() || defaultLocale;
  // console.log("locale from cookie", locale); // for debug purposes

  // Use the mapping object to select messages
  // This approach also works without --turbo
  const messages: AbstractIntlMessages =
    localeMessages[locale] || localeMessages["es-es"];

  // When not using next dev --turbo, we can use this:
  /*  let messages: AbstractIntlMessages = {};
  try {
    messages = require(`~/data/i18n/${locale}.json`);
  } catch (error) {
    // Assign fallback set of messages when error
    messages = require("~/data/i18n/en-us.json");
    // console.error(error); // browser console
  } */

  return (
    <NextIntlClientProvider
      locale={locale}
      // Provide only needed messages for NotFound
      messages={pick(messages, "pages.not-found")}
    >
      <NotFoundContent />
    </NextIntlClientProvider>
  );
}

/**
 * Learn more and resources
 * ========================
 * @see https://next-intl-docs.vercel.app/docs/environments/server-client-components
 * @see https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router
 * @see https://next-intl-docs.vercel.app/docs/environments/error-files
 * @see https://github.com/amannn/next-intl/issues?q=turbo
 * @see https://github.com/amannn/next-intl/issues/718
 * @see https://github.com/amannn/next-intl/pull/641
 * @see https://github.com/vercel/turbo/issues/2372
 */
