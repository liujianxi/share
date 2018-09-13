import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import index from '@/components/index'
Vue.use(Router)

export default new Router({
  routes: [{
		path: '/',
		name: 'home',
		component: home
    },
    {
		path: '/index',
		name: 'index',
		component: index
    }
  ]
})
