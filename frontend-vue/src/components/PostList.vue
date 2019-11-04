<template>
  <div class="post-list">
    <ul v-if="getFollowedPosts">
      <li is="PostItem" v-for="post in getFollowedPosts.posts" :key="post.id" :post="post"></li>
    </ul>
  </div>
</template>
<script>
import PostItem from './PostItem';
import * as postSql from '../../graphql/post';
import * as likeSql from '../../graphql/like';
import * as commentSql from '../../graphql/comment';
import { createComment } from '../request/comment';
import { deleteLike, createLike } from '../request/like';
export default {
  data() {
    return {
      limit: 10,
      skip: 0,
      post: null,
      isFetching: false,
    };
  },
  apollo: {
    getFollowedPosts: {
      query: postSql.GET_FOLLOWED_POSTS,
      variables() {
        return {
          limit: this.limit,
          skip: this.skip,
          userId: this.authorId,
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
};
</script>
<style lang="scss" scoped>
.post-list {
  > ul {
    margin-top: 40px;
  }
}
</style>