<template>
  <li
    class="explore-item"
    @click="exploreDetailVisiable=true"
    :style="{backgroundImage: `url(${post.image})`}"
  >
    <div @click="hideDetail" v-if="exploreDetailVisiable" class="post-detail modal-common">
      <div ref="exploreContent" class="explore-content">
        <div class="explore-content-info">
          <img v-if="post.image" :src="post.image" />
          <div class="info dp-f">
            <div class="user">
              <UserIcon />
              {{post.author.username}}
            </div>
            <Follow :user="post.author" />
          </div>
          <div class="title">{{post.title}}</div>
        </div>
        <div class="explore-content-block">
          <CommentAndLike :post="post" />
          <CommentsList :comments="post.comments" />
          <CreateComment :post="post" />
        </div>
      </div>
    </div>
  </li>
</template>
<script>
import { UserIcon } from '../icons';
import * as followSql from '../../graphql/follow';
import CreateComment from './CreateComment';
import CommentAndLike from './CommentAndLike';
import CommentsList from './CommentsList';
import Follow from './Follow';
import { createFollow, deleteFollow } from '../request/follow.js';
export default {
  data() {
    return {
      exploreDetailVisiable: false,
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
    CreateComment,
    CommentsList,
    CommentAndLike,
    Follow,
  },
  computed: {
    author() {
      return this.post.author;
    },
    isFollowed() {
      return this.following.find(follow => follow.user === this.author.id);
    },
  },
  methods: {
    hideDetail(e) {
      e.stopPropagation();
      if (!this.$refs.exploreContent.contains(e.target)) {
        this.exploreDetailVisiable = false;
      }
    },
    handleCancel(e) {
      if (e.keyCode === 27) {
        this.exploreDetailVisiable = false;
      }
    },
    async followClicked() {
      if (this.isFollowed) {
        await deleteFollow(this.isFollowed.id);
      } else {
        await createFollow(this.post.author.id);
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleCancel);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleCancel);
  },
};
</script>
<style lang="scss" scoped>
.explore-item {
  background-size: cover;
  .post-detail {
    z-index: $zIndex-xl + 1;
  }
  .explore-content {
    background: #fff;
    box-sizing: border-box;
    &-info {
      > img {
        width: 100%;
      }
      .info {
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        line-height: 30px;
        border-bottom: 1px solid $colors-grey300;
        .user {
          color: $colors-grey500;
          display: flex;
          align-items: center;
          > svg {
            margin-right: 10px;
          }
        }
        .follow {
          color: $colors-primaryMain;
          &.is-followed {
            color: #333;
          }
        }
      }

      .title {
        border-bottom: 1px solid $colors-body;
        padding: 0 20px;
        line-height: 36px;
      }
    }
    &-block {
      padding: 0 20px;
    }
  }
}
</style>