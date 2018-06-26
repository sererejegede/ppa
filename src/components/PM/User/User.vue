<template src="./User.html"></template>

<script>
    import API from '../../../helpers/API'

export default {
      name: 'User',
      data () {
        return {
          loader: {
            loading: false
          },
          user_id: this.$route.params.id,
          user: {}
        }
      },
      mounted () {
        this.loader.loading = true
        API.get(`users/${this.user_id}`)
          .then((result) => {
            this.loader.loading = false
            console.log('Success', result)
            this.user = result.body
            this.getProfilePic()
          }, (error) => {
            this.loader.loading = false
            console.log('Error', error)
          })
      },
      methods: {
        getProfilePic () {
          this.user.profile_pic = 'http://localhost:8000/' + this.user.profile_pic
        }
      }
    }
</script>

<style scoped>

</style>
