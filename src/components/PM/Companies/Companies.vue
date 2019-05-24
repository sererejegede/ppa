<template src="./Companies.html"></template>

<script>
  import API from '../../../helpers/API'

  export default {
    name: 'Companies',
    data () {
      return {
        allCompanies: [],
        loader: {
          creating: false,
          loading: false,
          updating: false,
          deleting: false
        },
        // loading: false,
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
        this.editedCompany = {...item}
        this.dialog = true
      },
      deleteItem (item) {
        this.editedIndex = this.allCompanies.indexOf(item)
        this.editedCompany = {...item}
        this.deleteCompany()
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedCompany = { ...this.defaultItem }
          this.editedIndex = -1
        }, 300)
      },
      save () {
        this.loader.loading = true
        if (this.editedIndex === -1) {
          API.post('companies', this.editedCompany)
            .then((result) => {
              this.loader.loading = false
              this.dialog = false
              this.allCompanies.unshift(result.body)
            }, (error) => {
              this.loader.loading = false
              this.dialog = false
              console.log('Error', error)
            })
            .catch(error => console.log(error))
        } else this.updateCompany()
      },
      updateCompany () {
        API.put(`companies/${this.editedCompany.id}`, this.editedCompany)
          .then((result) => {
            this.loader.loading = false
            this.dialog = false
            this.allCompanies.splice(this.editedIndex, 1, result.body)
          }, (error) => {
            this.loader.loading = false
            this.dialog = false
            console.log('Error', error)
          })
          .catch(error => console.log(error))
      },
      deleteCompany () {
        if (!confirm('Do you really want to delete')) return
        this.allCompanies[this.editedIndex]['deleting'] = true
        API.delete(`companies/${this.editedCompany.id}`)
          .then((result) => {
            // this.loader.deleting = false
            this.allCompanies[this.editedIndex]['deleting'] = false
            console.log('Success', result)
            this.dialog = false
            this.allCompanies.splice(this.editedIndex, 1)
          }, (error) => {
            this.allCompanies[this.editedIndex]['deleting'] = false
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
      this.loader.loading = true
      API.get('companies')
        .then((result) => {
          this.loader.loading = false
          console.log('Success', result)
          if (result && result.code === 401) {
            return
          }
          this.allCompanies = result.body.data
        }, (error) => {
          this.loader.loading = false
          console.log('Error', error)
        })
    }
  }
</script>

<style scoped>
  td a{
    text-decoration: none;
  }
  td a:hover{
    text-decoration: underline;
  }
</style>
