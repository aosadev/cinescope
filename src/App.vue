<template>
  <div id="app">
    <AppNavbar />
    <router-view />
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';

export default {
  name: 'App',
  components: {
    AppNavbar
  }
};
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6 {
  color: #333;
  margin: 10px 0;
}

a {
  color: inherit;
  text-decoration: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>

