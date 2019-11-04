<template>
  <div class="create-post">
    <div class="post-content" ref="addPost" :class="{'is-editing': isEditing}">
      <UserIcon class="user-icon" width="40" />
      <textarea v-model="postTitle" @click="startEdit" :placeholder="$t('addPost')" />
      <div v-if="!isEditing" class="post-image">
        <UploadImageIcon width="20" />
      </div>
      <div v-if="isEditing" class="post-editing">
        <div class="phone">
          <UploadImageIcon width="20" />
          <span>{{$t('phone')}}</span>
        </div>
        <div class="operate">
          <span @click="isEditing=false">{{$t('cancel')}}</span>
          <span class="share" @click="confirmCreate">{{$t('share')}}</span>
        </div>
      </div>
    </div>
    <div @click="hideModal" class="operate-post" v-if="isEditing"></div>
  </div>
</template>
<script>
import { UserIcon, UploadImageIcon } from '../icons';
import * as postSql from '../../graphql/post';
import * as userSql from '../../graphql/user';
import { mapState } from 'vuex';
import { createPost } from '../request/post';
export default {
  data() {
    return {
      postTitle: '',
      isEditing: false,
    };
  },
  computed: {
    ...mapState('auth', ['id', 'username']),
  },
  components: {
    UserIcon,
    UploadImageIcon,
  },
  methods: {
    startEdit() {
      this.isEditing = true;
    },
    hideModal(e) {
      if (!this.$refs.addPost.contains(e.target)) this.isEditing = false;
    },
    async confirmCreate() {
      if (!this.postTitle) return;
      const title = this.postTitle;
      const image = '';
      const limit = 10;
      const skip = 0;
      const result = await createPost({ title, image, skip, limit });
      if (result && result.data) {
        this.isEditing = false;
        this.postTitle = '';
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.post-content {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-radius: 3px;
  border: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: #fff;
  .user-icon {
    height: 40px;
  }
  textarea {
    box-sizing: border-box;
    width: 100%;
    margin: 0 10px;
    padding-left: 20px;
    padding-top: 10px;
    line-height: 20px;
    height: 40px;
    border: 0;
    outline: none;
    resize: none;
    -webkit-transition: 0.1s ease-out;
    transition: 0.1s ease-out;
    font-size: 14px;
    background-color: #f5f5f5;
    border-radius: 6px;
  }
  .post-image {
    padding: 9px 14px;
    height: 24px;
    font-weight: 600;
    border-radius: 12px;
    background-color: #f5f5f5;
  }
  .post-editing {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 20px;
    height: 80px;
    width: 100%;
    border-top: 1px solid $colors-grey200;
    .phone {
      margin: 20px 0;
      padding: 0 10px;
      background: $colors-grey100;
      display: flex;
      align-items: center;
      border-radius: 5px;
      > svg {
        margin-right: 5px;
      }
    }
    .operate {
      padding: 20px 0;
      > span {
        display: inline-block;
        line-height: 36px;
        border-radius: 4px;
        width: 80px;
        text-align: center;
        &.share {
          background-color: $colors-grey500;
          color: #fff;
        }
      }
    }
  }
  &.is-editing {
    z-index: $zIndex-xl + 1;
    padding-bottom: 100px;
    textarea {
      height: 80px;
    }
  }
}
.operate-post {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: $zIndex-xl;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>