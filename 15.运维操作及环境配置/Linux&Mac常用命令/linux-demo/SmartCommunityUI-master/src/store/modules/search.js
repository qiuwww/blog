const state = {
  queryStr: ''
}

const mutations = {
  SET_SEARCH: (state, queryStr) => {
    state.queryStr = queryStr
  },
  RESET_SEARCH: state => {
    state.queryStr = ''
  }
}

const actions = {
  setSearch({ commit }, queryStr) {
    commit('SET_SEARCH', queryStr)
  },
  resetSearch({ commit }) {
    commit('RESET_SEARCH')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
