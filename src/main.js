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

//      For the routing and route guarding and all
//      Almost the equivalent of Angular 5's HttpClient

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.token) {
      next('signin')
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

Vue.use(VueResource)
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', `Bearer ${store.state.token}`)
  request.headers.set('Accept', 'application/json')
  next()
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
  render: h => h(App)
})
