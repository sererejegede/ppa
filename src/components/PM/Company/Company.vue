<template src="./Company.html"></template>

<script>
  import API from '../../../helpers/API'

  export default {
    name: 'Company',
    data () {
      return {
        loading: false,
        company_id: this.$route.params.id,
        company: {},
        projects: [],
        loader: {
          creating: false,
          loading: false,
          saving: false,
          deleting: false
        },
        statuses: ['PENDING', 'COMPLETED', 'NOT STARTED'],
        dialog: false,
        editedIndex: -1,
        search: '',
        editedProject: {
          name: '',
          description: '',
          status: '',
          days: ''
        },
        defaultItem: {
          name: '',
          description: '',
          status: '',
          days: ''
        },
        headers: [
          {text: '#', align: 'left', value: 'number', sortable: true},
          {text: 'Name', align: 'left', sortable: true, value: 'name'},
          {text: 'Description', align: 'left', value: 'description', sortable: true},
          {text: 'Days', align: 'left', value: 'days', sortable: true},
          {text: 'Status', align: 'left', value: 'status', sortable: true},
          {text: 'Date Created', align: 'left', value: 'created_at', sortable: true},
          {text: 'Date Updated', align: 'left', value: 'updated_at', sortable: true},
          {text: 'Actions', align: 'left', value: 'actions', sortable: false}
        ]
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Project' : 'Edit Project'
      }
    },
    created () {},
    mounted () {
      this.loader.loading = true
      API.get(`companies/${this.company_id}`)
        .then((result) => {
          this.loader.loading = false
          console.log('Success', result)
          this.company = result.body
          this.projects = result.body.projects
        }, (error) => {
          this.loader.loading = false
          console.log('Error', error)
        })
    },
    methods: {
      editItem (item) {
        this.editedIndex = this.projects.indexOf(item)
        this.editedProject = {...item}
        this.dialog = true
      },
      deleteItem (item) {
        this.editedIndex = this.projects.indexOf(item)
        this.editedProject = {...item}
        this.deleteCompany()
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedProject = { ...this.defaultItem }
          this.editedIndex = -1
        }, 300)
      },
      save () {
        this.loader.saving = true
        if (this.editedIndex === -1) {
          API.post('projects', this.editedProject)
            .then((result) => {
              this.loader.saving = false
              this.dialog = false
              if (result.body) {
                this.projects.unshift(result.body)
              }
            }, (error) => {
              this.loader.saving = false
              this.dialog = false
              console.log('Error', error)
            })
            .catch(error => console.log(error))
        } else this.updateProject()
      },
      updateProject () {
        this.loader.saving = true
        API.put(`projects/${this.editedProject.id}`, this.editedProject)
          .then((result) => {
            this.loader.saving = false
            this.dialog = false
            if (result.body) {
              this.projects.splice(this.editedIndex, 1, result.body)
            }
          }, (error) => {
            this.loader.saving = false
            this.dialog = false
            console.log('Error', error)
          })
          .catch(error => console.log(error))
      },
      deleteCompany () {
        if (!confirm('Do you really want to delete')) return
        this.projects[this.editedIndex]['deleting'] = true
        console.log('editedIndex before api call', this.editedIndex)
        API.delete(`projects/${this.editedProject.id}`)
          .then((result) => {
            this.projects[this.editedIndex]['deleting'] = false
            console.log('Success', result)
            this.dialog = false
            this.projects.splice(this.editedIndex, 1)
          }, (error) => {
            this.projects[this.editedIndex]['deleting'] = false
            console.log('Error', error)
          })
          .catch(error => console.log(error))
      }
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
