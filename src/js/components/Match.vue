<template>
  <div>
    <div class="table__time">
      {{(new Date(match.timeSec*1000)).getMinutes()}}
    </div>
    <!-- /.table__time -->    
    <div class="versus">
      <div class="versus__team-first">
        {{match.opponent1NameLocalization}}
      </div>
      <!-- /.versus__team-first-localization --> 
      <img :src="getLogo(match.imageOpponent1)" class="versus__team-img"></img>
      <div class="versus__score">
        {{match.fullScore.sc1}} : {{match.fullScore.sc2}}
      </div>
      <!-- /.versus__score -->       
      <img :src="getLogo(match.imageOpponent2)" class="versus__team-img"></img>
      <div class="versus__team">
        {{match.opponent2NameLocalization}}
      </div>
      <!-- /.versus__team-second-localization -->         
    </div>
    <!-- /.versus -->
    <div class="table__translation">
      <div v-if="match.hasVideo" class="table__translation_able">
        <a :href="match.link" target="_blank">
          <span class="iconify" data-icon="el:play-alt"></span>
            Трансляция
          </a>
          <!-- /a -->
        </div>
        <!-- /.table_is-translation-able -->   
      <div v-else class="table__translation_disable">
        без трансляции
      </div>
      <!-- /.table_is-translation-disable -->
    </div>
    <!-- /.table__translation -->   
  </div>
</template>

<script>
  export default {
    name: 'match',
    props: ["match"],
    methods: {
      getLogo(team){
        return `https://nimblecd.com/sfiles/logo_teams/${team}`
      }
    }
  }
</script>
