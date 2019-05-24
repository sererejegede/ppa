<template src="./Users.html"></template>

<script>
  import API from '../../../helpers/API'

  export default {
    name: 'Users',
    data () {
      return {
        allUsers: [],
        search: '',
        editedIndex: -1,
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
    created () {
    },
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
        }, (error) => {
          this.loader.loading = false
          console.log('Error', error)
        })
    },
    computed: {},
    methods: {
      deleteItem (item) {
        this.editedIndex = this.allUsers.indexOf(item)
        // this.editedProject = {...item}
        this.deleteCompany(item.id)
      },
      deleteCompany (id) {
        if (!confirm('Do you really want to delete')) return
        this.allUsers[this.editedIndex]['deleting'] = true
        API.delete(`users/${id}`)
          .then((result) => {
            this.allUsers[this.editedIndex]['deleting'] = false
            this.allUsers.splice(this.editedIndex, 1)
          }, (error) => {
            this.allUsers[this.editedIndex]['deleting'] = false
            console.log('Error', error)
          })
          .catch(error => console.log(error))
      }
    }
  }
</script>

<style scoped>
  td a {
    text-decoration: none;
  }

  td a:hover {
    text-decoration: underline;
  }
</style>
