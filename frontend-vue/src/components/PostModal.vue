<template>
  <div class="post-modal modal-common" @click="hideModal">
    <div ref="operate" class="operate-content">
      <p class="copy-link" @click="copyLink">{{$t('copyLink')}}</p>
      <p class="delete-post" @click="confirmDelete">{{$t('deletePost')}}</p>
      <p @click="$emit('closeModal')" class="cancel">{{$t('cancel')}}</p>
    </div>
  </div>
</template>
<script>
import { deletePost } from '../request/post';
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    copyLink() {
      navigator.clipboard.writeText(`${location.host}/post/${this.post.id}`);
      this.$emit('closeModal');
    },
    async confirmDelete(post) {
      const limit = 10;
      const skip = 0;
      deletePost({ limit, skip, postId: this.post.id });
    },
    hideModal(e) {
      if (!this.$refs.operate.contains(e.target)) {
        this.$emit('closeModal');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.post-modal {
  .operate-content {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -60px;
    > p {
      padding: 20px 0;
      width: 100%;
      line-height: 16px;
      text-align: center;
      background: #fff;
      color: $colors-textSecondary;
    }
  }
}
</style>