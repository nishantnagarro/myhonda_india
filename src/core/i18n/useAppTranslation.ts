import { useTranslation } from "react-i18next";

import en from "./locales/en.json";

// Flatten nested JSON keys into "explore.title" | "common.retry" union
type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
    ? F
    : T extends [infer F, ...infer R]
      ? F extends string
        ? `${F}${D}${Join<Extract<R, string[]>, D>}`
        : never
      : string;

export type TranslationKey = Join<PathsToStringProps<typeof en>, ".">;

/**
 * Type-safe translation hook
 * Autocompletes and validates all keys defined in en.json at compile-time.
 */
export function useAppTranslation() {
  const { t: translateOriginal, i18n } = useTranslation();

  const t = (
    key: TranslationKey,
    options?: Record<string, unknown>,
  ): string => {
    type TranslationFn = (k: string, opts?: Record<string, unknown>) => string;
    const fn = translateOriginal as unknown as TranslationFn;
    return options ? fn(key, options) : fn(key);
  };

  const changeLanguage = async (lang: "en" | "hi") => {
    await i18n.changeLanguage(lang);
  };

  return {
    t,
    currentLanguage: i18n.language as "en" | "hi",
    changeLanguage,
  };
}
