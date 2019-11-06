<template>
  <div class="cover-container" :style="backgroundStyle">
    <div @click="uploadCover" class="upload-cover">
      <UploadImageIcon />
    </div>
    <input @change="fileChange" ref="file" type="file" accept="image/*" style="display:none;" />
  </div>
</template>
<script>
import { UploadImageIcon } from '../../icons';
import { getObjectURL } from '../../utils/file';
import { mapState } from 'vuex';
import background from './background.jpg';
import { uploadPhoto } from '../../request/user';

export default {
  data() {
    return {
      file: '',
    };
  },
  components: {
    UploadImageIcon,
  },
  computed: {
    ...mapState('auth', ['coverImage', 'coverImagePublicId']),
    backgroundStyle() {
      const url = this.coverImage ? this.coverImage : background;
      return {
        backgroundImage: `url(${url})`,
      };
    },
  },
  methods: {
    uploadCover() {
      this.$refs.file.click();
    },
    async fileChange(e) {
      const files = e.target.files;
      if (files) {
        Array.prototype.map.call(files, file => {
          this.file = file;
          this.fileSrc = getObjectURL(file);
        });
      }
      if (this.file) {
        const result = await uploadPhoto({
          image: this.file,
          imagePublicId: this.coverImagePublicId,
          isCover: true,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.cover-container {
  width: 100%;
  height: 350px;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  .upload-cover {
    padding-left: 20px;
    padding-top: 20px;
  }
}
</style>