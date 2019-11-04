import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import { getAuthInfoSync } from '../request/user';

Vue.use(Vuex);
let store;
export default async () => {
  store = new Vuex.Store({
    modules: {
      auth,
    },
  });
  const authInfo = await getAuthInfoSync();
  Vue.prototype.authorId = store.state.auth.id;
  Vue.prototype.username = store.state.auth.username;
  Vue.prototype.following = store.state.auth.following;
  window.store = store;

  return store;
};
