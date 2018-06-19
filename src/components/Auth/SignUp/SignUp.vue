<template src="./SignUp.html"></template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'

  export default {
    name: 'SignUp',
    mixins: [ validationMixin ],
    validations: {
      signUpUser: {
        name: {required},
        username: {required},
        email: {required, email},
        password: {required, minLength: minLength(8)},
        password_confirmation: {sameAsPassword: sameAs('password')}
      }
    },
    data () {
      return {
        valid: false,
        alertMessage: {
          bool: false,
          type: '',
          messages: []
        },
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
    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.signUpUser.name.$dirty) return errors
        !this.$v.signUpUser.name.required && errors.push('Name is required')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.signUpUser.email.$dirty) return errors
        !this.$v.signUpUser.email.email && errors.push('Must be valid e-mail')
        !this.$v.signUpUser.email.required && errors.push('E-mail is required')
        return errors
      },
      usernameErrors () {
        const errors = []
        if (!this.$v.signUpUser.username.$dirty) return errors
        !this.$v.signUpUser.username.required && errors.push('Username is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.signUpUser.password.$dirty) return errors
        !this.$v.signUpUser.password.required && errors.push('You\'d have to provide a password')
        !this.$v.signUpUser.password.minLength && errors.push('Passwords less than 8 characters are for the weak!')
        return errors
      },
      password_confirmationErrors () {
        const errors = []
        if (!this.$v.signUpUser.password_confirmation.$dirty) return errors
        !this.$v.signUpUser.password_confirmation.sameAsPassword && errors.push('Passwords must match. Duhh!')
        return errors
      }
    },
    methods: {
      signUp () {
        this.loader.creating = true
        console.log(this.signUpUser)
        this.$http.post('http://localhost:8000/api/register', this.signUpUser)
          .then(result => {
            console.log('Success', result)
            this.alertMessage.messages = []
            this.loader.creating = false
            this.alertMessage.bool = true
            this.alertMessage.type = 'success'
            this.alertMessage.messages.push(`${result.body.data.name} created successfully`)
          }, error => {
            console.log('Error', error)
            if (error && error.body && error.body.errors) {
              this.handleErrors(error.body.errors)
            }
            this.loader.creating = false
          })
      },
      handleErrors (errors) {
        this.alertMessage.messages = []
        this.alertMessage.bool = true
        this.alertMessage.type = 'error'
        const allErrors = errors
        for (let key in allErrors) {
          this.alertMessage.messages.push(allErrors[key].toString())
        }
      }
    }
  }
</script>
