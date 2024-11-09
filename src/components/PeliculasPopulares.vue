<template>
  <div class="peliculas-container">
    <h1>{{ $t('peliculasPopulares.title') }}</h1>
    <ul class="peliculas-lista">
      <li v-for="pelicula in peliculas" :key="pelicula.id" class="pelicula-item">
        <router-link :to="{ name: 'DetallePelicula', params: { id: pelicula.id } }" class="pelicula-link">
          <img
            :src="getImageUrl(pelicula.poster_path)"
            :alt="pelicula.title"
            class="pelicula-imagen"
            loading="lazy"
          />
          <h2>{{ pelicula.title }}</h2>
        </router-link>
      </li>
    </ul>
    <!-- Mensajes de carga y error ya están traducidos -->
    <p v-if="!peliculas.length && !error" class="loading-message">{{ $t('peliculasPopulares.loading') }}</p>
    <p v-else-if="error" class="error-message">{{ $t('peliculasPopulares.error') }}</p>
  </div>
</template>

<script>
import apiTMDB from '../api';

export default {
  name: 'PeliculasPopulares',
  data() {
    return {
      peliculas: [],
      error: false
    };
  },
  async created() {
    try {
      const respuesta = await apiTMDB.get('/movie/popular');
      this.peliculas = respuesta.data.results;
    } catch (error) {
      console.error('Error al obtener películas populares:', error);
      this.error = true;
    }
  },
  methods: {
    getImageUrl(posterPath) {
      if (posterPath) {
        return `https://image.tmdb.org/t/p/w500${posterPath}`;
      } else {
        return 'https://via.placeholder.com/500x750?text=Sin+Imagen';
      }
    }
  }
};
</script>

<style scoped>
.peliculas-container {
  padding: 80px 20px 20px 20px; /* Padding superior para compensar el navbar fijo */
  background: linear-gradient(to bottom right, #1c1c1c, #333333); /* Fondo degradado oscuro */
  min-height: 100vh;
}

.peliculas-container h1 {
  text-align: center;
  color: #fff;
  margin-bottom: 40px;
  font-size: 36px;
}

.peliculas-lista {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.pelicula-item {
  margin: 15px;
  text-align: center;
  width: 200px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.pelicula-link {
  text-decoration: none;
  color: inherit;
}

.pelicula-link:hover .pelicula-imagen {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.pelicula-imagen {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  display: block;
}

.pelicula-item h2 {
  font-size: 1em;
  margin-top: 10px;
  color: #fff;
}

/* Añadir sombra al título al pasar el cursor */
.pelicula-link:hover h2 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

/* Responsive Design */
@media (max-width: 768px) {
  .pelicula-item {
    width: 45%;
  }
}

@media (max-width: 480px) {
  .pelicula-item {
    width: 100%;
  }
}

/* Estilos para mensajes de carga y error */
.loading-message,
.error-message {
  color: #fff;
  font-size: 1.2em;
  text-align: center;
  margin-top: 50px;
}
</style>
