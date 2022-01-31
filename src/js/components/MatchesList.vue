<template>
  <div>
    <div v-if="!isLoading">
      <NotFoundMatches  v-if="matches.length === 0" class="not-found" />
      <div v-else>
        <TableHeader :isLive="isLive"/>
        <Match v-for="match in matches" :key="match.constEventId" :match="match" class="match"/>
      </div>
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
  import TableHeader from "./TableHeader"

  export default {
    name: 'match',
    props: ["matches", "isLoading", "isLive"],
    components: {
      Match,
      Loading,
      NotFoundMatches,
      TableHeader,
    }
  }
</script>
