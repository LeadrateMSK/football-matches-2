<template>
  <div>
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
  </div>
  <!-- /.div -->
</template>

<script>
  export default {
    name: 'notFoundMatches',
    props: ["matches"],
  }
</script>
