import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Sale from '../views/Sale.vue'
import Tools from '../views/Tools.vue'
import Report from '../views/Report.vue'
import Member from '../views/Member.vue'
import Stock from '../views/Stock.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sale',
    name: 'Sale',
    component: Sale
  },
  {
    path: '/tools',
    name: 'Tools',
    component: Tools
  },
  {
    path: '/report',
    name: 'Report',
    component: Report
  },
  {
    path: '/member',
    name: 'Member',
    component: Member
  },
  {
    path: '/stock',
    name: 'Stock',
    component: Stock
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // }
]

const router = new VueRouter({ 
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
