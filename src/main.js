import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: router,
  store,
  render: h => h(App), 
})
 
// new Vue({
//   el: '#login',
//   router: router,
//   render: h => h(Login), 
// })