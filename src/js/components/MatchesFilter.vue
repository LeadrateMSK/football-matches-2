<template>
  <div class="search">
    <span class="iconify" data-icon="akar-icons:search"></span>
    <div class="search__filter">
      <input class="search__input"
             v-model="usersInput"
             type="text" 
             placeholder='Поиск по оппонентам...'
            >
      <!-- /.search__input -->
      <!-- /.search__filter -->
      <button class="search__refresh" @click="refreshData">
        <span class="iconify" data-icon="ci:refresh-02"></span>
      </button>
      <!-- /.search__refresh -->
    </div>
    <!-- /.search -->
    <div class="search__report">
      <div v-if="resultsForSearch" class='search__report_isHasReports' >
        Результатов по запросу: {{resultsForSearch}} 
      </div> 
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
        usersInput: "",
      }
    },
    props: ['resultsForSearch', 'refreshData'],
    watch: {
      usersInput() { 
        this.$emit('getUsersInput', this.usersInput);
      },
    },
    mounted(){},
    methods: {

    }
  }
  


</script>
