import Vue from 'vue'
import Router from 'vue-router'
import SlideShow4 from '@/components/Photo/Slideshow4'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Music from '@/components/Music/Music'
import GalleryLightbox from '@/components/Photo/GalleryLightbox'
import Video from '@/components/Video/Video'
import VideoPlayer from '@/components/Video/VideoPlayer'
// import Catalog from '@/components/Catalog'
import Browser from '@/components/Files/Browser'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
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
      path: '/videos/',
      name: 'videos',
      component: Video,
      props: true
    },
    {
      path: '/videos/:id',
      name: 'videoplayer',
      component: VideoPlayer,
      props: true
    },
    {
      path: '/files',
      name: 'files',
      component: Browser,
      props: true
    },
    {
      path: '/files/*',
      name: 'files',
      component: Browser,
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  let userIsLogged = store.state.isUserLoggedIn // Call to your api
  // console.log('Id he logged in?', userIsLogged)
  var allowedDest = ['login', 'root', 'register']

  if (allowedDest.indexOf(to.name) === -1 && !userIsLogged) {
    // Redirect user
    return next({path: '/login'})
  }
  // Let the user pass
  return next()
})

export default router
