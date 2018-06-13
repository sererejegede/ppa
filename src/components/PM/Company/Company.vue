<template src="./Company.html"></template>

<script>
  import API from '../../../helpers/API'

  export default {
    name: 'Company',
    data () {
      return {
        loading: false,
        company_id: this.$route.params.id,
        company: {}
      }
    },
    created () {},
    mounted () {
      this.loading = true
      API.get(`companies/${this.company_id}`)
        .then((result) => {
          this.loading = false
          console.log('Success', result)
          this.company = result.body
        }, (error) => {
          this.loading = false
          console.log('Error', error)
        })
    }
  }
</script>

<style scoped>

</style>
