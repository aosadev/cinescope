import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';

// Importa los archivos de traducción
import en from './locales/en.json';
import es from './locales/es.json';

// Define los mensajes de traducción
const messages = {
  en,
  es
};

// Crea una instancia de Vue I18n
const i18n = createI18n({
  locale: 'es', // Idioma por defecto
  fallbackLocale: 'en', // Idioma de respaldo si la traducción no está disponible
  messages,
});

const app = createApp(App);

app.use(router);
app.use(i18n);

app.mount('#app');
