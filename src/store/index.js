import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import {
  SET_CONTENTID
} from './mutations-types'
Vue.use(Vuex)

const state = {
  commentnum: '',
  contentid: '',
  contentname:'',
  contentuserid:'',
  url:window.location.href.split('#')[0],
  info:'',
}

const getters = {
  //getters参数为固定值，只要是第二个参数不管叫什么都代表getters
  numCouter(state,getters){
    return state.commentnum*state.commentnum
  },
  //想要传参
  numCompare(state){
    return size => {
      return state.commentnum > size;
    }
  },
}
//唯一更改state的方式
const mutations = {
  [SET_CONTENTID](state, id) {
    state.contentid = id
  },
  SET_COMMENTNUM(state, num) {
    state.commentnum = num
  },
  SET_CONTENTINFO(state, data) {
    state.contentname = data.contentname
    state.contentuserid =data. contentuserid
  },
}

//异步操作
const actions = {
  //context就相当于$store,data是payload
  setcontentid(context, data) {
    context.commit('SET_CONTENTID', data)
  },
  setcommentnum({ commit }, data) {
    commit('SET_COMMENTNUM', data)
  },
  setcontentinfo({ commit }, data) {
    commit('SET_CONTENTINFO', data)
  },
}
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    user
  }

})


