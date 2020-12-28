import router from './index';
import { getToken } from '@/utils/auth';
import NProgress from 'nprogress'; // progress bar
import store from '@/store';
import { Message } from 'element-ui';
NProgress.configure({ showSpinner: false });// NProgress Configurations
const whiteList = ['/login']; // 白名单不走token的URL
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const token = getToken();
  // 对路由进行验证
  if (token) { // 已经登陆
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters.name;
      if (hasGetUserInfo) {
        next();
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo');
          next();
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken');
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
      NProgress.done();
    }
  }
});
router.afterEach((to, from) => {
  NProgress.done(); // finish progress bar
});
