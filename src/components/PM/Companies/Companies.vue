<template src="./Companies.html"></template>

<script>
  import API from '../../../helpers/API'

  export default {
    name: 'Companies',
    data () {
      return {
        allCompanies: [],
        loading: false,
        dialog: false,
        editedIndex: -1,
        search: '',
        editedCompany: {
          name: '',
          description: ''
        },
        defaultItem: {
          name: '',
          description: ''
        },
        headers: [
          {text: '#', align: 'left', value: 'number', sortable: true},
          {text: 'Name', align: 'left', sortable: true, value: 'name'},
          {text: 'Description', align: 'left', value: 'description', sortable: true},
          {text: 'Date Created', align: 'left', value: 'created_at', sortable: true},
          {text: 'Date Updated', align: 'left', value: 'updated_at', sortable: true},
          {text: 'Actions', align: 'left', value: 'actions', sortable: false}
        ]
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    created () {},
    methods: {
      editItem (item) {
        this.editedIndex = this.allCompanies.indexOf(item)
        this.editedCompany = Object.assign({}, item)
        this.dialog = true
        console.log(item)
      },
      deleteItem (item) {
        this.editedIndex = this.allCompanies.indexOf(item)
        console.log(item)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedCompany = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        this.loading = true
        this.editedCompany['user_id'] = 2
        API.post('companies', this.editedCompany)
          .then((result) => {
            this.loading = false
            console.log('Success', result)
            this.allCompanies.push(result)
          }, (error) => {
            this.loading = false
            console.log('Error', error)
          })
          .catch(error => console.log(error))
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Company' : 'Edit Company'
      }
    },
    mounted () {
      this.loading = true
      API.get('companies')
        .then((result) => {
          this.loading = false
          console.log('Success', result)
          if (result && result.code === 401) {
            return
          }
          this.allCompanies = result.body.data
        }, (error) => {
          this.loading = false
          console.log('Error', error)
        })
    }
  }
</script>

<style scoped>
  td a{
    text-decoration: none;
  }
</style>
