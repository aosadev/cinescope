// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import PeliculasPopulares from '../components/PeliculasPopulares.vue';
import DetallePelicula from '../components/DetallePelicula.vue';
import SearchResults from '../components/SearchResults.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PeliculasPopulares
  },
  {
    path: '/movie/:id',
    name: 'DetallePelicula',
    component: DetallePelicula,
    props: true
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults,
    props: route => ({ query: route.query.q })
  },
  // Puedes añadir más rutas aquí
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
