import dashboard from './modules/dashboard';
import BasicLayout from '@/layout';

/**
 * 在主框架内显示
 */

const frameIn = [
  {
    path: '/',
    redirect: {
      name: 'dashboard-console'
    },
    component: BasicLayout,
    children: [
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter(to, from, next) {
            next(instance => instance.$router.replace(from.fullPath));
          },
          render: h => h()
        }
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter(to, from, next) {
            next(instance => instance.$router.replace(JSON.parse(from.params.route)));
          },
          render: h => h()
        }
      }
    ]
  },
  dashboard
];

/**
 * 在主框架之外显示
 */

const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '$t:page.login.title'
    },
    component: () => import('@/pages/account/login')
  },
  // 注册
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '$t:page.register.title'
    },
    component: () => import('@/pages/account/register/index')
  },
  // 注册结果
  {
    path: '/register/result',
    name: 'register-result',
    meta: {
      auth: true,
      title: '注册结果'
    },
    component: () => import('@/pages/account/register/result')
  },
];

/**
 * 错误页面
 */

const errorPage = [
  {
    path: '/403',
    name: '403',
    meta: {
      title: '403'
    },
    component: () => import('@/pages/system/error/403')
  },
  {
    path: '/500',
    name: '500',
    meta: {
      title: '500'
    },
    component: () => import('@/pages/system/error/500')
  },
  {
    path: '*',
    name: '404',
    meta: {
      title: '404'
    },
    component: () => import('@/pages/system/error/404')
  }
];

// 导出需要显示菜单的
export const frameInRoutes = frameIn;

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
];
