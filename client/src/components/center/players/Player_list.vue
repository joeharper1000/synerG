<template>
  <div class="player_list text-left mobile" style="position: relative">
    <div class="overlay" v-show="show_filter" @click="show_filter = !show_filter"></div>
    <app-filter-button v-on:clicked="show_filter = !show_filter"></app-filter-button>
    <b-form class="filter-mobile" :class="{visible: show_filter}">
      <div class="text-search">
        <b-form-input type="text" placeholder="Search for players..." v-model="player_search">
        </b-form-input>
      </div>
      <div class="row maxwidth">
        <div class="col-6 padding-0">
          <b-form-select v-model="positions_selected" :options="positions_options">
          </b-form-select>
        </div>
        <!--<div class="col-lg-4 padding-0">-->
        <!--  <b-form-select v-model="mmr_selected" :options="mmr_options">-->
        <!--  </b-form-select>-->
        <!--</div>-->
        <div class="col-6 padding-0">
          <b-form-select v-model="regions_selected" :options="regions_options">
          </b-form-select>
        </div>
      </div>
      <div class="row maxwidth">
        <div class="col-6 padding-0">
          <b-form-select v-model="languages_selected" :options="languages_options">
          </b-form-select>
        </div>
        <div class="col-6 padding-0">
          <b-form-select v-model="comms_selected" :options="comms_options">
          </b-form-select>
        </div>
      </div>
      <div class="d-flex justify-content-end align-items-center">
        <b-button size="sm" type="reset" @click.prevent="onReset()" variant="link" id="reset">Clear</b-button>
        <b-button size="sm" type="submit" @click.prevent="onSubmit()" @keyup.enter.prevent="onSubmit" variant="warning" id="search"><i class="fa fa-search fa-fw"></i> Search</b-button>
      </div>  
    </b-form>
    
    <div v-if="loading" class="text-center">
      <p class="lead">Searching for players...</p>
      <img src="../../../assets/loading.svg" alt="">
    </div>
    <ul class="list-group" id="player-list">
      <li class="list-group-item inner-tile" v-for="(player, index) in players" :key="index">
        <app-player-item :player="player"></app-player-item>
      </li>
    </ul>
  </div>
</template>

<script>
import PlayerItem from './Player_item.vue'
import PlayerDetails from './Player_details.vue'
import FilterButton from '../../sidebars/Filter_button.vue'

