import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/Home.vue';
import { AuthRoutes } from '@/utils/constants';
import store from './store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      name: 'notfound',
      redirect: '/'
    }
  ]
});

// Checks authentication BEFORE rendering to show (or not) password protected locations
router.beforeEach((to, _from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      // next('login');
      window.location.href = AuthRoutes.LOGIN;
    }
  }
  next();
});

export default router;
