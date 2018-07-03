<template src="./Header.html"></template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
        user_image: 'http://localhost:8000/storage/profile_pics/default-user.png',
        loader: {
          loading: false
        }
      }
    },
    computed: {
      getLoggedInUser () {
        if (this.$store.state.loggedInUser && this.$store.state.loggedInUser.user && this.$store.state.loggedInUser.user.profile_pic) {
          this.user_image = this.$store.state.loggedInUser.user.profile_pic
        }
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
        this.loader.loading = true
        this.$http.post(`http://localhost:8000/api/logout`)
          .then((result) => {
            this.loader.loading = false
            if (result && result.ok && result.status === 200) {
              this.$store.dispatch('logUserOut')
              const origin = window.location.origin
              window.location.replace(`${origin}/signin`)
            }
          }, (error) => {
            this.loader.loading = false
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
