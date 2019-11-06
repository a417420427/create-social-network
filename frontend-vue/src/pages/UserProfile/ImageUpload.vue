<template>
  <div class="image-container" @click="uploadImage">
    <UserIcon v-if="!image" width="100" />
    <img v-else :src="image" class="avator" />
    <input @change="fileChange" ref="file" type="file" accept="image/*" style="display:none;" />
  </div>
</template>
<script>
import { UserIcon } from '../../icons';
import { mapState } from 'vuex';
import { getObjectURL } from '../../utils/file';
import { uploadPhoto } from '../../request/user';

export default {
  data() {
    return {
      file: '',
    };
  },
  components: {
    UserIcon,
  },
  computed: {
    ...mapState('auth', ['imagePublicId', 'image']),
  },
  methods: {
    uploadImage() {
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
          imagePublicId: this.imagePublicId,
        });
        console.log(result);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.image-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: -50px auto 0;
  overflow: hidden;
  .avator {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>