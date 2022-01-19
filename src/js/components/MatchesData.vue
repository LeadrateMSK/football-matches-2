<template>
  <div class="header-component">
    <MatchesFilter @refreshData="refreshData"
                   @getSearchResults="getSearchResults"
                   @getUsersInput="getUsersInput"
                   @getFilteredMatchesArray="getFilteredMatchesArray"
                   :usersInput="usersInput"
                   :searchResults="searchResults"
                   :unfilteredMatchesArray="unfilteredMatchesArray"/>
    <MatchesList :filteredMatchesArray="filteredMatchesArray"
                 :isLoading="isLoading"/>    
  </div>
  <!-- /.header-component -->
</template>

<script>
  import MatchesList from './MatchesList.vue'
  import MatchesFilter from './MatchesFilter.vue'
  import {getDatafromServer} from './HttpRequests.js'

  export default {
    name: 'MatchesData',
    data(){
      return{
        unfilteredMatchesArray: [],
        filteredMatchesArray: [],
        searchResults: 0,
        usersInput: "",
        isLoading: false,
      }
    },
    mounted() {
      this.isLoading = true
      getDatafromServer()
      .then(matches => {
        this.unfilteredMatchesArray = matches.items
        this.filteredMatchesArray = matches.items
        this.searchResults = matches.count
        this.isLoading = false
      })
    },
    components: {
      MatchesList,
      MatchesFilter,
    },
    methods: {
      getUsersInput(usersInput){
        this.usersInput = usersInput
      },

      getFilteredMatchesArray(array){
        this.filteredMatchesArray = array
      },

      refreshData(){
      this.isLoading = !this.isLoading
        getDatafromServer()
        .then(matches => {
          this.unfilteredMatchesArray = matches.items
          this.filteredMatchesArray = matches.items
          this.searchResults = matches.count
          this.isLoading = !this.isLoading
        })
      },

      getSearchResults(resultsCount){
        this.searchResults = resultsCount
      }
    }
  }
</script>
