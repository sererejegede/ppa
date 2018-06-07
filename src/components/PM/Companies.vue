<template>
  <v-container>
    <v-layout class="my-5">
      <v-flex xs12 sm10 offset-sm1>
        <h3 class="display-2">Companies</h3>
      </v-flex>
    </v-layout>
    <v-layout class="text-xs-center" v-if="loading">
      <v-flex xs12 sm10 offset-sm1>
        <v-progress-circular indeterminate color="secondary"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout v-for="company in companies" :key="company.id" class="mb-2" v-if="!loading">
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ company.name }}</h3>
              <div>{{ company.description}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat class="secondary" :to="`companies/${company.id}`">
              <v-icon left>arrow_forward</v-icon>
              View Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Companies',
    data () {
      return {
        companies: [],
        loading: false
      }
    },
    created () {
      this.loading = true
      fetch('http://localhost:8000/api/companies')
        .then(res => res.json())
        .then((result) => {
          this.loading = false
          // console.log('Success', result)
          this.companies = result
        }, (error) => {
          this.loading = false
          console.log('Error', error)
        })
    }
  }
</script>

<style scoped>

</style>
