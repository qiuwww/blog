const state = {
  pageSize: 10,
  pageNum: 1
}

const mutations = {
  SET_PAGE_SIZE: (state, pageSize) => {
    state.pageSize = pageSize
  },
  SET_PAGE_NUM: (state, pageNum) => {
    state.pageNum = pageNum
  },
  RESET_PAGE_NUM: state => {
    state.pageNum = 1
  },
  RESET_PAGE_SIZE: state => {
    state.pageSize = 10
  }
}

const actions = {
  setPageSize({ commit }, pageSize) {
    commit('SET_PAGE_SIZE', pageSize)
  },
  setPageNum({ commit }, pageNum) {
    commit('SET_PAGE_NUM', pageNum)
  },
  resetPage({ commit }) {
    commit('RESET_PAGE_NUM')
    commit('RESET_PAGE_SIZE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
