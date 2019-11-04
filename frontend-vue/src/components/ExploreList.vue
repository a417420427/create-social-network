<template>
  <ul class="explore-list">
    <li is="ExploreItem" v-for="post in getPosts.posts" :key="post.id" :post="post"></li>
  </ul>
</template>
<script>
import * as postSql from '../../graphql/post';
import ExploreItem from './ExploreItem';
export default {
  data() {
    return {
      limit: 15,
      skup: 0,
      getPosts: {
        posts: [],
        count: '0',
      },
    };
  },
  apollo: {
    getPosts: {
      query: postSql.GET_POSTS,
      variables() {
        return {
          limit: this.limit,
          skip: this.skip,
          authUserId: this.authorId,
        };
      },
    },
  },
  components: { ExploreItem },
};
</script>
<style lang="scss" scoped>
.explore-list {
  margin-top: 40px;
  box-sizing: border-box;
  padding: 0 20px;
  > li {
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
  }
}
</style>