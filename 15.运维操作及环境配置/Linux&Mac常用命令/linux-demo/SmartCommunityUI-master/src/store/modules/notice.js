const state = {
    status:false,
  }
  
  const mutations = {
    SET_STATUS: (state, view) => {
      state.status = view 
    },
  }
  
  const actions = {
    setNotifyStatus({ commit }, view) {
      commit('SET_STATUS', view)
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  