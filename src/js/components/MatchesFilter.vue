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
      <label class="search__toggle">
	      <input type="checkbox" v-model="checkboxClicked">
  	    <span class="search__toggle-switch"></span>
        <div class="search__toggle-text"
             :class="{'search__toggle-text_active':checkboxClicked === true}">
          LIVE
        </div>
        <!-- /.search__toggle-text -->
      </label>
      <!-- /.search__toggle -->
      <button class="search__refresh" @click="refreshData">
        <span class="iconify" data-icon="ci:refresh-02"></span>
      </button>
      <!-- /.search__refresh -->
    </div>
    <!-- /.search__filter -->
  </div>
  <!-- /.search -->
</template>

<script>
  export default {
    name: 'MatchesFilter',
    data(){
      return {
        usersInput: "",
        checkboxClicked: false,
      }
    },
    props: ['countFilteredMatches', 'refreshData'],
    watch: {
      usersInput() { 
        this.$emit('input', this.usersInput);
      },
      checkboxClicked(){
        this.$emit('checkboxClicked', this.checkboxClicked);
      }
    },
  }
</script>
