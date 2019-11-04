<template>
  <div class="user-card">
    <div class="user-card-icon"></div>
    <div class="user-card-fullname">{{user.fullName}}</div>
    <div class="user-card-name">@ {{user.username}}</div>
    <Follow class="user-card-follow" :user="user" />
  </div>
</template>
<script>
import Follow from '../components/Follow';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    Follow,
  },
};
</script>
<style lang="scss" scoped>
.user-card {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  height: 280px;
  background-color: white;
  box-shadow: $shadows-sm;
  padding: 20px;
  border-radius: 3px;
  transition: border-color 0.1s ease 0s;
  &-icon {
    width: 100px;
    height: 100px;
    background-color: rgb(52, 168, 83);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    line-height: 100px;
    border-radius: 50%;
    color: #fff;
    &:before {
      content: 'T';
    }
  }
  &-fullname {
    margin-top: 20px;
    margin-bottom: 10px;
    color: $colors-textSecondary;
    font-size: 14px;
  }
  &-name {
    font-size: 14px;
    color: $colors-textPrimary;
  }
  &-follow {
    display: inline-block;
    margin-top: 40px;
  }
}
</style>
