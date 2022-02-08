<template>
  <div>
    <div v-if="getIsLoading">
      <NotFoundMatches  v-if="matches.length === 0" class="not-found" />
      <div v-else>
        <TableHeader/>
        <Match v-for="match in matches" :key="match.constEventId" :match="match" class="match"/>
      </div>
    </div>
    <!-- /if -->
    <Loading v-else /> 
    <!-- /.loading -->
  </div>
  <!-- /.div -->
</template>

<script>
  import Match from "./Match"
  import Loading from "./Loading"
  import NotFoundMatches from "./NotFoundMatches"
  import TableHeader from "./TableHeader"
    import { mapGetters } from 'vuex';

  export default {
    name: 'match',
    props: ["matches"],
    components: {
      Match,
      Loading,
      NotFoundMatches,
      TableHeader,
    },
    computed: {
      ...mapGetters(['getIsLoading']),
    }
  }
</script>
