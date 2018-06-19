<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" temporary absolute>
      <v-list class="pa-1">
        <v-list-tile v-for="menu in menuItems" :key="menu.title" @click="" :to="menu.link">
          <v-list-tile-action>
            <v-icon>{{ menu.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ menu.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="primary">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Project Management</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only" v-for="menu in menuItems" :key="menu.title">
        <v-btn flat :to="menu.link" v-if="menu.link !== null">
          <v-icon left>{{ menu.icon}}</v-icon>
          {{ menu.title }}
        </v-btn>
        <v-btn flat v-else>
          <v-menu :nudge-width="20">
            <v-btn flat slot="activator">
              {{ getLoggedInUser.name }}
              <v-icon dark>arrow_drop_down</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile>
                <v-icon left>exit_to_app</v-icon>
                <a @click="logUserOut">Logout</a>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      getLoggedInUser () {
        return this.$store.getters.loggedInUser
      },
      menuItems () {
        let menu = [
          {icon: 'face', title: 'Sign Up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign In', link: '/signin'}
        ]
        if (this.$store.state.token !== null && this.$store.state.token !== undefined) {
          menu = [
            {icon: 'account_circle', title: 'Users', link: '/'},
            {icon: 'dns', title: 'Companies', link: '/companies'},
            {icon: 'view_day', title: 'Projects', link: '/'},
            {icon: 'account_circle', title: 'User Goes Here', link: null}
          ]
        }
        return menu
      }
    },
    methods: {
      logUserOut () {
        this.$http.post(`http://localhost:8000/api/logout`)
          .then((result) => {
            // this.loading = false
            console.log('Success', result)
            if (result && result.ok && result.status === 200) {
              this.$store.commit('setToken', null)
              this.$router.push('signin')
            }
          }, (error) => {
            // this.loading = false
            if (error && !error.ok && error.body.message === 'Token has expired') {
              this.$store.commit('setToken', null)
              this.$router.push('signin')
            }
            console.log('Error', error)
          })
      }
    },
    name: 'App'
  }
</script>
