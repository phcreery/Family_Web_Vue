import Vue from 'vue'
import Router from 'vue-router'
import SlideShow4 from '@/components/SlideShow4'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Music from '@/components/Music'
import Playground from '@/components/Playground'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: SlideShow4
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/music',
      name: 'music',
      component: Music
    },
    {
      path: '/playground',
      name: 'playground',
      component: Playground
    }
  ]
})
