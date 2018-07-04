import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import { store } from './store'
import 'material-icons/iconfont/material-icons.css'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VJumbotron,
  VDivider,
  VCard,
  VProgressCircular,
  VDataTable,
  VtextField,
  VSelect,
  VDialog,
  VForm,
  VCheckbox,
  VAlert,
  VMenu,
  VTabs,
  VAvatar,
  VChip,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
import moment from 'moment'

  /** Date Filter */
Vue.filter('date', function (value) {
  if (value) {
    return moment(value).format('MMM Do [,] YYYY')
  }
})

/** Uppercase Filter */

//      For the routing and route guarding and all
//      Almost the equivalent of Angular 5's HttpClient

router.beforeEach((to, from, next) => {
  /* If the route to be accessed requires authentication */
  if (to.matched.some(record => record.meta.requiresAuth)) {
    /* And the user isn't logged in, redirect to Sign in page */
    if (localStorage.getItem('loggedInUser') === 'null' || localStorage.getItem('loggedInUser') === null) {
      next('signin')
    } else next() // If the user is logged in, continue
  } else {
    next() // make sure to always call next()!
  }
})

Vue.use(VueResource)
Vue.http.interceptors.push((request, next) => {
  if (request.url.search('uploadFile') >= 0) { // File upload
    request.headers.set('Authorization', `Bearer ${store.getters.getToken}`)
    request.headers.set('Content-Type', 'multipart/form-data')
  } else if (request.url !== 'http://localhost:8000/api/login' && request.url !== 'http://localhost:8000/api/uploadFile/:id') {
    request.headers.set('Authorization', `Bearer ${store.getters.getToken}`)
    request.headers.set('Accept', 'application/json')
  }
  next((response) => {
    if (response.status === 400 || response.status === 401) {
      if (response.url !== 'http://localhost:8000/api/login') {
        store.dispatch('logUserOut')
        router.go('signin')
      }
    }
  })
})

//      Everything that makes the app 'vuetiful'
//      The components are all a-la-carte
//      Meaning that they are all destructured and only the needed ones are ever imported

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VJumbotron,
    VDivider,
    VCard,
    VProgressCircular,
    VDataTable,
    VtextField,
    VSelect,
    VDialog,
    VForm,
    VCheckbox,
    VAlert,
    VMenu,
    VTabs,
    VAvatar,
    VChip,
    transitions
  },
  theme: {
    primary: '#FF4081',
    secondary: '#36C9C6',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

//      For storing state(data) throughout the application
//      Looking like a good substitute for Cache except that it
//      is destroyed per session
Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  beforeCreate () {
    this.$store.commit('initializeStore')
  },
  // beforeUpdate () {
  //   console.log('before update')
  //   this.$store.commit('initializeStore')
  // },
  render: h => h(App)
})
