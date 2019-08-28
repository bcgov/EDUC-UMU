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
    this.inactiveTime();
  },
  mounted() {
    this.inactiveTime()
  }
  methods: {
    inactiveTime() {
      document.onload = this.resetTimer;
      document.onmousemove = this.resetTimer;
      document.onmousedown = this.resetTimer;
      document.ontouchstart = this.resetTimer;
      document.onclick = this.resetTimer;
      document.onscroll = this.resetTimer;
      document.onkeypress = this.resetTimer;
    },
    logout() {
      location.href = AuthRoutes.LOGOUT;
    },
    resetTimer() {
      clearTimeout(this.interval);
      this.interval = setTimeout(this.countDown, 10000);
    },
    countDown () {
      clearTimout(this.interval);
      this.logout();
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
