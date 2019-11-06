<template>
  <div class="page-profile">
    <CoverUpload />
    <ImageUpload />
    <div class="page-profile-create">
      <CreatePost />
    </div>
    <ul class="user-post-list">
      <li is="PostItem" v-for="post in getUserPosts.posts" :key="post.id" :post="post"></li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import CoverUpload from './CoverUpload';
import ImageUpload from './ImageUpload';
import CreatePost from '../../components/CreatePost';
import { GET_USER_POSTS } from '../../graphql/user';
import PostItem from '../../components/PostItem';

export default {
  data() {
    return {
      getUserPosts: {
        posts: [],
        count: 0,
      },
    };
  },
  apollo: {
    getUserPosts: {
      query: GET_USER_POSTS,
      variables() {
        return {
          skip: 0,
          limit: 6,
          username: this.username,
        };
      },
    },
  },
  computed: {
    ...mapState('auth', ['following', 'followers', 'posts', 'username']),
  },
  components: {
    CoverUpload,
    ImageUpload,
    CreatePost,
    PostItem,
  },
};
</script>
<style lang="scss" scoped>
.page-profile {
  width: 100%;
  height: 100%;
  &-create {
    margin-top: 30px;
    padding: 0 20px;
  }
  .user-post-list {
    margin-top: 20px;
    padding: 0 20px;
  }
}
</style>