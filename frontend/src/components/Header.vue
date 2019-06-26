<template>
  <header class="gov-header">
    <v-toolbar>
      <!-- Navbar content -->
      <a href="https://www2.gov.bc.ca">
        <img
          src="@/assets/images/bcid-logo-rev-en.svg"
          width="152"
          height="55"
          alt="B.C. Government Logo"
        >
      </a>

      <v-toolbar-title>
        <v-btn class="title hidden-sm-and-down" color="text" flat>{{ appTitle }}</v-btn>
      </v-toolbar-title>

      <div>
        <v-btn flat id="nav-home"><router-link to="/">View Users</router-link></v-btn>
        <v-btn flat id="nav-user-form"><router-link to="/add_user">Add User</router-link></v-btn>
      </div>
      
      <v-spacer></v-spacer>

      <div v-if="isAuthenticated">
        <v-btn flat id="nav-logout" @click="clearStorage" :href="authRoutes.LOGOUT">Logout</v-btn>
      </div>
      <v-btn v-else flat id="nav-login" @click="clearStorage" :href="authRoutes.LOGIN">Login</v-btn>
    </v-toolbar>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import { AuthRoutes } from '@/utils/constants.js';
export default {
  data() {
    return {
      authRoutes: AuthRoutes,
      appTitle: process.env.VUE_APP_TITLE
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    clearStorage() {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('refreshToken');
    }
  }
};
</script>


<style>
.gov-header .title {
  color: #fff;
  text-decoration: none;
}
.gov-header .v-toolbar {
  background-color: rgb(0, 51, 102);
  border-bottom: 2px solid rgb(252, 186, 25);
}
.gov-header .v-btn,
.v-btn--active.title:before,
.v-btn.title:focus:before,
.v-btn.title:hover:before {
  color: #fff;
  background: none;
}
.secondary_color {
  background-color: var(--v-secondary-base);
}
</style>