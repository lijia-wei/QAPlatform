import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/blue-skin5152.css'
import '@/assets/css/bootstrap5152.css'
import '@/assets/css/green-skin5152.css'
import '@/assets/css/main5152.css'
import '@/assets/css/red-skin5152.css'
import '@/assets/css/responsive5152.css'
import '@/assets/css/login.css'
import './plugin/element-ui'
import ElementUI from 'element-ui';
import '@/assets/css/ali.css'


Vue.use(Vuex)  

// aiox需要的包
import axios from 'axios'
//aciox基础url
axios.defaults.baseURL = 'http://47.108.190.196/QAPlatform';
//将axios写成vue的原型属性
Vue.prototype.$axios = axios;
//为post请求设置默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//vue2中使用axios，我们请求的参数仍为json类型，是并没有序列化的。我们需要使用querystring解决该问题
// import qs from 'qs';
// Vue.prototype.qs = qs;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: router,
  store,
  render: h => h(App), 
})
  