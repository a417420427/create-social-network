<template>
  <div class="create-post">
    <input
      ref="uploadTarget"
      @change="onUpload"
      style="display: none;"
      type="file"
      accept="image/*"
      name="file"
    />
    <div class="post-content" ref="addPost" :class="{'is-editing': isEditing}">
      <UserIcon class="user-icon" width="40" />
      <textarea v-model="postTitle" @click="startEdit" :placeholder="$t('addPost')" />
      <div v-if="!isEditing" class="post-image" @click="startUpload">
        <UploadImageIcon width="20" />
      </div>

      <div v-if="isEditing" class="post-editing">
        <div v-if="fileSrc" class="post-file">
          <img :src="fileSrc" alt />
        </div>
        <div class="phone" @click="startUpload">
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
import { mapState } from 'vuex';
import { createPost } from '../request/post';
import { getObjectURL } from '../utils/file';
export default {
  data() {
    return {
      postTitle: '',
      isEditing: false,
      fileSrc: null,
      file: '',
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
      const image = this.file;
      const limit = 10;
      const skip = 0;
      const result = await createPost({ title, image, skip, limit });
      if (result && result.data) {
        this.isEditing = false;
        this.postTitle = '';
        this.file = '';
        this.fileSrc = '';
      }
    },
    startUpload() {
      this.$refs.uploadTarget.click();
    },
    onUpload(e) {
      const files = e.target.files;
      if (files) {
        Array.prototype.map.call(files, file => {
          this.file = file;
          this.fileSrc = getObjectURL(file);
        });
      }
      this.isEditing = true;
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
    top: 120px;
    left: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 20px;
    width: 100%;
    border-top: 1px solid $colors-grey200;
    background: #fff;
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
    .post-file {
      height: 150px;
      width: 100%;
      text-align: center;
      > img {
        height: 150px;
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