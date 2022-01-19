<template>
  <div>
    <div v-if="!isLoading">
      <div v-if="filteredMatchesArray.length" class="table">
        <ul>
          <li v-for="match in filteredMatchesArray" :key="match.constEventId">
            <div class="table__time">
              {{"45:47"}}
            </div>
            <!-- /.table__time -->    
            <div class="versus">
              <div class="versus__team-first">
                {{match.opponent1NameLocalization}}
              </div>
              <!-- /.versus__team-first-localization --> 
              <img :src="`https://nimblecd.com/sfiles/logo_teams/${match.imageOpponent1}`" class="versus__team-img"></img>
              <div class="versus__score">
                {{"3 : 2"}}
              </div>
              <!-- /.versus__score -->       
              <img :src="`https://nimblecd.com/sfiles/logo_teams/${match.imageOpponent2}`" class="versus__team-img"></img>
              <!-- <img :src="require(`../assets/${match.imageOpponent2}`)" class="versus__team-img"></img> -->
              <div class="versus__team">
                {{match.opponent2NameLocalization}}
              </div>
              <!-- /.versus__team-second-localization -->         
            </div>
            <!-- /.versus -->
            <div class="table__translation">
              <div v-if="match.hasVideo" class="table__translation_able">
                <a :href="`${match.link}`">
                  <span class="iconify" data-icon="el:play-alt"></span>
                  {{ "Трансляция"}}
                </a>
                <!-- /a -->
              </div>
              <!-- /.table_is-translation-able -->   
              <div v-if="!match.hasVideo" class="table__translation_disable">
                без трансляции
              </div>
              <!-- /.table_is-translation-disable -->
            </div>
            <!-- /.table__translation -->   
          </li>
          <!-- /.ul -->
        </ul>
        <!-- /.ul -->
      </div>
      <!-- /.table -->
      <div v-else class="not-found">
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
  export default {
    name: 'match',
    props: ["filteredMatchesArray", "isLoading"],
  }
</script>


<style scoped>
@keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
}
.loading > .iconify{
  color: #6FCF97;
  font-size: 63px;
    animation: spin 2s linear 0s infinite;
}



</style>