<template>
  <div class="header-component">
    <MatchesFilter :resultsForSearch="matchesFilter.length"
                   :refreshData="refreshData"
                   @getUsersInput="getUsersInput"/>
    <MatchesList :matches="matchesFilter"
                 :isLoading="isLoading"/>          
  </div>
  <!-- /.header-component -->
</template>

<script>
  import MatchesList from './MatchesList'
  import MatchesFilter from './MatchesFilter'
  import {getMatchesAPI} from './HttpRequests.js'

  export default {
    name: 'MatchesData',
    data(){
      return{
        matches: [],
        isLoading: false,
        usersInput: '',
      }
    },
    props: [],
    mounted() {
      this.refreshData()
    },
    components: {
      MatchesList,
      MatchesFilter,
    },
    methods: {
      getUsersInput(input){
        this.usersInput = input
      },

      refreshData(){
        this.isLoading = true
        getMatchesAPI()
        .then(matches => {
          this.matches = matches.items
        })
        .finally(()=>{this.isLoading = false})
      },
    },
    computed: {
      matchesFilter() {
        let filteredMatchesArray = [];
        if(this.usersInput !== ""){
             filteredMatchesArray = this.matches.filter((name) => {
              let usersInput = this.usersInput.toLowerCase()
              let firstTeam = name.opponent1NameLocalization.toLowerCase()
              let secondTeam = name.opponent2NameLocalization.toLowerCase()
             return (firstTeam.indexOf(usersInput) !== -1) + (secondTeam.indexOf(usersInput) !== -1)
             }) 
        } else {
         return this.matches
        }
       return filteredMatchesArray
      }
    }
  }
</script>