import { getFollowedPosts, deletePost, createPost } from '../request/post';
import { createLike } from '../request/like';
import { getUserPosts } from '../request/user';

const state = {
  posts: [],
  limit: 10,
  skip: 0,
  currentPost: null,
};

const mutations = {
  initPosts(state, posts) {
    state.posts = posts;
  },
  deletePost(state, id) {
    state.posts = state.posts.filter(post => post.id !== id);
  },
  setCurrent(state, id) {
    state.currentPost = state.posts.find(post => post.id === id);
  },
};

const actions = {
  async getPosts({ state, rootState, commit }) {
    const followedPosts = await getUserPosts({
      limit: state.limit,
      skip: state.skip,
      username: rootState.auth.username,
    });
    console.log(followedPosts);
    commit('initPosts', followedPosts.data.getUserPosts.posts);
  },
  async createPost(
    { state, dispatch, rootDispatch, rootState },
    { title, image = '' }
  ) {
    const result = await createPost({
      title,
      image,
      authorId: rootState.auth.id,
      username: rootState.auth.username,
    });
    return result;

    // if (result) {
    //   setTimeout(() => {
    //     dispatch('getPosts');
    //     console.log(state.posts);
    //   }, 2000);
    // }
  },
  async deletePost({ state, commit }, { id }) {
    const result = await deletePost({ id });
    if (result) {
      commit('deletePost', id);
      return result;
    }
  },
  async createLike({ state, rootState }, post) {
    const index = state.posts.indexOf(post);
    if (index !== -1) {
      state.posts = [
        ...state.posts.slice(0, index),
        {
          ...post,
          likes: post.likes.push({
            user: rootState.auth.id,
            post: post.id,
            id: post.id,
          }),
        },
        ...state.posts.slice(index + 1),
      ];
    }
    // const result = await createLike({
    //   postId: post.id,
    //   userId: post.author.id,
    // });
    // if(result) {

    // }
    // console.log(request);
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
