/* eslint-disable indent */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/Home.vue';
import userRoutes from './module/user';
// eslint-disable-next-line import/no-unresolved

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('../views/community/Community.vue'),
    meta: {
      keepAlive: true, // 此组件需要被缓存
    },
  },
  {
    path: '/question',
    name: 'Question',
    component: () => import('../views/question/Question.vue'),
    meta: {
      keepAlive: true, // 此组件需要被缓存
    },
  },
  {
    path: '/gamezone',
    name: 'Gamezone',
    component: () => import('../views/gamezone/Gamezone.vue'),
  },
  {
    path: '/scommunity',
    name: 'Scommunity',
    component: () => import('../views/community/Scommunity.vue'),
  },
  {
    path: '/post/:id',
    name: 'ShowPost',
    component: () => import('../views/post/Post.vue'),
  },
  {
    path: '/post/update/:id',
    name: 'UpdatePost',
    component: () => import('../views/post/Update.vue'),
  },
  {
    path: '/question/:id',
    name: 'Showquest',
    component: () => import('../views/question/Quescontent.vue'),
  },
  {
    path: '/code/:id',
    name: 'ShowCode',
    component: () => import('../views/code/ShowCode.vue'),
  },
  {
    path: '/code/usdcode/:id',
    name: 'UsdCode',
    component: () => import('../views/code/UpdateCode.vue'),
  },

  ...userRoutes,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) { // 判断是否需要登录
    // 判断用户是否登录
    if (store.state.userModule.token) {
      // 判断token的有效性，比如token是否过期，需要后台发放token的时候带上token的有效期
      // 如果token无效，则需要请求token
      next();
    } else {
      // 跳转登录
      router.push({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router;
