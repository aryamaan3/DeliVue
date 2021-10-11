import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ListeResto from './components/ListeResto.vue'
import Resto from './components/Resto.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  mode:'history',
  routes : 
  [
    { path: '/', component: ListeResto },
    { path: '/resto/:id', component: Resto , props: true },
  ]})

new Vue({
  router, 
  render: h => h(App),
}).$mount('#app')
