<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-logo">Cinescope</router-link>
      <ul class="navbar-menu">
        <li class="navbar-item">
          <router-link to="/" class="navbar-link">Inicio</router-link>
        </li>
        <!-- Puedes añadir más enlaces aquí -->
      </ul>
      
       <!-- Formulario de Búsqueda -->
       <form class="search-form" @submit.prevent="submitSearch" aria-label="Formulario de búsqueda">
        <input
          type="text"
          v-model="searchQuery"
          :placeholder="$t('navbar.searchPlaceholder')"
          class="search-input"
          required
          aria-label="Campo de búsqueda"
        />
        <button type="submit" class="search-button" aria-label="Buscar">{{ $t('navbar.searchButton') }}</button>
      </form>
      <!-- Selector de idioma -->
      <div class="language-selector">
        <select v-model="currentLanguage" @change="changeLanguage">
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  </nav>
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: 'AppNavbar',
  data() {
    return {
      currentLanguage: this.$i18n.locale
    };
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.currentLanguage;
      // Opcional: Guardar la preferencia de idioma en localStorage
      localStorage.setItem('language', this.currentLanguage);
    },
    submitSearch: debounce(function() {
      if (this.searchQuery.trim() !== '') {
        this.$router.push({ name: 'SearchResults', query: { q: this.searchQuery.trim() } });
        this.searchQuery = '';
      }
    }, 150)
  },
  mounted() {
    // Opcional: Cargar la preferencia de idioma desde localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
      this.$i18n.locale = savedLanguage;
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: rgba(0, 0, 0, 0.8); /* Fondo semi-transparente oscuro */
  color: #fff;
  padding: 15px 20px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-logo {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}

.navbar-menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar-item {
  margin-left: 20px;
}

.navbar-link {
  color: #fff;
  font-size: 18px;
  transition: color 0.3s;
}

.navbar-link:hover {
  color: #007BFF; /* Color al pasar el cursor */
}

/* Responsividad para dispositivos móviles */
@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
  }

  .navbar-menu {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }

  .navbar-item {
    margin: 10px 0;
  }

  .language-selector {
    margin-left: 20px;
  }

  .language-selector select {
    padding: 5px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
  }
}
</style>
