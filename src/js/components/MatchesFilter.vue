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
      <div v-if="countFilteredMatches" class='search__report_isHasReports' >
        Результатов по запросу: {{countFilteredMatches}} 
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
    props: ['countFilteredMatches', 'refreshData'],
    watch: {
      usersInput() { 
        this.$emit('input', this.usersInput);
      },
    },
    mounted(){},
    methods: {

    }
  }
  


</script>
