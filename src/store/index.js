import { createStore } from 'vuex'

export default createStore({
  state: {
    // NOTE: This is mock up data actually it should be null
    currentUser: {
      firstname: 'ตุลยวัต',
      lastname: 'ทับคง',
      email: 'tulyawatt@gmail.com',
      carInfo: null
      // carInfo: {
      //   brand: { code: 'BMW', label: 'บีเอ็มดับเบิลยู' },
      //   model: { code: 'X5', label: 'เอ๊กซ์5' },
      //   nickname: { label: 'โฉมปี 1999-2006 (E53)' }
      // }
    }
  },
  getters: {
    getCurrentUser(state) {
      return state.currentUser
    }
  },
  mutations: {
    setCurrentUser(state, value) {
      state.currentUser = value
    }
  },
  actions: {
    setCurrentUser(context, value) {
      context.commit('setCurrentUser', value)
    }
  }
})
