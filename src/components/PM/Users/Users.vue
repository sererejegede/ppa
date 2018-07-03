<template src="./Users.html"></template>

<script>
    import API from '../../../helpers/API'

export default {
      name: 'Users',
      data () {
        return {
          allUsers: [],
          search: '',
          loader: {
            loading: false
          },
          headers: [
            {text: '#', align: 'left', value: 'number', sortable: true},
            {text: 'Image', align: 'left', value: 'image', sortable: false},
            {text: 'Name', align: 'left', sortable: true, value: 'name'},
            {text: 'Email', align: 'left', value: 'description', sortable: true},
            {text: 'Role', align: 'left', value: 'description', sortable: true},
            {text: 'Date Created', align: 'left', value: 'created_at', sortable: true},
            {text: 'Date Updated', align: 'left', value: 'updated_at', sortable: true},
            {text: 'Actions', align: 'left', value: 'actions', sortable: false}
          ]
        }
      },
      created () {},
      mounted () {
        this.loader.loading = true
        API.get('users')
          .then((result) => {
            this.loader.loading = false
            console.log('Success', result)
            if (result && result.code === 401) {
              return
            }
            this.allUsers = result.body
            this.profilePics()
          }, (error) => {
            this.loader.loading = false
            console.log('Error', error)
          })
      },
      computed: {},
      methods: {
        profilePics () {
          this.allUsers.forEach(user => {
            if (user.profile_pic) {
              user.profile_pic = 'http://localhost:8000/' + user.profile_pic
            }
          })
        }
      }
    }
    // \PHP\Laravel\Preference\storage\app\public\profile_pics
    // \Vue js\webpack-vue\src\components\PM\User\User.html
    // ../../../../../../PHP/Laravel/Preference/
</script>

<style scoped>
  td a{
    text-decoration: none;
  }
  td a:hover{
    text-decoration: underline;
  }
</style>
