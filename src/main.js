/* eslint-disable indent */
import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import Vuelidate from 'vuelidate';

// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

// scss style
import './assets/scss/index.scss';

Vue.config.productionTip = false;

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
// Vuelidate
Vue.use(Vuelidate);
// axios
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
