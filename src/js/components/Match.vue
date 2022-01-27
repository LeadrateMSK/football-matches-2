<template>
  <div>
    <div class="match__time">
      <span v-if="this.time">{{ this.time | moment("utc", "HH:mm:ss")}}</span>
      <span v-else>{{"00:00:00"}}</span>
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
    <div class="match__translation">
      <div v-if="match.hasVideo" class="match__translation_able">
        <a :href="match.link" target="_blank">
          <span class="iconify" data-icon="el:play-alt"></span>
            Трансляция
          </a>
          <!-- /a -->
        </div>
        <!-- /.table_is-translation-able -->   
      <div v-else class="match__translation_disable">
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
    data(){                         
      return{
        time: this.match.timeSec
      }
    },                              
    props: ["match"],
    methods: {
      getLogo(team){
        return `https://nimblecd.com/sfiles/logo_teams/${team}`
      },
      startTimer(){                             
        if (this.time && this.match.gameStatus==0){ //check - if match hasn't start yet
        setInterval(() => {this.time++}, 1000);     //or had already end
        }                                           //the timer will not start
      }                                       
    },
    mounted(){                                  
      this.startTimer()
    }                                          
  }
</script>
