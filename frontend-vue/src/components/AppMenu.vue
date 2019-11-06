<template>
  <div class="app-menu" @click="hideMenu">
    <div class="app-menu-wrapper" ref="wrapper" :class="{
      active: menuVisiable
    }">
      <div class="app-menu-user">
        <a @click="toggleMenu(`/${username}`)">
          <UserIcon width="20" />
          <span>{{username}}</span>
        </a>
      </div>
      <ul class="app-menu-tab">
        <li v-for="tab in tabs" :key="tab.icon">
          <a @click="toggleMenu(tab.path)" :class="{selected: $route.path === tab.path}">
            <div :is="tab.icon"></div>
            <span>{{$t(tab.name)}}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {
  UserIcon,
  HomeIcon,
  ExploreIcon,
  PeopleIcon,
  NotificationIcon,
} from '../icons';
import { mapState } from 'vuex';

export default {
  name: 'AppMenu',
  computed: {
    ...mapState('auth', ['username']),
  },
  data() {
    return {
      tabs: [
        {
          icon: 'HomeIcon',
          path: '/',
          name: 'home',
        },
        {
          icon: 'ExploreIcon',
          path: '/explore',
          name: 'explore',
        },
        {
          icon: 'PeopleIcon',
          path: '/people',
          name: 'people',
        },
        {
          icon: 'NotificationIcon',
          path: '/notifications',
          name: 'notifications',
        },
      ],
    };
  },
  props: {
    menuVisiable: Boolean,
  },
  components: {
    UserIcon,
    HomeIcon,
    ExploreIcon,
    PeopleIcon,
    NotificationIcon,
  },
  methods: {
    toggleMenu(path) {
      if (path === this.$route.path) {
        return;
      }
      this.$router.push(path);
      this.$emit('toggleMenu');
    },
    hideMenu(e) {
      if (e.target.contains(this.$refs.wrapper)) {
        this.$emit('toggleMenu', false);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.app-menu {
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  height: 100%;
  // width: 100%;
  padding-top: 60px;
  font-size: 13px;
  z-index: 20;
  * {
    box-sizing: border-box;
  }
  &-wrapper {
    margin-left: -240px;
    height: 100%;
    width: 240px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: margin-left 0.2s ease-in-out;
    background-color: #fff;
    &.active {
      margin-left: 0;
    }
  }
  &-user {
    padding-top: 40px;
    padding-bottom: 20px;
    > a {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      line-height: 20px;
      font-weight: 600;
      > span {
        margin-left: 10px;
      }
    }
  }
  &-tab {
    > li {
      > a {
        display: flex;
        align-items: center;
        height: 40px;
        padding-left: 10px;
        > svg {
          margin-right: 16px;
        }
        &.selected {
          color: #3f51b5;
          font-weight: 600;
          background-color: rgba(255, 255, 255, 0.8);
          border-top: 1px solid #e0e0e0;
          border-bottom: 1px solid #e0e0e0;
        }
      }
    }
  }
}
</style>