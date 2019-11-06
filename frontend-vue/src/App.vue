<template>
  <div id="app">
    <Login v-if="!id" />
    <div class="app-logined" v-if="id">
      <AppHeader @toggleMenu="toggleMenu" />
      <AppMenu ref="menu" @toggleMenu="toggleMenu" :menuVisiable="menuVisiable" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Login from './pages/Login';
import AppHeader from './components/AppHeader';
import AppMenu from './components/AppMenu';
import { signIn, getUser } from './request/user';
import { GET_AUTH_USER } from './graphql/user';
import { mapState } from 'vuex';
import gql from 'graphql-tag';

export default {
  name: 'App',
  apollo: {
    getAuthUser: {
      query: GET_AUTH_USER,
    },
  },
  data() {
    return {
      menuVisiable: false,
      getAuthUser: {},
    };
  },
  computed: {
    ...mapState('auth', ['id']),
  },
  components: {
    Login,
    AppHeader,
    AppMenu,
  },
  watch: {
    getAuthUser: {
      deep: true,
      handler(data) {
        this.$store.commit('auth/setAuthUser', data);
      },
    },
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
