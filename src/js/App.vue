<template>
  <div class="container">
    <div class="header-component">
    <!-- <MatchesFilter :countFilteredMatches="matchesFilter.length" -->
    <MatchesFilter :refreshData="refreshData"/>
    <MatchesList :matches="matchesFilter"/>         
    </div>
    <!-- /.header-component -->
  </div>
  <!-- /.main-boxt -->
</template>

<script>
  import MatchesList from './components/MatchesList'
  import MatchesFilter from './components/MatchesFilter'
  import {getMatchesAPI} from './components/HttpRequests.js'
  import { mapGetters } from 'vuex';

  export default {
    name: 'MatchesData',
    mounted() {
      this.refreshData();
    },
    components: {
      MatchesList,
      MatchesFilter,
    },
    methods: {
      refreshData(){
        this.$store.dispatch('CHANGE_LOADING')
        getMatchesAPI(this.getIsLive)
        .then(matches => {
          this.$store.dispatch('CHANGE_MATCHES', matches.items)
        })
        .finally(()=>{
          this.$store.dispatch('CHANGE_LOADING')})
      },
    },
    computed: {
      ...mapGetters(['getMatches', 'getUserInput', 'getIsLive']),
      matchesFilter() {
        let filteredMatchesArray = [];
        if(this.getUsersInput !== ""){
             filteredMatchesArray = this.getMatches.filter((match) => {
              let usersInput = this.getUserInput.toLowerCase()
              let firstTeam = match.opponent1NameLocalization.toLowerCase()
              let secondTeam = match.opponent2NameLocalization.toLowerCase()
             return (firstTeam.indexOf(usersInput) !== -1) + (secondTeam.indexOf(usersInput) !== -1)
             }) 
        } else {
         return this.getMatches
        }
       return filteredMatchesArray
      }
    }
  }
</script>
