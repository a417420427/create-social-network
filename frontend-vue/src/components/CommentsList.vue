<template>
  <ul class="comment-list" v-if="comments.length>0">
    <li v-for="comment in comments" :key="comment.id">
      <UserIcon width="30" />
      <div class="comment-detail">
        <div class="delete-comment" @click="deleteComment(comment.id)">
          <CloseIcon width="10" />
        </div>
        <span>{{comment.author.fullName}}</span>
        {{comment.comment}}
      </div>
    </li>
  </ul>
</template>
<script>
import { CloseIcon, UserIcon } from '../icons';
import { deleteComment } from '../request/comment';

export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  components: {
    CloseIcon,
    UserIcon,
  },
  methods: {
    async deleteComment(id) {
      await deleteComment(id);
    },
  },
};
</script>
<style lang="scss" scoped>
.comment-list {
  padding-top: 10px;
  border-top: 1px solid $colors-grey300;
  > li {
    display: flex;
    align-items: center;
    line-height: 30px;
    padding: 5px 0;
    > svg {
      margin-right: 5px;
    }
    > .comment-detail {
      position: relative;
      padding: 0 40px 0 10px;
      background-color: $colors-grey100;
      border-radius: 12px;
      color: $colors-textSecondary;
      font-size: 14px;
      > span {
        color: $colors-primaryMain;
        cursor: pointer;
      }
      &:hover {
        .delete-comment {
          display: flex;
        }
      }
      .delete-comment {
        display: none;
        position: absolute;
        width: 10px;
        height: 10px;
        right: 10px;
        top: 10px;
      }
    }
  }
}
</style>