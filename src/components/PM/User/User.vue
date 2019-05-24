<template src="./User.html"></template>

<script>
    import API from '../../../helpers/API'

export default {
      name: 'User',
      data () {
        return {
          loader: {
            loading: false,
            uploading: false
          },
          user_id: this.$route.params.id,
          user: {},
          user_image: 'http://localhost:8000/storage/profile_pics/default-user.png',
          alertMessage: {
            bool: false,
            type: '',
            messages: []
          }
        }
      },
      mounted () {
        this.loader.loading = true
        API.get(`users/${this.user_id}`)
          .then((result) => {
            this.loader.loading = false
            console.log('Success', result)
            this.user = result.body
          }, (error) => {
            this.loader.loading = false
            console.log('Error', error)
          })
      },
      methods: {
        triggerFileInput () {
          this.$refs.user_image.click()
        },
        uploadImage () {
          let picture = new FormData()
          picture.append('profile_pic', this.$refs.user_image.files[0], 'picture')
          this.loader.uploading = true
          API.post(`uploadFile/${this.user_id}`, picture)
            .then((result) => {
              this.loader.uploading = false
              console.log('Success', result)
              if (parseInt(this.$store.state.loggedInUser.user.id, 10) === parseInt(result.body.user.id, 10)) {
                this.$store.dispatch('setUser', result.body)
                // this.$store.dispatch('setProfilePic')
              }
            }, (error) => {
              this.loader.uploading = false
              this.alertMessage.bool = true
              this.alertMessage.type = 'error'
              this.alertMessage.messages = []
              if (error.status === 401 || error.status === 422) {
                this.alertMessage.messages.push(error.body.message)
                this.dismissError()
              }
              console.log('Error', error)
            })
        },
        changeImage () {
          if (this.$refs.user_image && this.$refs.user_image.files.length !== 0) {
            this.user.profile_pic = URL.createObjectURL(this.$refs.user_image.files[0])
          }
        },
        dismissError () {
          setTimeout(() => { this.alertMessage.bool = false }, 10000)
        }
      },
      computed: {
        isUserLoggedIn () {
          return this.$store.state.loggedInUser.user.id.toString() === this.user_id
        }
      }
    }
</script>

<style scoped>
  .cursor:hover {
    cursor: pointer;
  }
</style>
