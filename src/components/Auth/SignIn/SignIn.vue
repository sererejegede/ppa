<template src="./SignIn.html"></template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  import API from '../../../helpers/API'

  export default {
    name: 'SignIn',
    mixins: [ validationMixin ],
    validations: {
      signInUser: {
        email: {required, email},
        password: {required}
      }
    },
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
    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.signInUser.email.$dirty) return errors
        !this.$v.signInUser.email.required && errors.push('Email is required')
        !this.$v.signInUser.email.email && errors.push('Must be a valid email')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.signInUser.password.$dirty) return errors
        !this.$v.signInUser.password.required && errors.push('Password is required')
        return errors
      }
    },
    methods: {
      signIn () {
        this.loader.creating = true
        console.log(this.signUpUser)
        // this.$http.post('http://localhost:8000/api/login', this.signInUser)
        API.post('login', this.signInUser)
          .then(result => {
            console.log(result)
            if (result.data && result.data.token) {
              this.$store.commit('setToken', result.data.token)
              this.setUser(result.data.user)
              this.$router.push('companies')
            }
            this.loader.creating = false
          }, error => {
            console.log(error)
            this.loader.creating = false
          })
      },
      setUser (user) {
        console.log(user)
        this.$store.commit('setUser', user)
      }
    }
  }
</script>
