import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

//1.安装插件
Vue.use(Vuex)

//2.创建对象
const store = new Vuex.Store({
  state: {
    commentnum: '',
    contentid: '',
    contentname:'',
    contentuserid:'',
    // url:'http://localhost:8080',
    url:window.location.href.split('#')[0] 
  },
  getters: {

  },
  mutations: {
    SET_CONTENTID(state, id) {
      state.contentid = id
    },
    SET_COMMENTNUM(state, num) {
      state.commentnum = num
    },
    SET_CONTENTINFO(state, data) {
      state.contentname = data.contentname
      state.contentuserid =data. contentuserid
    },
  },
  actions: {
    setcontentid({ commit }, data) {
      commit('SET_CONTENTID', data)
    },
    setcommentnum({ commit }, data) {
      commit('SET_COMMENTNUM', data)
    },
    setcontentinfo({ commit }, data) {
      commit('SET_CONTENTINFO', data)
    },
  },
})

export default store

