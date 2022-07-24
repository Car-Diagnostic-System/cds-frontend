import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ShowCase from '@/views/ShowCase.vue'
import DiagnoseView from '@/views/diagnose/DiagnoseView.vue'
import IndexingView from '@/views/indexing/IndexingView.vue'
import RegisterView from '@/views/register/RegisterView.vue'
import LoginView from '@/views/auth/LoginView.vue'
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
  },
  {
    path: ROUTE_PATH.DIAGNOSE,
    name: 'diagnose',
    component: DiagnoseView
  },
  {
    path: ROUTE_PATH.INDEXING,
    name: 'indexing',
    component: IndexingView
  },
  {
    path: ROUTE_PATH.LOGIN,
    name: 'login',
    component: LoginView
  },
  {
    path: ROUTE_PATH.REGISTER,
    name: 'register',
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
