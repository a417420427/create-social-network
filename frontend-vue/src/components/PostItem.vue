<template>
  <div class="post">
    <div class="post-header dp-f">
      <UserIcon width="30" />
      <div class="user-info">
        <p>{{post.author.fullName}}</p>
        <p>{{generateTime(post.createdAt) }}</p>
      </div>
      <div class="show-more" @click="postVisiable=true">
        <DotsIcon />
      </div>
    </div>
    <div class="post-title">{{post.title}}</div>
    <div class="post-image" v-if="post.image">
      <img :src="post.image" alt />
    </div>
    <CommentAndLike @commentClicked="commentVisiable=!commentVisiable" :post="post" />
    <CreateComment v-if="commentVisiable" :post="post" />
    <CommentsList v-if="commentVisiable" :comments="post.comments" />
    <PostModal
      @deletePost="$emit('deletePost')"
      @closeModal="postVisiable=false"
      v-if="postVisiable"
      :post="post"
    />
  </div>
</template>
<script>
import {
  CloseIcon,
  UserIcon,
  LikeIcon,
  DotsIcon,
  PostCommentIcon,
} from '../icons';
import PostModal from './PostModal';
import CreateComment from './CreateComment';
import CommentsList from './CommentsList';
import CommentAndLike from './CommentAndLike';
import { timeAgo } from '../utils/time-ago';

export default {
  data() {
    return {
      showComment: false,
      commentVisiable: false,
      postVisiable: false,
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  components: {
    CloseIcon,
    UserIcon,
    LikeIcon,
    DotsIcon,
    PostCommentIcon,
    CreateComment,
    PostModal,
    CommentsList,
    CommentAndLike,
  },
  methods: {
    generateTime(createdAt) {
      const { interval, unit } = timeAgo(createdAt);
      return interval + this.$t(unit);
    },
    commentClicked(post) {
      this.commentVisiable = !this.commentVisiable;
    },
  },
};
</script>
<style lang="scss" scoped>
.post {
  margin-bottom: 40px;
  border-radius: 3px;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: $shadows-sm;
  &-header {
    position: relative;
    .user-info {
      margin-left: 10px;
      p:nth-child(1) {
        font-size: 14px;
        font-weight: 600;
        color: #3f51b5;
      }
      p:nth-child(2) {
        font-size: 13px;
        color: $colors-textHint;
        margin-top: 2px;
      }
    }
    .show-more {
      position: absolute;
      right: 20px;
      top: 5px;
    }
  }
  &-title {
    margin-top: 20px;
    line-height: 16px;
  }
  &-image {
    margin-bottom: 20px;
    > img {
      width: 100%;
    }
  }
}
</style>