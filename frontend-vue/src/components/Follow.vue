<template>
  <div class="follow-button">
    <button @click="followClicked">{{isFollowed ? $t('following') : $t('follow')}}</button>
  </div>
</template>
<script>
import { deleteFollow, createFollow } from '../request/follow';
import { mapState } from 'vuex';
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('auth', ['following']),
    isFollowed() {
      return this.following.find(f => f.user === this.user.id);
    },
  },
  methods: {
    async followClicked() {
      let result;
      if (this.isFollowed) {
        result = await deleteFollow(this.isFollowed.id, this.user.username);
      } else {
        result = await createFollow(this.user.id, this.user.username);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.follow-button {
  > button {
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    color: #fff;
    background-color: rgb(63, 81, 181);
    outline: none;
    transition: background-color 0.2s ease 0s, border-color 0.1s ease 0s;
    border-radius: 3px;
    padding: 5px 15px;
    border: none;
  }
}
</style>