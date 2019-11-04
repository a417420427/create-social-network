<template>
  <div class="post-list-comment">
    <div class="create-comment">
      <textarea :placeholder="$t('addComment')" v-model="commentContent"></textarea>
      <p
        @click="createComment(commentContent)"
        :class="{'not-empty': commentContent}"
        class="post-comment"
      >{{$t('post')}}</p>
    </div>
  </div>
</template>
<script>
import { UserIcon, CloseIcon } from '../icons';
import { createComment } from '../request/comment';

export default {
  data() {
    return {
      commentContent: '',
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  components: {
    UserIcon,
    CloseIcon,
  },
  methods: {
    async createComment(commentContent) {
      await createComment({ comment: commentContent, postId: this.post.id });
      this.commentContent = '';
    },
  },
};
</script>
<style lang="scss" scoped>
.post-list-comment {
  border-top: 1px solid $colors-grey300;
  .create-comment {
    position: relative;
    box-sizing: border-box;
    padding: 10px 60px 10px 0;
    textarea {
      outline: 0;
      height: 50px;
      width: 100%;
      resize: none;
      border: 0;
      padding-top: 10px;
      font-size: 14px;
    }
    > p {
      position: absolute;
      top: 10px;
      right: 0;
      line-height: 36px;
      color: $colors-textSecondary;
      cursor: pointer;
      &.not-empty {
        color: $colors-primaryMain;
      }
    }
  }
}
</style>