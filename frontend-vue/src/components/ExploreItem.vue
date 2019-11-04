<template>
  <li
    class="explore-item"
    @click="postDetailVisiable=true"
    :style="{backgroundImage: `url(${post.image})`}"
  >
    <div v-if="postDetailVisiable" class="post-detail modal-common">
      <div class="explore-content">
        <div class="explore-info">
          <img v-if="post.image" :src="post.image" />
          <div class="info dp-f">
            <div class="user">
              <UserIcon />
              {{post.author.username}}
            </div>
            <div
              :class="{'is-followed': isFollowed}"
              class="follow"
              @click="followClicked"
            >{{isFollowed? $t('following') : $t('follow')}}</div>
          </div>
          <div class="title">{{post.title}}</div>
        </div>
        <div class="explore-block">
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
import { createFollow, deleteFollow } from '../request/follow.js';
export default {
  data() {
    return {
      postDetailVisiable: false,
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
  },
  computed: {
    isFollowed() {
      console.log(this.following, this.post.author.id);
      return this.following.find(follow => follow.user === this.post.author.id);
    },
  },
  methods: {
    async followClicked() {
      if (this.isFollowed) {
        await deleteFollow(this.post.author.id);
      } else {
        await createFollow(this.post.author.id);
      }
    },
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
  }

  .explore-info {
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

  .explore-block {
    padding: 0 20px;
  }
}
</style>