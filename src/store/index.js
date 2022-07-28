import { createStore } from 'vuex'
import { decodeJwt } from '@/utils/token'

export default createStore({
  state: {
    // NOTE: This is mock up data actually it should be null
    currentUser: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
    role: localStorage.getItem('token')
      ? decodeJwt(localStorage.getItem('token')).user.role
      : null
  },
  getters: {
    getCurrentUser(state) {
      return state.currentUser
    },
    getRole(state) {
      return state.role
    }
  },
  mutations: {
    setCurrentUser(state, value) {
      state.currentUser = value
    },
    setRole(state, value) {
      state.role = value
    }
  },
  actions: {
    setCurrentUser(context, value) {
      context.commit('setCurrentUser', value)
    },
    setRole(context, value) {
      context.commit('setRole', value)
    }
  }
})
