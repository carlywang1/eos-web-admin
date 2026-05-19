import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './zh';
import en from './en';

const LANG_KEY = 'eos-lang';

i18n.use(initReactI18next).init({
  resources: {
    zh: { translation: zh },
    en: { translation: en },
  },
  lng: localStorage.getItem(LANG_KEY) || 'zh',
  fallbackLng: 'zh',
  interpolation: { escapeValue: false },
});

export function setLanguage(lang: 'zh' | 'en') {
  i18n.changeLanguage(lang);
  localStorage.setItem(LANG_KEY, lang);
}

export function getCurrentLanguage(): 'zh' | 'en' {
  return (i18n.language as 'zh' | 'en') || 'zh';
}

export default i18n;
