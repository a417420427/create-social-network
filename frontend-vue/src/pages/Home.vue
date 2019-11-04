<template>
  <div class="page-home">
    <div class="page-home-wrapper">
      <CreatePost />
      <PostList />
    </div>
  </div>
</template>
<script>
import PostList from '../components/PostList';
import CreatePost from '../components/CreatePost';

export default {
  data() {
    return {};
  },
  components: {
    PostList,
    CreatePost,
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.page-home {
  &-wrapper {
    padding: 40px 20px 0;
  }
}
</style>