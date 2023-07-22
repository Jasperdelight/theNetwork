import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }, {
    path: '/profiles/:profileId',
    name: 'Profile',
    component: loadPage('ProfilePage')
  },
  {
    path: '/posts',
    name: 'Posts',
    component: loadPage('PostsPage')
  },
  {
    path: '/profiles',
    name: 'FoundProfilesPage',
    component: loadPage('FoundProfilesPage')
  },

]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
