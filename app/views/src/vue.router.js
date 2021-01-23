'use strict';

import sidebar from './components/sidebar.vue';
import registerForm from './components/registerForm.vue';
import loginForm from './components/loginForm.vue';
import landing from './components/landing.vue';
import dashboard from './components/dashboard.vue';

module.exports = {
  routes: [
    { name: 'landing', path: '/', component: landing},
    { name: 'dashboard', path: '/dashboard', component: dashboard },
    { name: 'registerForm', path: '/register', component: registerForm },
    { name: 'loginForm', path: '/login', component: loginForm }
  ],
  sidebar,
  registerForm,
  loginForm,
  landing
}
