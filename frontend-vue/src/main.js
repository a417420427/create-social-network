// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueApollo from 'vue-apollo';

import { apolloClient } from './ApolloClient';
import createStore from './store';
import router from './routes';
import './styles/index.scss';
import theme from './theme';
import { i18n } from './i18n';

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
Vue.use(VueApollo);

Vue.config.productionTip = false;
Vue.prototype.theme = theme;
createStore().then(store => {
  new Vue({
    el: '#app',
    i18n,
    apolloProvider,
    store,
    router,
    components: { App },
    template: '<App/>',
  });
});
