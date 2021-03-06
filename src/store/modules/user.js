const state = {
    islogin: JSON.parse(sessionStorage.getItem("islogin")) || false,
    isclose: JSON.parse(sessionStorage.getItem("isclose")) || true,
    //先去localStorage中获取数据
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")) || {},
}
const getters = {
    //放state相关计算属性
}

//非异步操作
const mutations = {
    setUserInfo(state, userinfo) {
        sessionStorage.setItem('userInfo', JSON.stringify(userinfo));//将传递的数据先保存到localStorage中
		state.userInfo = userinfo;                                 // 之后才是修改state中的状态
    },
    ISLOG(state) {
        state.islogin = !state.islogin;
        sessionStorage.setItem('islogin', JSON.stringify(state.islogin));
    },
    CLOSE(state) {
        state.isclose = !state.isclose;
        sessionStorage.setItem('isclose', JSON.stringify(state.isclose));
        
    },
    DELETE_USERINFO(state) {
        window.sessionStorage.removeItem('userInfo');
        mutations.CLOSE(state);
        mutations.ISLOG(state);
        location. reload();
    },
}
// 异步操作
const actions = {
}
export default {
    namespaced: true,   //单独空间变量，不会与index里面的冲突
    state,
    getters,
    mutations,
    actions
}