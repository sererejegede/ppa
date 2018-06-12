<template src="./SignUp.html"></template>

<script>
  export default {
    name: 'SignUp',
    data () {
      return {
        valid: false,
        loader: {
          creating: false
        },
        signUpUser: {
          name: '',
          username: '',
          email: '',
          password: '',
          password_confirmation: ''
        }
      }
    },
    methods: {
      signUp () {
        // if (!this.signUpUser.name) {
        //   return
        // }
        this.loader.creating = true
        console.log(this.signUpUser)
        this.$http.post('http://localhost:8000/api/register', this.signUpUser)
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
