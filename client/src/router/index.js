import Vue from 'vue'
import Router from 'vue-router'
import SlideShow4 from '@/components/Photo/SlideShow4'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Music from '@/components/Music/Music'
import GalleryLightbox from '@/components/Photo/GalleryLightbox'
import Video from '@/components/Video/Video'
import VideoPlayer from '@/components/Video/VideoPlayer'
import Catalog from '@/components/Catalog'

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
      path: '/pictures',
      name: 'pictures',
      component: GalleryLightbox
    },
    {
      path: '/videos',
      name: 'videos',
      component: Video,
      props: true
    },
    {
      path: '/files',
      name: 'files',
      component: Catalog,
      props: true
    }
  ]
})
