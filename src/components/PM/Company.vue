<template>

</template>

<script>
    export default {
      name: 'Company',
      data () {
        return {
          loading: false,
          company_id: this.$route.params.id
        }
      },
      created () {
        this.loading = true
        fetch(`http://localhost:8000/api/companies/${this.company_id}`)
          .then(res => res.json())
          .then((result) => {
            this.loading = false
            console.log('Success', result)
            // this.companies = result
          }, (error) => {
            this.loading = false
            console.log('Error', error)
          })
      }
    }
</script>

<style scoped>

</style>
