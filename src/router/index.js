import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ShowCase from '@/views/ShowCase.vue'
import DIAGNOSE from '@/views/diagnose/DiagnoseSymptom.vue'
import INDEXING from '@/views/indexing/Indexing.vue'
import REGISTER from '@/views/register/Register.vue'
import ROUTE_PATH from '../constants/router'
import LOGIN from '@/views/auth/Login.vue'

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
  },
  {
    path: ROUTE_PATH.DIAGNOSE,
    name: 'diagnose',
    component: DIAGNOSE
  },
  {
    path: ROUTE_PATH.INDEXING,
    name: 'indexing',
    component: INDEXING
  },
  {
    path: ROUTE_PATH.LOGIN,
    name: 'login',
    component: LOGIN
  },
  {
    path: ROUTE_PATH.REGISTER,
    name: 'register',
    component: REGISTER
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
