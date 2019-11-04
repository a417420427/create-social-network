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
  if (authInfo) {
    Vue.prototype.authorId = authInfo.id;
    Vue.prototype.username = authInfo.username;
    Vue.prototype.following = authInfo.following;
  } else {
    Vue.prototype.authorId = null;
  }

  window.store = store;

  return store;
};
