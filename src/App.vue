<template>
  <custom-header></custom-header>
</template>

<script>
  import Header from './components/Layout/Header'

  export default {
    components: {
      'custom-header': Header
    },
    data () {
      return {}
    },
    name: 'App'
  }
</script>
