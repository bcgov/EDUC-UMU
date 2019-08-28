<template>
  <v-app id="app">
    <Header/>
    <router-view/>
    <Footer/>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import { AuthRoutes } from '@/utils/constants.js';
import Header from './components/Header';
import Footer from './components/Footer';

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapGetters('auth', ['getJwtToken'])
  },
  created() {
    this.$store.dispatch('auth/getJwtToken');
  },
  mounted() {
    if(!(window.localSotrage.getItem('jwtToken')){
      location.href = AuthRoutes.LOGOUT;
    }
  }
};
</script>

<style>
.v-card--flat {
  background-color: transparent !important;
}
.theme--light.application{
  background: #f1f1f1;
}
</style>
