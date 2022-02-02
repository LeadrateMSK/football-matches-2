<template>
  <a :href="match.link" target="_blank">
    <div class="match__time">
      <span v-if="this.time">{{ 0 | moment(`utc, mm:ss`)}}</span>
      <span v-else>{{ 0 | moment(`D MMM hh:mm`)}}</span>
    </div>
    <!-- /.table__time -->    
    <div class="versus">
      <div class="versus__team-first">
        {{match.opponent1NameLocalization}}
      </div>
      <!-- /.versus__team-first-localization --> 
      <img :src="getLogo(match.imageOpponent1)" class="versus__team-img"></img>
      <div class="versus__score">
        {{match.fullScore ? match.fullScore.sc1 :  "--"}} : {{match.fullScore ? match.fullScore.sc2 :  "--"}}
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
    <!-- /.match-translation -->
    <div class="match__bet" 
        :class="{'match__bet_disable':match.oddsLocalization[0].oddsMarket.isBlocked===true}">
        {{match.oddsLocalization ? match.oddsLocalization[0].oddsMarket : "--"}}
    </div>
    <!-- /.match-translation -->
    <div class="match__bet" 
        :class="{'match__bet_disable':match.oddsLocalization[1].oddsMarket.isBlocked===true}">
        {{match.oddsLocalization ? match.oddsLocalization[1].oddsMarket : "--"}}
    </div>
    <!-- /.match-translation -->
    <div class="match__bet" 
        :class="{'match__bet_disable':match.oddsLocalization[2].oddsMarket.isBlocked===true}">
        {{match.oddsLocalization ? match.oddsLocalization[2].oddsMarket : "--"}}
    </div>
    <!-- /.table__translation -->   
  </a>
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
