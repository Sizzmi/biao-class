import 'normalize.css';
import './main.css';
import '@fortawesome/fontawesome-free/css/all.css';

import Vue    from 'vue';
import Root   from './Root.vue';
import Router from 'vue-router';

import session from './lib/session';

import Home    from './page/Home';
import Search  from './page/Search';
import Login   from './page/Login';
import Signup  from './page/Signup';
import Detail  from './page/Detail';
import Publish from './page/Publish';

import AdminBase from './page/admin/Base';
import User      from './page/admin/User';
import Vehicle   from './page/admin/Vehicle';
import Brand     from './page/admin/Brand';
import Model     from './page/admin/Model';
import Design    from './page/admin/Design';
import Report    from './page/admin/Report';
import Appo      from './page/admin/Appo';

import Focus from './directive/focus';

Vue.use(Router);
Vue.config.productionTip = false;

Vue.filter('only_day', function (value) {
  if (!value)
    return value;

  return value.split(' ')[ 0 ];
});

Vue.filter('percentage', function (value) {
  if (!value)
    return 0;
  return (value * 100).toFixed(2) + '%';
});


const router = new Router({
  routes : [
    { path : '/', component : Home, meta : { title : '首页 - 瓜瓜车' } },
    { path : '/login', component : Login, meta : { title : '登录 - 瓜瓜车' } },
    { path : '/signup', component : Signup, meta : { title : '注册 - 瓜瓜车' } },
    { path : '/search', component : Search, meta : { title : '搜索 - 瓜瓜车' } },
    { path : '/publish', component : Publish, meta : { title : '发布二手车 - 瓜瓜车' } },
    { path : '/detail/:id', component : Detail, meta : { title : '二手车详情 - 瓜瓜车' } },

    {
      path      : '/admin',
      component : AdminBase,
      children  : [
        {
          path      : 'user',
          component : User,
        },
        {
          path      : 'vehicle',
          component : Vehicle,
        },
        {
          path      : 'brand',
          component : Brand,
        },
        {
          path      : 'model',
          component : Model,
        },
        {
          path      : 'design',
          component : Design,
        },
        {
          path      : 'report',
          component : Report,
        },
        {
          path      : 'appo',
          component : Appo,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  let go_admin = to.fullPath.startsWith('/admin/');

  let go_publish = to.fullPath.startsWith('/publish');

  if (go_publish && !session.logged_in()) {
    alert('请先登录，如果没有账号请先注册；管理员账号如下，用户名：admin，密码：guagua');
    next('/login');
    return;
  }


  if (go_admin && !session.is_admin()) {
    alert('请先使用管理员账号登录，用户名：admin，密码：guagua');
    next('/login');
    return;
  } else
    next();

  document.title = to.meta.title;
});

new Vue({
  directives : { Focus },
  render     : h => h(Root),
  router     : router,
}).$mount('#root');
