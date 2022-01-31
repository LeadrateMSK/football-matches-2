<template>
  <div class="container">
    <div class="header-component">
    <!-- <MatchesFilter :countFilteredMatches="matchesFilter.length" -->
    <MatchesFilter :refreshData="refreshData"
                   @input="input"
                   @checkboxClicked="checkboxClicked"/>
    <MatchesList :matches="matchesFilter"
                 :isLoading="isLoading"
                 :isLive="isLive"/>          
    </div>
    <!-- /.header-component -->
  </div>
  <!-- /.main-boxt -->
</template>

<script>
  import MatchesList from './components/MatchesList'
  import MatchesFilter from './components/MatchesFilter'
  import {getMatchesAPI} from './components/HttpRequests.js'

  export default {
    name: 'MatchesData',
    data(){
      return{
        matches: [],
        isLoading: false,
        usersInput: '',
        isLive: '',
      }
    },
    mounted() {
      this.refreshData()
    },
    components: {
      MatchesList,
      MatchesFilter,
    },
    methods: {
      input(input){
        this.usersInput = input
      },
      refreshData(){
        this.isLoading = true
        getMatchesAPI(this.isLive)
        .then(matches => {
          this.matches = matches.items
        })
        .finally(()=>{this.isLoading = false})
      },

      checkboxClicked(isChecked){
        isChecked ? (this.isLive = "live") : (this.isLive = "")
        this.refreshData()
      }
    },
    computed: {
      matchesFilter() {
        let filteredMatchesArray = [];
        if(this.usersInput !== ""){
             filteredMatchesArray = this.matches.filter((match) => {
              let usersInput = this.usersInput.toLowerCase()
              let firstTeam = match.opponent1NameLocalization.toLowerCase()
              let secondTeam = match.opponent2NameLocalization.toLowerCase()
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
