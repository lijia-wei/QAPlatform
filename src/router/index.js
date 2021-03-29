//1.配置路由信息
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import Register from '../views/Register'
// import User from '../components/User'
// import Profile from '../components/Profile'

//2.通过Vue.use()安装插件
Vue.use(VueRouter)

//3.创建VueRouter对象
const routes = [
  {
    path: '',
    //重定向
    redirect: '/login' 
  },
  {
    path: '/login',
    component: Login,
    meta:{
      title: '登录'
    }
  },
  // {
  //   path: '/register',
  //   component: Register,
  //   meta:{
  //     title: '注册'
  //   },
  //   beforeEnter: (to, from, next) => {
  //     next()
  //   }
  // },
  {
    path: '/register',
    component: Register,
    meta:{
      title: '注册'
    }
  },
]

const router = new VueRouter({
  //4.配置路由和组件之间的应用关系
  routes,
  mode: 'history'
})

//全局导航守卫,前置首位(guard)
// router.beforeEach((to, from, next) => {
//   //从from对象跳转到to对象
//   document.title = to.matched[0].meta.title;
//   next();
// })

//后置钩子(hook)

//将router对象传入Vue实例中,导出
export default router