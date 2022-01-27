<template>
  <div class="loading">
    <span class="iconify" data-icon="ep:loading"></span> 
      <div class="loading__text">
        Загрузка
      </div>
    <!-- /.loading__text -->        
  </div>
</template>

<script>
  export default {
    name: 'loading',
    props: ["isLoading"],
  }
</script>
