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
        alertMessage: {
          bool: false,
          type: '',
          messages: []
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
        if (this.$v.signInUser.$invalid) {
          return
        }
        this.loader.creating = true
        API.post('login', this.signInUser)
          .then(result => {
            console.log(result)
            if (result.body && result.body.token) {
              this.setUser(result.body)
              this.$router.push('companies')
            }
            this.loader.creating = false
          }, error => {
            console.log(error)
            this.alertMessage.bool = true
            this.alertMessage.type = 'error'
            this.alertMessage.messages = []
            if (error.status === 401) {
              this.alertMessage.messages.push(error.body.message)
              this.dismissError()
            }
            if (error && error.body && error.body.errors) {
              this.handleErrors(error.body.errors)
              this.dismissError()
            }
            this.loader.creating = false
          })
      },
      handleErrors (errors) {
        const allErrors = errors
        for (let key in allErrors) {
          this.alertMessage.messages.push(allErrors[key].toString())
        }
      },
      setUser (userData) {
        if (userData.user.profile_pic) {
          userData.user.profile_pic = 'http://localhost:8000/' + userData.user.profile_pic
        }
        this.$store.dispatch('setUser', userData)
        // this.$store.dispatch('setToken', userData.token)
      },
      dismissError () {
        setTimeout(() => { this.alertMessage.bool = false }, 10000)
      }
    }
  }
</script>
