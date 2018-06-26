import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';

import A from './components/A.vue';
import B from './components/B.vue';

Vue.use(Router);

Vue.config.productionTip = false;

const  routes = [
  { path: '/a', component: A },
  { path: '/b', component: B },
];

new Vue ({
  render :h =>h(App),
  router:new Router({routes}),
}).$mount('#app');