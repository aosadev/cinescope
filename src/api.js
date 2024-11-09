import axios from 'axios';

const apiTMDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.VUE_APP_TMDB_API_KEY,
    language: 'es-ES'
  }
});

export default apiTMDB;
