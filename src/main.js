import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
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

Vue.use(VueResource)

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

Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
