import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import EN_US from '@/assets/translations/en_US.json';
import NL from '@/assets/translations/nl_NL.json';

enum LANGUAGES {
  ENGLISH_US = 'en-US',
  DUTCH = 'nl-NL',
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: LANGUAGES.ENGLISH_US,
    lng: LANGUAGES.ENGLISH_US,
    debug: true,
    resources: {
      [LANGUAGES.ENGLISH_US]: { translation: EN_US },
      [LANGUAGES.DUTCH]: { translation: NL },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
