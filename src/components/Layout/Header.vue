<template src="./Header.html"></template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      getLoggedInUser () {
        return this.$store.state.loggedInUser
      },
      menuItems () {
        let menu = [
          {icon: 'face', title: 'Sign Up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign In', link: '/signin'}
        ]
        if (this.$store.getters.getToken && this.$store.getters.getToken !== undefined) {
          menu = [
            {icon: 'account_circle', title: 'Users', link: '/users'},
            {icon: 'dns', title: 'Companies', link: '/companies'},
            {icon: 'view_day', title: 'Projects', link: '/'}
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
              this.$store.dispatch('logUserOut')
              this.$router.push('signin')
            }
          }, (error) => {
            // this.loading = false
            if (error && !error.ok && error.body.message === 'Token has expired') {
              this.$store.dispatch('logUserOut')
              this.$router.push('signin')
            }
            console.log('Error', error)
          })
      }
    },
    name: 'App'
  }
</script>
