<template>
 <ul>
    <li v-for="match in matches" :key="match.constEventId">
      <div class="table__time">
          {{Math.floor(match.timeSec/60)}}
            </div>
            <!-- /.table__time -->    
            <div class="versus">
              <div class="versus__team-first">
                {{match.opponent1NameLocalization}}
              </div>
              <!-- /.versus__team-first-localization --> 
              <img :src="`https://nimblecd.com/sfiles/logo_teams/${match.imageOpponent1}`" class="versus__team-img"></img>
              <div class="versus__score">
                {{match.fullScore.sc1}} : {{match.fullScore.sc2}}
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
                  Трансляция
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
</template>

<script>
  export default {
    name: 'matchList',
    props: ["matches"],
  }
</script>
