<template>
  <div>
    <div v-if="!isLoading">
      <NotFoundMatches  v-if="matches.length === 0" class="not-found" />
      <Match  v-else v-for="match in matches" :match="match" class="table"/>
    </div>
    <!-- /if -->
    <Loading v-else :isLoading="isLoading"/> 
    <!-- /.loading -->
  </div>
  <!-- /.div -->
</template>

<script>
import Match from "./Match"
import Loading from "./Loading"
import NotFoundMatches from "./NotFoundMatches"

  export default {
    name: 'match',
    props: ["matches", "isLoading"],
    components: {
      Match,
      Loading,
      NotFoundMatches,
    }
  }
</script>
