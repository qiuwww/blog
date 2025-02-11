import router from './routers'
import store from '@/store'

import Config from '@/settings'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {getToken} from '@/utils/auth' // getToken from cookie
import {buildMenus} from '@/api/system/menu'
import {filterAsyncRouter} from '@/store/modules/permission'

import Layout from '../layout/index'

NProgress.configure({showSpinner: false})// NProgress Configuration

const whiteList = ['/login','/bigScreen','/homepage']// no redirect whitelist

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    //document.title = to.meta.title + ' - ' + Config.title
    document.title = Config.title
  }
  NProgress.start();
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({path: '/'});
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取user_info
          // 动态路由，拉取菜单
          loadMenus(next, to)
        }).catch((err) => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
        // 登录时未拉取 菜单，在此处拉取
      } else if (store.getters.loadMenus) {
        // 修改成false，防止死循环
        store.dispatch('updateLoadMenus').then(res => {
        });
        loadMenus(next, to);
      } else {
        next();
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.path}`);// 否则全部重定向到登录页
      NProgress.done();
    }
  }
})

export const loadMenus = (next, to) => {
  buildMenus().then(res => {
    let headMenu = [];
    for (let i = 0; i < res.length; i++) {
      if (res[i].level == 0) {
        headMenu.push(res[i]);
      }
    }
    store.dispatch('SetHeadMenu', headMenu).then(() => {
      const asyncRouter = filterAsyncRouter(res);
      let arr = [];

      for (let i = 0; i < headMenu.length; i++) {
        arr.push({
          path: headMenu[i].path,
          name: headMenu[i].name,
          meta: {title: headMenu[i].name, icon: headMenu[i].icon, affix: true, cache: true},
          component:  headMenu[i].component ? loadView(headMenu[i].component) : Layout
        });
      }

      asyncRouter.push({path: '/', component: Layout, redirect: '/' + arr[0].path, children: arr});

      asyncRouter.push({path: '*', redirect: '/404', hidden: true});
      store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
        router.addRoutes(asyncRouter); // 动态添加可访问路由表
        next({...to, replace: true})
      })
    });
  })
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

export const loadView = (view) => {
  return (resolve) => require([`@/views/${view}`], resolve)
}

