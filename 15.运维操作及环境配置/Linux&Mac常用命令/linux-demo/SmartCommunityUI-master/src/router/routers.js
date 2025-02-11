import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    meta: {title: '登录', noCache: true},
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/features/404'),
    hidden: true
  },
  {
    path: '/gisonemap',
    component: () => import('@/views/gismap/gismapgrid/index'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/features/401'),
    hidden: true
  },
  {
    path: '/onemap',
    component: () => import('@/views/gismap/gismapgrid/index'),
    hidden: true,

  },
  {
    path: '/3dmap',
    component: () => import('@/views/gismap/threeDmap/index'),
    hidden: true,
  },
  {
    path: '/bigScreen',
    name: '/bigScreen',
    component: () => import('@/views/zhxc/bigScreen'),
    hidden: true,
  },
  {
    path: '/bigData',
    name: '/bigData',
    component: () => import('@/views/bigData'),//智慧社区大屏
    hidden: true,
  },
  {
    path: '/components/bigScreenExample',//大屏示例
    component: () => import('@/views/bigScreen/index'),
    hidden: true,
  },
  {
    path: '/homepage',
    component: () => import('@/views/zhxc/homepage'),
    hidden: true,
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/features/redirect')
      }
    ]
  },
  {
    path: '/event',
    component: Layout,
    hidden: true,
    headerName:"网格事件",
    meta: { title: '事件详情' },
    children: [
      {
        path: '/events/eventsDetail',
        name: 'eventsDetail',
        headerName:"网格事件",
        component: () => import('@/views/zhsq/events/eventsDetail'),
      }
    ]
  },
  {
    path: '/tasks',
    headerName:"网格任务",
    component: Layout,
    hidden: true,
    meta: { title: '任务详情' },
    children: [
      {
        headerName:"网格任务详情",
        path: '/tasks/taskDetail',
        name: 'taskDetail',
        component: () => import('@/views/zhsq/tasks/dailyTasks/dailyTasksList/task_detail.vue'),
      },
      {
        headerName:"网格任务详情",
        path: '/tasks/taskCycDetail',
          name: 'taskCycDetail',
        component: () => import('@/views/zhsq/tasks/dailyTasks/periodicTask/task_detail'),
      },
      {
        headerName:"网格任务详情",
        path: '/tasks/taskCycDetail',
        name: 'myTaskDetail',
        component: () => import('@/views/zhsq/tasks/myTasks/task_detail_linshi'),
      }
    ]
  },
   // {
   //   path: '/',
   //   component: Layout,
   //   // redirect: '/dashboard',
   //   children: [
   //     {
   //       path: 'dashboard',
   //       component: () => import('@/views/home'),
   //       name: 'Dashboard',
   //       meta: {title: '业务概况', icon: 'index', affix: true, cache: true}
   //     }
   //   ]
   // },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/xcbd',
  // },
  // {
  //   path: '/emergency',
  //   name: 'emergency',
  //   hidden: true,
  //   component: () => import('@/views/gismap/emergencyIndex')
  // },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: () => import('@/views/system/user/center'),
        name: '个人中心',
        meta: {title: '个人中心', cache: true}
      }
    ]
  },

]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
