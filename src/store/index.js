import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loggedInUser: {
      user: null,
      token: null
    },
    token: null
  },
  mutations: {
    initializeStore (state) {
      if (localStorage.getItem('loggedInUser') !== 'null') {
        // state.loggedInUser.token = JSON.parse(localStorage.getItem('valid_token'))
        state.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
      }
    },
    setUser (state, payload) {
      state.loggedInUser = payload
      console.log(payload)
      localStorage.setItem('loggedInUser', JSON.stringify(payload))
    },
    logUserOut (state) {
      state.loggedInUser.token = null
      state.loggedInUser.data = null
      localStorage.removeItem('loggedInUser')
    }
  },
  actions: {
    setToken (state, payload) {
      state.commit('setToken', payload)
    },
    setUser (state, payload) {
      state.commit('setUser', payload)
    },
    logUserOut (state) {
      state.commit('logUserOut')
    }
  },
  getters: {
    loggedInUser (state) {
      if (state.loggedInUser) {
        return state.loggedInUser.user
      }
    },
    getToken (state) {
      if (state.loggedInUser) {
        return state.loggedInUser.token
      }
    }
  }
})
