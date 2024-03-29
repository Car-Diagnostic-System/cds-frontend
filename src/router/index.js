import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import store from '@/store'
import ShowCase from '@/views/ShowCase.vue'
import DiagnoseView from '@/views/diagnose/DiagnoseView.vue'
import IndexingView from '@/views/indexing/IndexingView.vue'
import RegisterView from '@/views/register/RegisterView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import BookmarkView from '@/views/bookmark/BookmarkView.vue'
import AccountLayout from '@/views/account/AccountLayout.vue'
import AccountInformation from '@/views/account/children/AccountInformation.vue'
import AccountPassword from '@/views/account/children/AccountPassword.vue'
import ROLE from '@/constants/role'
import ROUTE_PATH from '@/constants/router'
import PAGE_TITLE from '@/constants/page-title'

const routes = [
  {
    path: ROUTE_PATH.HOME,
    name: PAGE_TITLE.HOME,
    component: HomeView,
    beforeEnter: () => {
      if (store.getters.getRole === ROLE.ADMIN) {
        router.push(ROUTE_PATH.INDEXING)
      }
    }
  },
  {
    path: ROUTE_PATH.SHOWCASE,
    name: PAGE_TITLE.SHOWCASE,
    component: ShowCase
  },
  {
    path: ROUTE_PATH.DIAGNOSE,
    name: PAGE_TITLE.DIAGNOSE,
    component: DiagnoseView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: ROUTE_PATH.INDEXING,
    name: PAGE_TITLE.INDEXING,
    component: IndexingView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: ROUTE_PATH.LOGIN,
    name: PAGE_TITLE.LOGIN,
    component: LoginView
  },
  {
    path: ROUTE_PATH.REGISTER,
    name: PAGE_TITLE.REGISTER,
    component: RegisterView
  },
  {
    path: ROUTE_PATH.BOOKMARK,
    name: PAGE_TITLE.BOOKMARK,
    component: BookmarkView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: ROUTE_PATH.ACCOUNT,
    name: PAGE_TITLE.ACCOUNT,
    component: AccountLayout,
    redirect: ROUTE_PATH.ACCOUNT + ROUTE_PATH.ACCOUNT_INFORMATION,
    children: [
      {
        path: ROUTE_PATH.ACCOUNT + ROUTE_PATH.ACCOUNT_INFORMATION,
        name: PAGE_TITLE.ACCOUNT_INFORMATION,
        component: AccountInformation,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: ROUTE_PATH.ACCOUNT + ROUTE_PATH.ACCOUNT_PASSWORD,
        name: PAGE_TITLE.ACCOUNT_PASSWORD,
        component: AccountPassword,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  // NOTE: this is a guard contdition if user already logged in
  if (
    (to.name == 'login' && store.getters.getCurrentUser) ||
    (to.name == 'register' && store.getters.getCurrentUser)
  ) {
    next({ path: ROUTE_PATH.HOME })
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // NOTE: this is a contdition if user not logged in
    if (!store.getters.getCurrentUser) {
      next({ path: ROUTE_PATH.LOGIN })
    } else {
      // NOTE: log still using during the development
      console.log('path name', to.name)
      console.log('isAdmin: ', store.getters.getRole === ROLE.ADMIN)
      console.log('isMEMBER: ', store.getters.getRole === ROLE.MEMBER)

      // NOTE: the user role can access to diagnose, bookmark, account management pages
      if (store.getters.getRole === ROLE.MEMBER) {
        if (
          to.name === PAGE_TITLE.DIAGNOSE ||
          to.name === PAGE_TITLE.BOOKMARK ||
          to.name === PAGE_TITLE.ACCOUNT_INFORMATION ||
          to.name === PAGE_TITLE.ACCOUNT_PASSWORD
        ) {
          next()
        } else {
          next({ path: ROUTE_PATH.HOME })
        }
      }
      // NOTE: the admin role can access to indexing page
      if (store.getters.getRole === ROLE.ADMIN) {
        if (
          to.name === PAGE_TITLE.INDEXING ||
          to.name === PAGE_TITLE.ACCOUNT_INFORMATION ||
          to.name === PAGE_TITLE.ACCOUNT_PASSWORD
        ) {
          next()
        } else {
          next({ path: ROUTE_PATH.HOME })
        }
      }
      next()
    }
  } else {
    next()
  }
})

export default router
