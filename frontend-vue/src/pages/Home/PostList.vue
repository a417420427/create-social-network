<template>
  <div class="post-list">
    <ul v-if="getFollowedPosts">
      <li is="PostItem" v-for="post in getFollowedPosts.posts" :key="post.id" :post="post"></li>
    </ul>
  </div>
</template>
<script>
import PostItem from './PostItem';
import { GET_FOLLOWED_POSTS } from '../../graphql/post';
import { createComment } from '../../request/comment';
import { deleteLike, createLike } from '../../request/like';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      limit: 10,
      skip: 0,
      post: null,
      isFetching: false,
    };
  },
  computed: {
    ...mapState('auth', ['id']),
  },
  apollo: {
    getFollowedPosts: {
      query: GET_FOLLOWED_POSTS,
      variables() {
        return {
          limit: this.limit,
          skip: this.skip,
          userId: this.id,
        };
      },
    },
  },
  components: {
    PostItem,
  },
  methods: {
    createComment,
  },
  created() {
    console.log(this.$apollo, 'xx');
  },
};
</script>
<style lang="scss" scoped>
.post-list {
  > ul {
    margin-top: 40px;
  }
}
</style>