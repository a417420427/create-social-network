// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueApollo from 'vue-apollo';

import { apolloClient } from './ApolloClient';
import store from './store';
import router from './routes';
import './styles/index.scss';
import theme from './theme';
import { i18n } from './i18n';
import favicon from './favicon.png';
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
Vue.use(VueApollo);

Vue.config.productionTip = false;
Vue.prototype.theme = theme;

//  <link rel="icon" href="./favicon.ico" type="image/x-icon" />
const link = document.createElement('link');
link.setAttribute('rel', 'icon');
link.setAttribute('href', favicon);
link.setAttribute('type', 'image/png');
document.head.appendChild(link);
new Vue({
  el: '#app',
  i18n,
  apolloProvider,
  store,
  router,
  components: { App },
  template: '<App/>',
});
