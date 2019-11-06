import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';

Vue.use(Vuex);
let store;
export default new Vuex.Store({
  modules: {
    auth,
  },
});
