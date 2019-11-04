<template>
  <div class="app-header dp-f">
    <div class="app-header-left dp-f">
      <div class="menu" @click="$emit('toggleMenu')">
        <MenuIcon />
      </div>
      <div class="search">
        <input type="text" placeholder="search" />
        <SearchIcon />
      </div>
    </div>
    <div class="app-header-right dp-f">
      <div class="notice">
        <NotificationIcon />
      </div>
      <div class="user">
        <UserIcon />
      </div>
    </div>
  </div>
</template>
<script>
import { SearchIcon, NotificationIcon, UserIcon, MenuIcon } from '../icons';

export default {
  components: {
    SearchIcon,
    NotificationIcon,
    UserIcon,
    MenuIcon,
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
$blue: #565cd8;
$purple: #987dff;
$red: #fb6761;
$yellow: #ffbc00;
$green: #1dc7a4;
.app-header {
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 30;
  height: 60px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 8px 0px;
  align-items: center;
  * {
    box-sizing: border-box;
  }
  &-left {
    height: 40px;
    .menu {
      width: 60px;
      height: 40px;
      padding: 11px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      > svg {
        cursor: pointer;
      }
    }
    .search {
      max-width: 280px;
      height: 40px;
      margin-right: 30px;
      position: relative;
      > input {
        outline: 0;
        height: 40px;
        width: 100%;
        border: 0;
        border-radius: 3px;
        padding-left: 40px;
        padding-right: 40px;
        font-size: 14px;
        background-color: #eeeeee;
        transition: border-color 0.1s;
      }
      > svg {
        position: absolute;
        top: 12px;
        left: 12px;
      }
    }
  }
  &-right {
    .notice {
      margin-right: 30px;
      height: 24px;
    }
    .user {
      height: 28px;
      margin-right: 20px;
    }
  }
}
</style>