<template>
  <div class="search-results-container">
    <!-- Título de la búsqueda -->
    <h1 v-if="query" v-html="$t('searchResults.title', { query })"></h1>
    <h1 v-else>{{ $t('searchResults.defaultTitle') }}</h1>
    
    <!-- Spinner de carga -->
    <div v-if="loading" class="spinner"></div>
    
    <!-- Mensaje de error -->
    <div v-else-if="error" class="error-message">
      {{ $t('searchResults.error') }}
    </div>
    
    <!-- Lista de películas -->
    <ul v-else class="movies-list">
      <li v-for="pelicula in peliculas" :key="pelicula.id" class="movie-item">
        <router-link :to="{ name: 'DetallePelicula', params: { id: pelicula.id } }" class="movie-link">
          <img
            :src="getImageUrl(pelicula.poster_path)"
            :alt="pelicula.title"
            class="movie-image"
            loading="lazy"
          />
          <h2>{{ pelicula.title }}</h2>
        </router-link>
      </li>
    </ul>
    
    <!-- Mensaje cuando no hay resultados -->
    <div v-if="!peliculas.length && !loading && !error" class="no-results">
      {{ $t('searchResults.noResults') }}
    </div>
    
    <!-- Paginación -->
    <div v-if="peliculas.length && page < totalPages" class="pagination">
      <button @click="loadMore" :disabled="loadingMore" class="load-more-button">
        {{ $t('searchResults.loadMore') }}
      </button>
    </div>
  </div>
</template>

<script>
import apiTMDB from '../api';

export default {
  name: 'SearchResults',
  props: {
    query: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      peliculas: [],
      loading: false,
      error: false,
      page: 1,
      totalPages: 1,
      loadingMore: false
    };
  },
  watch: {
    query: {
      immediate: true,
      handler(newQuery) {
        console.log('Término de búsqueda:', newQuery); // Para depuración
        if (newQuery) {
          this.page = 1;
          this.fetchSearchResults(newQuery, 1);
        } else {
          this.peliculas = [];
        }
      }
    }
  },
  methods: {
    async fetchSearchResults(searchTerm, page = 1) {
      if (page === 1) {
        this.loading = true;
      } else {
        this.loadingMore = true;
      }
      this.error = false;
      try {
        const respuesta = await apiTMDB.get('/search/movie', {
          params: {
            query: searchTerm,
            page: page
          }
        });
        if (page === 1) {
          this.peliculas = respuesta.data.results;
        } else {
          this.peliculas = [...this.peliculas, ...respuesta.data.results];
        }
        this.page = respuesta.data.page;
        this.totalPages = respuesta.data.total_pages;
      } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
        this.error = true;
      } finally {
        if (page === 1) {
          this.loading = false;
        } else {
          this.loadingMore = false;
        }
      }
    },
    loadMore() {
      if (this.page < this.totalPages) {
        this.fetchSearchResults(this.query, this.page + 1);
      }
    },
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
.search-results-container {
  padding: 80px 20px 20px 20px; /* Padding superior para compensar el navbar fijo */
  background: linear-gradient(to bottom right, #1c1c1c, #333333); /* Fondo degradado oscuro */
  min-height: 100vh;
}

.search-results-container h1 {
  text-align: center;
  color: #fff;
  margin-bottom: 40px;
  font-size: 36px;
}

.movies-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.movie-item {
  margin: 15px;
  text-align: center;
  width: 200px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.movie-link {
  text-decoration: none;
  color: inherit;
}

.movie-link:hover .movie-image {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.movie-image {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  display: block;
}

.movie-item h2 {
  font-size: 1em;
  margin-top: 10px;
  color: #fff;
}

/* Spinner de carga */
.spinner {
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-top: 8px solid #fff;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  margin: 50px auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Estilos para mensajes de error y sin resultados */
.error-message,
.no-results {
  color: #fff;
  font-size: 1.2em;
  text-align: center;
  margin-top: 50px;
}

/* Paginación */
.pagination {
  text-align: center;
  margin: 20px 0;
}

.load-more-button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.load-more-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.load-more-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
  .movie-item {
    width: 45%;
  }
}

@media (max-width: 480px) {
  .movie-item {
    width: 100%;
  }
}
</style>
