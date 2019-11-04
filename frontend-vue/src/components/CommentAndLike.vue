<template>
  <div class="comment-and-like">
    <div class="count dp-f">
      <span class="likes">{{post.likes.length}}&nbsp;{{$t('like')}}</span>
      <span class="comments">{{post.comments.length}}&nbsp;{{$t('comment')}}</span>
    </div>
    <div class="action dp-f">
      <p @click="likeClicked" :class="{ 'has-voted':hasLiked}">
        <LikeIcon width="18" />
        {{$t('likes')}}
      </p>
      <p @click="$emit('commentClicked')" :class="{ 'has-voted':hasCommented}">
        <PostCommentIcon :color="hasCommented ? theme.colors.primary.main : null" width="18" />
        {{$t('comment')}}
      </p>
    </div>
  </div>
</template>
<script>
import { PostCommentIcon, LikeIcon } from '../icons';
import { deleteLike, createLike } from '../request/like';

export default {
  data() {
    return {
      isFetching: false,
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  components: {
    PostCommentIcon,
    LikeIcon,
  },
  computed: {
    hasLiked() {
      return this.post.likes.find(like => like.user === this.authorId);
    },
    hasCommented() {
      return this.post.comments.find(
        comment => comment.author.id === this.authorId
      );
    },
  },
  methods: {
    likeClicked() {
      if (this.isFetching) return;
      const hasLike = this.post.likes.find(like => like.user === this.authorId);
      this.isFetching = true;
      if (hasLike) {
        deleteLike(hasLike);
      } else {
        createLike(this.post);
      }
      this.isFetching = false;
    },
    commentClicked() {},
  },
};
</script>
<style lang="scss" scoped>
.comment-and-like {
  padding-top: 20px;
  .count,
  .action {
    padding-bottom: 10px;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.54);
    .has-voted {
      color: $colors-primaryMain;
      svg {
        fill: $colors-primaryMain;
      }
    }
  }
  .count {
    font-size: 13px;
  }
  .action {
    align-items: center;
    border-top: 1px solid $colors-grey300;
    padding: 20px;
    font-weight: bolder;
    font-size: 14px;
    > p {
      display: flex;
      align-items: center;
      cursor: pointer;
      > svg {
        margin-right: 5px;
      }
    }
  }
}
</style>