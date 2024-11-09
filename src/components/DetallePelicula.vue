<template>
  <div class="detalle-container" :style="getBackdropStyle()">
    <div v-if="pelicula">
      <button @click="$router.go(-1)" class="btn-regresar">{{ $t('detallePelicula.backButton') }}</button>
      <div class="detalle-pelicula">
        <div class="detalle-imagen">
          <img
            :src="getImageUrl(pelicula.poster_path)"
            :alt="pelicula.title"
            class="pelicula-imagen"
            loading="lazy"
          />
        </div>
        <div class="detalle-info">
          <h1>{{ pelicula.title }}</h1>
          <p class="detalle-genero">
            <strong>{{ $t('detallePelicula.genres') }}:</strong>
            <span
              class="genero-chip"
              v-for="genero in pelicula.genres"
              :key="genero.id"
            >
              {{ genero.name }}
            </span>
          </p>
          <p class="detalle-fecha">
            <strong>{{ $t('detallePelicula.releaseDate') }}:</strong> {{ pelicula.release_date }}
          </p>
          <p class="detalle-duracion">
            <strong>{{ $t('detallePelicula.runtime') }}:</strong> {{ pelicula.runtime }} minutos
          </p>
          <p class="detalle-calificacion">
            <strong>{{ $t('detallePelicula.rating') }}:</strong> {{ pelicula.vote_average }} / 10
          </p>
          <p
            class="detalle-companias"
            v-if="pelicula.production_companies && pelicula.production_companies.length"
          >
            <strong>{{ $t('detallePelicula.productionCompanies') }}:</strong>
            <span
              v-for="compania in pelicula.production_companies"
              :key="compania.id"
            >
              {{ compania.name }}<span v-if="compania !== pelicula.production_companies.slice(-1)[0]">, </span>
            </span>
          </p>
          <p
            class="detalle-idiomas"
            v-if="pelicula.spoken_languages && pelicula.spoken_languages.length"
          >
            <strong>{{ $t('detallePelicula.languages') }}:</strong>
            <span
              v-for="idioma in pelicula.spoken_languages"
              :key="idioma.iso_639_1"
            >
              {{ idioma.name }}<span v-if="idioma !== pelicula.spoken_languages.slice(-1)[0]">, </span>
            </span>
          </p>
        </div>
      </div>
      <div class="detalle-sinopsis">
        <h2>{{ $t('detallePelicula.synopsis') }}</h2>
        <p>{{ pelicula.overview }}</p>
      </div>
    </div>
    <div v-else-if="error">
      <p class="error-message">{{ $t('detallePelicula.error') }}</p>
    </div>
    <div v-else>
      <p class="loading-message">{{ $t('detallePelicula.loading') }}</p>
    </div>
  </div>
</template>

<script>
import apiTMDB from '../api';

export default {
  name: 'DetallePelicula',
  props: ['id'],
  data() {
    return {
      pelicula: null,
      error: false,
    };
  },
  methods: {
    getImageUrl(path) {
      if (path) {
        return `https://image.tmdb.org/t/p/w500${path}`;
      } else {
        return 'https://via.placeholder.com/500x750?text=Sin+Imagen';
      }
    },
    getBackdropStyle() {
      if (this.pelicula && this.pelicula.backdrop_path) {
        return {
          backgroundImage: `url(https://image.tmdb.org/t/p/original${this.pelicula.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        };
      }
      return {
        backgroundColor: '#1c1c1c', // Fondo oscuro por defecto si no hay backdrop
      };
    },
  },
  async created() {
    if (this.id) {
      try {
        const respuesta = await apiTMDB.get(`/movie/${this.id}`);
        this.pelicula = respuesta.data;
      } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
        this.error = true;
      }
    } else {
      console.error('ID de película no proporcionado');
      this.error = true;
    }
  },
};
</script>

<style scoped>
.detalle-container {
  position: relative;
  color: #fff;
  width: 100%;
  min-height: 100vh;
  padding-top: 80px; /* Compensar el navbar fijo */
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.detalle-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Overlay oscuro */
  z-index: 1;
}

.detalle-container > * {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
}

.detalle-pelicula {
  display: flex;
  flex-wrap: wrap;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro semi-transparente */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
}

.detalle-imagen {
  flex: 1 1 300px;
  text-align: center;
  margin-bottom: 20px;
}

.detalle-imagen img {
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.detalle-imagen img:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.detalle-info {
  flex: 1 1 400px;
  padding: 20px;
}

.detalle-info h1 {
  margin-top: 0;
  font-size: 2em;
  color: #fff; /* Título en blanco */
}

.detalle-info p {
  margin: 10px 0;
  font-size: 1em;
  color: #fff; /* Texto en blanco */
}

.detalle-info strong {
  color: #fff; /* Etiquetas en blanco */
}

.detalle-sinopsis {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro semi-transparente */
  border-radius: 10px;
  padding: 20px;
}

.detalle-sinopsis h2 {
  margin-bottom: 10px;
  font-size: 1.5em;
  color: #fff; /* Título "Sinopsis" en blanco */
}

.detalle-sinopsis p {
  line-height: 1.6;
  font-size: 1em;
  color: #fff; /* Texto en blanco */
}

.btn-regresar {
  background-color: rgba(0, 123, 255, 0.8);
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s;
}

.btn-regresar:hover {
  background-color: #0056b3;
}

.genero-chip {
  display: inline-block;
  background-color: #e0e0e0;
  color: #333;
  padding: 5px 10px;
  border-radius: 15px;
  margin: 5px 5px 0 0;
  font-size: 0.9em;
}

/* Mensajes de carga y error */
.loading-message,
.error-message {
  color: #fff;
  font-size: 1.2em;
  text-align: center;
  margin-top: 50px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .detalle-pelicula {
    flex-direction: column;
    align-items: center;
  }
  .detalle-info {
    text-align: center;
  }
  .detalle-sinopsis {
    padding: 15px;
  }
}
</style>
