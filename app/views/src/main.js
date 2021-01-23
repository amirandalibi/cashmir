'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { routes, sidebar, registerForm } from './vue.router';

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.use(Vuex);
Vue.use(VueRouter);

new Vue({
  el: '.cashmir-app',
  router,
  components: {
    sidebar,
    'register-form': registerForm
  }
});
