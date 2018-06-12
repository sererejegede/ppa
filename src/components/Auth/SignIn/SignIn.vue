<template src="./SignIn.html"></template>

<script>
  export default {
    name: 'SignIn',
    data () {
      return {
        signInUser: {
          email: '',
          password: ''
        },
        loader: {
          creating: false
        }
      }
    },
    methods: {
      signIn () {
        this.loader.creating = true
        console.log(this.signUpUser)
        this.$http.post('http://localhost:8000/api/login', this.signInUser)
          .then(result => {
            console.log(result)
            this.loader.creating = false
          }, error => {
            console.log(error)
            this.loader.creating = false
          })
      }
    }
  }
</script>
