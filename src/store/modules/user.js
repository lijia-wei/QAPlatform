const state = {
    islogin: false,
    isclose: true,
    userinfo: {
        id: "",
        username: "",
        password: "",
        pet_name: "",
        email: "",
    }
}
const getters = {
    //放state相关计算属性
}
//非异步操作
const mutations = {
    setUserInfo(state, userinfo) {
        state.userinfo = userinfo;
    },
    ISLOG(state) {
        state.islogin = !state.islogin;
    },
    CLOSE(state) {
        state.isclose = !state.isclose;
    },
    // DELETE_USERINFO(state) {
    //     state.userinfo={avatar:''}
    //     window.localStorage.removeItem('userinfo')
    //     window.localStorage.removeItem('luffy_jwt_token')

    // },
    // SET_TOKEN(state, data) {
    //     state.token = data
    //     window.localStorage.setItem('luffy_jwt_token', state.token);
    // },
    // SET_UNREAD(state, num) {
    //     state.unread = num
    // },
}
//异步操作
// const actions = {
//     //这里的context是该模块中的，不再代表$store
//     setUserInfo(context, data) {
//         context.commit('SET_USERINFO', data)
//     },
//     changeislog({ commit }) {
//         commit('CHANGE_ISLOG')
//     },
//     join({ commit }) {
//         commit('JOIN')
//     },
//     close({ commit }) {
//         commit('CLOSE')
//     },
//     deleteuserinfo({ commit }) {
//         commit('DELETE_USERINFO')
//     },
//     setToken({ commit }, data) {
//         commit('SET_TOKEN', data)
//     },
//     setunread({ commit }, data) {
//         commit('SET_UNREAD', data)
//     },
// }
export default {
    namespaced: true,   //单独空间变量，不会与index里面的冲突
    state,
    getters,
    mutations,
    // actions
}