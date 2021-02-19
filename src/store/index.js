/* eslint-disable indent */
import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './module/user';
// import logstateModule from './module/logstate';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    iflogin: false,
    logorreg: 'login',
  },
  mutations: {
    clogstate(state, payload) {
      state.iflogin = payload;
    },
    clogorregstate(state, payload) {
      state.logorreg = payload;
    },
  },
  actions: {

  },
  modules: {
    userModule,
    // logstateModule,
  },
});
