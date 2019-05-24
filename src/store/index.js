import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loggedInUser: {
      user: null,
      token: null
    }
  },
  mutations: {
    initializeStore (state) {
      if (localStorage.getItem('loggedInUser') !== 'null') {
        state.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
      }
    },
    setUser (state, payload) {
      // if (payload.user.profile_pic && payload.user.profile_pic.search('http://localhost:8000/') < 0) {
      //   payload.user.profile_pic = 'http://localhost:8000/' + payload.user.profile_pic
      // }
      state.loggedInUser = payload
      localStorage.setItem('loggedInUser', JSON.stringify(payload))
    },
    logUserOut (state) {
      if (state.loggedInUser && state.loggedInUser.user && state.loggedInUser.token) {
        state.loggedInUser.token = null
        state.loggedInUser.user = null
      }
      localStorage.removeItem('loggedInUser')
    }
    // setProfilePic (state) {
    //   if (state.loggedInUser.user.profile_pic) {
    //     state.loggedInUser.user.profile_pic = 'http://localhost:8000/' + state.loggedInUser.user.profile_pic
    //   }
    // }
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
    // setProfilePic (state) {
    //   state.commit('setProfilePic')
    // }
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
