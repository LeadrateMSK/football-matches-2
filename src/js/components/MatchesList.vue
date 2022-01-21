<template>
  <div>
    <div v-if="!isLoading">
      <div v-if="matches.length === 0" class="not-found">
        <div class="not-found__picture">
          <span class="iconify" data-icon="iconoir:file-not-found" style="color: #999;"></span>
        </div>
        <!-- /.not-found__picture -->
        <div class="not-found__message">
          Матч не найден
        </div>
        <!-- /.not-found__message -->
      </div>
      <!-- /.not-found -->
      <div v-else class="table">
        <Match :matches="matches"/>
      </div>
      <!-- /.table -->
    </div>
    <!-- /if -->
    <div v-else>
      <div class="loading">
        <span class="iconify" data-icon="ep:loading"></span> 
        <div class="loading__text">
          Загрузка
        </div>
      <!-- /.loading__text -->        
      </div>
      <!-- /.loading -->
    </div>
    <!-- /else -->
  </div>
  <!-- /.div -->
</template>

<script>
import Match from "./Match"
  export default {
    name: 'match',
    props: ["matches", "isLoading"],
    components: {
      Match
    }
  }
</script>
