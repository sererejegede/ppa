<template src="./companies.html"></template>

<script>
  export default {
    name: 'Companies',
    data () {
      return {
        allCompanies: [],
        loading: false,
        dialog: false,
        editedIndex: -1,
        search: '',
        editedItem: {
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
    created () {
      // this.loading = true
      // fetch('http://localhost:8000/api/companies')
      //   .then(res => res.json())
      //   .then((result) => {
      //     this.loading = false
      //     console.log('Success', result)
      //     this.allCompanies = result
      //   }, (error) => {
      //     this.loading = false
      //     console.log('Error', error)
      //   })
    },
    methods: {
      editItem (item) {
        this.editedIndex = this.allCompanies.indexOf(item)
        this.editedItem = Object.assign({}, item)
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
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        this.loading = true
        this.editedItem['user_id'] = 2
        // this.$http.post('http://localhost:8000/api/companies', this.editedItem)
        //   .then(result => {
        //     console.log(result)
        //   }, error => { console.log(error) })
        fetch('http://localhost:8000/api/companies', {
          method: 'POST',
          body: JSON.stringify(this.editedItem),
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
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
      fetch('http://localhost:8000/api/companies')
        .then(res => res.json())
        .then((result) => {
          this.loading = false
          console.log('Success', result)
          if (result && result.code === 401) {
            return
          }
          this.allCompanies = result
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
