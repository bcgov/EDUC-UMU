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

      <v-toolbar-title><h3 style="color:white">{{ appTitle }}</h3></v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="isAuthenticated">
        <!--
        <v-btn dark text tile id="nav-home" color="text" :to="{ path: '/'}">View Users</v-btn>
        <v-btn dark text tile id="nav-user-form" color="text" :to="{ path: '/password'}">Password Reset</v-btn>
        -->
        <v-btn dark text tile id="nav-logout" @click="clearStorage" :href="authRoutes.LOGOUT">Logout</v-btn>
      </div>
      <div v-else>
        <!--
        <v-btn dark disabled tile text id="nav-home" :to="{ path: '/'}">View Users</v-btn>
        <v-btn dark disabled tile text id="nav-user-form" :to="{ path: '/password'}">Password Reset</v-btn>
        -->
        <v-btn dark text tile id="nav-login" @click="clearStorage" :href="authRoutes.LOGIN">Login</v-btn>
      </div>
    </v-toolbar>
    <v-system-bar dark color="#d93e45" v-if="accessDenied">
      <v-icon>error</v-icon>
      You are not permitted to access this site.
    </v-system-bar>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import { AuthRoutes } from '@/utils/constants.js';
export default {
  data(){
    return {
      authRoutes: AuthRoutes,
      appTitle: 'User Management Utility'
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('auth', ['accessDenied'])
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
