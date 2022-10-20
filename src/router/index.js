import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index.js'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/listView',
    name: 'listView',
    
    component: () => import('../views/ListView.vue')
  },
  {
    path: '/searchView',
    name: 'searchView',
    
    component: () => import('../views/Search.vue')
  },
  {
    path: '/login',
    name: 'login',
    
    component: () => import('../views/Login.vue')
  },
  {
    path: '/me',
    name: 'me',
    beforeEnter:(to,from,next)=>{
      console.log(store.state.user);
      if(store.state.user.isLogin){
        next()
      }else{
        next('login')
      }
    },
    component: () => import('../views/Me.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
