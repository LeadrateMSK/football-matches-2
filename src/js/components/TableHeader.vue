<template>
 <div class="tableHeader">
    <div class="match__time tableHeader__time">
      <div v-if="isLive">Время</div>
      <div v-else>Начало</div>
    </div>
    <!-- /.match__time tableHeader__time -->    
    <div class="versus"></div>
    <!-- /.versus -->
    <div class="match__translation">
      Трансляция
    </div>
    <!-- /.match__translation --> 
    <div class="match__bet tableHeader__bet">П1</div>
    <div class="match__bet tableHeader__bet">Х</div>
    <div class="match__bet tableHeader__bet">П2</div>  
  </div>
  <!-- /.tableHeader --> 
</template>

<script>
  export default {
    name: 'tableHeader',
    props: ["isLive"],
  }
</script>
