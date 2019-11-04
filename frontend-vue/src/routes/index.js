import Vue from 'vue';
import Router from 'vue-router';
import * as paths from './names';

const Home = () => import(/* webpackChunkName: "Home" */ '../pages/Home.vue');
const Explore = () =>
  import(/* webpackChunkName: "Explore" */ '../pages/Explore.vue');
const People = () =>
  import(/* webpackChunkName: "People" */ '../pages/People.vue');
const Notifications = () =>
  import(/* webpackChunkName: "Notifications" */ '../pages/Notifications.vue');

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: paths.HOME,
      name: 'home',
      component: Home,
    },
    {
      path: paths.EXPLORE,
      name: 'explore',
      component: Explore,
    },
    {
      path: paths.PEOPLE,
      name: 'people',
      component: People,
    },
    {
      path: paths.NOTIFICATIONS,
      name: 'notifications',
      component: Notifications,
    },
  ],
});

export default router;
