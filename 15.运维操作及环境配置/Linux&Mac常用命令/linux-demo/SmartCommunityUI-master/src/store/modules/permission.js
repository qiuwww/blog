import { constantRouterMap } from '@/router/routers'
import Layout from '@/layout/index'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    leftMenu:[],
    headMenu : []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers)
    },
    SET_LEFT_MENU:(state, routers) =>{
      state.leftMenu = routers;
    },
    SET_HEAD_MENU:(state,routers) =>{
      state.headMenu = routers;
    }
  },
  actions: {
    GenerateRoutes({ commit }, asyncRouter) {
      commit('SET_ROUTERS', asyncRouter);
    },
    SetLeftMenu({ commit }, asyncRouter) {
      commit('SET_LEFT_MENU', asyncRouter);
    },
    SetHeadMenu({ commit }, asyncRouter) {
      commit('SET_HEAD_MENU', asyncRouter);
    }
  }
}

export const filterAsyncRouter = (routers) => { // 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter(router => {
    if(router.level != 0){
      if (router.component) {
        if (router.component === 'Layout') { // Layout组件特殊处理
          router.component = Layout
        } else {
          const component = router.component
          router.component = loadView(component)
        }
      }
      if (router.children && router.children.length) {
        router.children = filterAsyncRouter(router.children)
      }
      return true
    }
  })
}

export const loadView = (view) => {
   return (resolve) => require([`@/views/${view}`], resolve)
}

export default permission
