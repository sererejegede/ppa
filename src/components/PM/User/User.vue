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
          user_image: 'http://localhost:8000/storage/profile_pics/default-user.png'
        }
      },
      mounted () {
        this.loader.loading = true
        API.get(`users/${this.user_id}`)
          .then((result) => {
            this.loader.loading = false
            // console.log('Success', result)
            this.user = result.body
            this.getProfilePic()
          }, (error) => {
            this.loader.loading = false
            console.log('Error', error)
          })
      },
      methods: {
        getProfilePic () {
          if (this.user.profile_pic) {
            this.user_image = this.$store.state.loggedInUser.user.profile_pic
          }
        },
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
              if (parseInt(this.$store.state.loggedInUser.user.id, 10) === parseInt(result.body.user.id)) {
                this.$store.dispatch('setUser', result.body)
                // this.$store.dispatch('setProfilePic')
                this.getProfilePic()
              }
            }, (error) => {
              this.loader.uploading = false
              console.log('Error', error)
            })
        },
        changeImage () {
          if (this.$refs.user_image && this.$refs.user_image.files.length !== 0) {
            this.user_image = URL.createObjectURL(this.$refs.user_image.files[0])
          }
        }
      },
      computed: {
        // changeImage () {
        //   if (this.$refs.user_image) {
        //     console.log('Image URL', URL.createObjectURL(this.$refs.user_image.files[0]))
        //     this.user_image = URL.createObjectURL(this.$refs.user_image.files[0])
        //   }
        // }
      }
    }
</script>

<style scoped>
  .cursor:hover {
    cursor: pointer;
  }
</style>
