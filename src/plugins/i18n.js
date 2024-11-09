import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import es from '../locales/es.json';

// Define los mensajes de traducción
const messages = {
  en,
  es,
};

// Detecta el idioma del navegador
const userLang = navigator.language || navigator.userLanguage;
const locale = userLang.startsWith('es') ? 'es' :
               userLang.startsWith('en') ? 'en' :
               'en'; // Idioma por defecto

const i18n = createI18n({
  locale: 'es', 
  fallbackLocale: 'en', 
  messages,
});

const savedLanguage = localStorage.getItem('language');
if (savedLanguage) {
  i18n.global.locale.value = savedLanguage;
} else {
  i18n.global.locale.value = locale;
}

export default i18n;