export default {
  data: () => {
    return {
      show_filter: false,
      player_search: '',
      positions_selected: null, // Must be an array reference!
      regions_selected: null,
      languages_selected: null,
      comms_selected: null,
      positions_options: [
        { text: 'Position:', value: null },
        { text: 'Carry', value: 'Carry' },
        { text: 'Midlaner', value: 'Midlaner' },
        { text: 'Offlaner', value: 'Offlaner' },
        { text: 'Farming Support', value: 'Farming Support' },
        { text: 'Hard Support', value: 'Hard Support' }
      ],
      // mmr_options: [
      //   { text: 'Ranking:', value: null },
      //   { text: 'Herald (0)', value: 'Herald(0)' },
      //   { text: 'Herald (1)', value: 'Herald(1)' },
      //   { text: 'Herald (2)', value: 'Herald(2)' },
      //   { text: 'Herald (3)', value: 'Herald(3)' },
      //   { text: 'Herald (4)', value: 'Herald(4)' },
      //   { text: 'Herald (5)', value: 'Herald(5)' },
      //   { text: 'Guardian (0)', value: 'Guardian(0)' },
      //   { text: 'Guardian (1)', value: 'Guardian(1)' },
      //   { text: 'Guardian (2)', value: 'Guardian(2)' },
      //   { text: 'Guardian (3)', value: 'Guardian(3)' },
      //   { text: 'Guardian (4)', value: 'Guardian(4)' },
      //   { text: 'Guardian (5)', value: 'Guardian(5)' },
      //   { text: 'Crusader (0)', value: 'Crusader(0)' },
      //   { text: 'Crusader (1)', value: 'Crusader(1)' },
      //   { text: 'Crusader (2)', value: 'Crusader(2)' },
      //   { text: 'Crusader (3)', value: 'Crusader(3)' },
      //   { text: 'Crusader (4)', value: 'Crusader(4)' },
      //   { text: 'Crusader (5)', value: 'Crusader(5)' },
      //   { text: 'Archon (0)', value: 'Archon(0)' },
      //   { text: 'Archon (1)', value: 'Archon(1)' },
      //   { text: 'Archon (2)', value: 'Archon(2)' },
      //   { text: 'Archon (3)', value: 'Archon(3)' },
      //   { text: 'Archon (4)', value: 'Archon(4)' },
      //   { text: 'Archon (5)', value: 'Archon(5)' },
      //   { text: 'Legend (0)', value: 'Legend(0)' },
      //   { text: 'Legend (1)', value: 'Legend(1)' },
      //   { text: 'Legend (2)', value: 'Legend(2)' },
      //   { text: 'Legend (3)', value: 'Legend(3)' },
      //   { text: 'Legend (4)', value: 'Legend(4)' },
      //   { text: 'Legend (5)', value: 'Legend(5)' },
      //   { text: 'Ancient (0)', value: 'Ancient(0)' },
      //   { text: 'Ancient (1)', value: 'Ancient(1)' },
      //   { text: 'Ancient (2)', value: 'Ancient(2)' },
      //   { text: 'Ancient (3)', value: 'Ancient(3)' },
      //   { text: 'Ancient (4)', value: 'Ancient(4)' },
      //   { text: 'Ancient (5)', value: 'Ancient(5)' },
      //   { text: 'Divine (0)', value: 'Divine(0)' },
      //   { text: 'Divine (1)', value: 'Divine(1)' },
      //   { text: 'Divine (2)', value: 'Divine(2)' },
      //   { text: 'Divine (3)', value: 'Divine(3)' },
      //   { text: 'Divine (4)', value: 'Divine(4)' },
      //   { text: 'Divine (5)', value: 'Divine(5)' },
      //   { text: 'Leaderboards', value: 'Leaderboards' }
      // ],
      regions_options: [
        { text: 'Region:', value: null },
        { text: 'Chile', value: 'Chile' },
        { text: 'China', value: 'China' },
        { text: 'Dubai', value: 'Dubai' },
        { text: 'EU West', value: 'EU West' },
        { text: 'EU East', value: 'EU East' },
        { text: 'Japan', value: 'Japan' },
        { text: 'Australia', value: 'Australia' },
        { text: 'Russia', value: 'Russia' },
        { text: 'SEA', value: 'SEA' },
        { text: 'South Africa', value: 'South Africa' },
        { text: 'US West', value: 'US West' },
        { text: 'US East', value: 'US East' }
      ],
      languages_options: [
        { text: 'Language:', value: null },
        { text: 'English', value: 'English' },
        { text: 'Chinese', value: 'Chinese' },
        { text: 'French', value: 'French' },
        { text: 'Korean', value: 'Korean' },
        { text: 'Portuguese', value: 'Portuguese' },
        { text: 'Russian', value: 'Russian' },
        { text: 'Spanish', value: 'Spanish' }
      ],
      comms_options: [
        { text: 'Communication', value: null },
        { text: 'In-Game Chat/Mic', value: 'In-Game Chat/Mic' },
        { text: 'Discord', value: 'Discord' },
        { text: 'TeamSpeak', value: 'TeamSpeak' },
        { text: 'Skype', value: 'Skype' }
      ]
      // competitive_options: [
      //   { text: 'Competitiveness:', value: null },
      //   { text: 'Casual Unranked', value: 'Casual Unranked' },
      //   { text: 'Casual Ranked', value: 'Casual Ranked' },
      //   { text: 'Semi-Competitive Ranked', value: 'Semi-Competitive Ranked' },
      //   { text: 'Competitive Ranked', value: 'Competitive Ranked' },
      //   { text: 'Tournaments', value: 'Tournaments' }
      // ]
    }
  },
  computed: {
    players () {
      return this.$store.getters.players
    },
    loading () {
      return this.$store.getters.player_list_loading
    }
  },
  methods: {
    getPlayers () {
      return this.$store.dispatch('getPlayers')
    },
    // onPlayerSelected (value) {
    //   this.showRefresh = false
    //   this.showDetails = true
    //   this.selectedPlayer = value
    // },
    // refresh () {
    //   this.$store.commit('refreshPlayerList', {
    //     loading: true,
    //     players: []
    //   })
    //   this.getPlayers()
    // },
    onSubmit () {
      const data = {
        steamName: this.player_search,
        regions: this.regions_selected,
        languages: this.languages_selected,
        comms: this.comms_selected,
        positions: this.positions_selected
      }
      setTimeout(() => { this.show_filter = !this.show_filter }, 500)
      this.$store.dispatch('getPlayers', data)
    },
    onReset () {
      this.player_search = ''
      this.regions_selected = null
      this.languages_selected = null
      this.comms_selected = null
      this.positions_selected = null
      this.$store.dispatch('getPlayers', {})
    }
  },
  components: {
    appPlayerItem: PlayerItem,
    appPlayerDetails: PlayerDetails,
    appFilterButton: FilterButton
  },
  created () {
    this.getPlayers()
  }
}
</script>

<style scoped>
  .inner-tile {
    margin-bottom: 5px;
  }
  .padding-0{
    padding: 0 5px;
  }
  .maxwidth{
    width: 100%;
    margin: 0;
  }

  li {
    padding: 5px 8px;
  }

  ul {
    margin-bottom: 5px;
  }

  /*STYLING THE SEARCH CRITERIA*/
  div.text-search {
    margin: 0 5px;
  }

  input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #fff;
    opacity: 1; /* Firefox */
  }

  input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #fff;
  }
  
  input::-ms-input-placeholder { /* Microsoft Edge */
    color: #fff;
  }

  input.form-control {
    background: transparent;
    border: none;
    border-bottom: solid 1px #f00;
    color: #fff;
    border-radius: 0;
  }

  select.custom-select {
    color: #fff;
    background-color: #21272c;
    /*background: transparent;*/
    border: none;
    border-bottom: solid 1px #f00;
    border-radius: 0;
  }

  select.custom-select option {
    color: black;
  }

  div.d-flex.justify-content-end {
    padding-right: 5px;
    margin-top: 2px;
    margin-bottom: 5px;
  }

  #player-list {
    overflow-y: scroll;
    height: 52.4vh;
  }

  /* BUTTONS */
  #reset {
    margin: 10px 5px;
    color: white;
    cursor: pointer;
  }

  /* #search {
    cursor: pointer;
  } */

  @media screen and (max-width: 767px) {
    #search.mobile {
      padding: 0;
    }
  }
</style>
