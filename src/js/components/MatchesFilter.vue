<template>
  <div class="search">
    <span class="iconify" data-icon="akar-icons:search"></span>
    <div class="search__filter">
      <input class="search__input"
             v-model="value"
             type="text" 
             placeholder='Поиск по оппонентам...'
             @keyup.enter="filterMatchesArray">
      <!-- /.search__input -->
      <!-- /.search__filter -->
      <button class="search__refresh" @click="refreshData">
        <span class="iconify" data-icon="ci:refresh-02" style="color: white;"></span>
      </button>
      <!-- /.search__refresh -->
    </div>
    <!-- /.search -->
    <div v-bind:class="[searchResults ? 'search__report_visable' : 'search__report_unvisable']" >
      Результатов по запросу: {{searchResults}} 
    </div>
    <!-- /.search__report -->
  </div>
  <!-- /.search -->
</template>

<script>
  export default {
    name: 'MatchesFilter',
    data(){
      return {
        value: "",
        filteredMatchesArray: [],
      }
    },
    props: ["unfilteredMatchesArray", "queryOpponent", "newQueryOpponent", "usersInput", "searchResults"],
    watch: {
      value() { 
        this.$emit('getUsersInput', this.value);
      },
      filteredMatchesArray() {
        this.$emit('getFilteredMatchesArray', this.filteredMatchesArray)
      }
    },
    mounted(){},
    methods: {
      filterMatchesArray(){
        this.filteredMatchesArray = [];
        if(this.usersInput !== ""){
          let usersInput = this.usersInput.toLowerCase();
          for( let i = 0; i < this.unfilteredMatchesArray.length; i++){
          let firstTeam = this.unfilteredMatchesArray[i].opponent1NameLocalization.toLowerCase();
          let secondTeam = this.unfilteredMatchesArray[i].opponent2NameLocalization.toLowerCase();

          // this.filteredMatchesArray = this.unfilteredMatchesArray.filter(() => {     Isn't work. It must be fixed
          //   return firstTeam || secondTeam === usersInput})

            if(firstTeam === usersInput) {
              this.filteredMatchesArray.push(this.unfilteredMatchesArray[i])
            }
            if(secondTeam === usersInput){
              this.filteredMatchesArray.push(this.unfilteredMatchesArray[i])
            }
          }
        } else {
          for( let i = 0; i < this.unfilteredMatchesArray.length; i++){
            this.filteredMatchesArray.push(this.unfilteredMatchesArray[i])
          }
        }
        this.getSearchResults()
      },

      refreshData(){
        this.$emit('refreshData', "")
      },

      getSearchResults(){
        this.$emit('getSearchResults', this.filteredMatchesArray.length)
      }
    }
  }
  
</script>
