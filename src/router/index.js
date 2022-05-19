import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ShowCase from '@/views/ShowCase.vue'
import ROUTE_PATH from '../constants/router'

const routes = [
  {
    path: ROUTE_PATH.HOME,
    name: 'home',
    component: HomeView
  },
  {
    path: ROUTE_PATH.SHOWCASE,
    name: 'showcase',
    component: ShowCase
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
