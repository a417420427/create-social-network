<template>
  <div id="app">
    <Login v-if="!authorId" />
    <div class="app-logined" v-if="authorId">
      <AppHeader @toggleMenu="toggleMenu" />
      <AppMenu ref="menu" @toggleMenu="toggleMenu" :menuVisiable="menuVisiable" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Login from './pages/Login.vue';
import AppHeader from './components/AppHeader';
import AppMenu from './components/AppMenu';
import { signIn, getUser } from './request/user';

export default {
  apollo: {
    // 简单的查询，将更新 'hello' 这个 vue 属性
  },
  name: 'App',
  data() {
    return {
      menuVisiable: false,
    };
  },
  components: {
    Login,
    AppHeader,
    AppMenu,
  },
  methods: {
    toggleMenu(e) {
      this.menuVisiable = typeof e === 'boolean' ? e : !this.menuVisiable;
    },
  },
};
</script>

<style>
.app-logined {
  width: 100%;
  height: 100%;
}
</style>
