import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import en from "./locales/en.json";
import hi from "./locales/hi.json";

export const resources = {
  en: { translation: en },
  hi: { translation: hi },
} as const;

export type SupportedLanguage = keyof typeof resources;

// Detect device language code, fallback to English
const deviceLocales = Localization.getLocales();
const deviceLanguage = deviceLocales[0]?.languageCode === "hi" ? "hi" : "en";

void i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
