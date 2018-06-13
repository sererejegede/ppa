import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loggedInUser: 'Serere',
    token: null
  },
  mutations: {
    setUser (state, payload) {
      state.loggedInUser = payload
    },
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {},
  getters: {
    loggedInUser (state) {
      return state.loggedInUser
    }
  }
})
