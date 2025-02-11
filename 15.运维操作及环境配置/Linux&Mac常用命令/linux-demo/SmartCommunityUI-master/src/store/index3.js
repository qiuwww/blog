import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
    },
  state:{
    leftMenuArr:[],
  },
  mutations:{
    setMenu(state,par){
      state.leftMenuArr = par;
    }
  }
})
