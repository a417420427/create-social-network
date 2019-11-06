import { getAuthUser } from '../request/user';
import { getAuthInfoSync } from '../request/user';

export const initState = {
  id: null,
  username: null,
  email: null,
  fullName: null,
  image: null,
  imagePublicId: null,
  coverImage: null,
  coverImagePublicId: null,
  createdAt: 0,
  newNotifications: [],
  likes: [],
  posts: [],
  following: [],
  followers: [],
};

const mutations = {
  setAuthUser(state, payload) {
    Object.keys(payload).forEach(key => {
      state[key] = payload[key];
    });
  },
  deletePost(state, id) {
    state.posts = state.posts.filter(post => post.id !== id);
  },
};

const actions = {
  async initAuthUser({ commit }) {
    const user = await getAuthUser();
    if (user) {
      commit('setAuthUser', user.data.getAuthUser);
    }
  },
};

export default {
  namespaced: true,
  state: initState,
  mutations,
  actions,
};
