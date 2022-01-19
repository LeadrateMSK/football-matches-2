<template>
  <div class="container">
    <MatchesData /> 
  </div>
  <!-- /.main-boxt -->
</template>

<script>
  import MatchesData from './components/MatchesData.vue'

  export default {
    name: 'HeaderComponent',
    components: {
      MatchesData,
    },
  }
</script>

<style>
</style>