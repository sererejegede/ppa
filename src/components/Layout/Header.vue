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
        <v-btn flat :to="menu.link">
          <v-icon left>{{ menu.icon}}</v-icon>
          {{ menu.title }}
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
        sideNav: false,
        menuItems: [
          {icon: 'account_circle', title: 'Users', link: '/'},
          {icon: 'dns', title: 'Companies', link: '/companies'},
          {icon: 'view_day', title: 'Projects', link: '/'},
          {icon: 'face', title: 'Sign Up', link: '/signin'},
          {icon: 'lock_open', title: 'Sign In', link: '/signup'}
        ]
      }
    },
    name: 'App'
  }
</script>
