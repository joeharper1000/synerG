<template>
  <div class="player_summary gray-tile">
    <!-- WHILE LOADING -->
    <div v-if="loading" class="text-center">
      <div class="text-center">
        <h2 class="py-3">...</h2>
      </div>
      <p class="lead">Baking bread...</p>
      <img src="../../../assets/loading.svg" alt="">
    </div>
    <!-- CONTENT -->
    <div v-else class="container py-3 text-left">
      <div class="row">
        <div class="col-4 text-left summary-left">
          <img class="img-thumbnails" :src="player.img" alt="Avatar">
          <ul>
            <li class="tiled inner-tile">
              <span class="title"><i class="fa fa-trophy fa-fw"></i> MMR:</span>
              <ul>
                <!--<li>Estimate: ~{{player.mmr.mmr_estimate}}</li>-->
                <li>Solo: ----</li>
                <li>Party: ----</li>
              </ul>
            </li>
            <li class="tiled inner-tile">
              <span class="title"><i class="fa fa-map-marker fa-fw"></i> Regions:</span>
              <ul v-for="(region, index) in player.regions" :key="index">
                <li>{{region}}</li>
              </ul>
            </li>
            <li class="tiled inner-tile">
              <span class="title"><i class="fa fa-globe fa-fw"></i> Languages:</span>
              <ul v-for="(language, index) in player.languages" :key="index">
                <li>{{language}}</li>
              </ul>
            </li>
            <li class="tiled inner-tile">
              <span class="title"><i class="fa fa-headphones fa-fw"></i> Comms:</span>
              <ul v-for="(comm, index) in player.comms" :key="index">
                <li>{{comm}}</li>
              </ul>
            </li>
            <li class="tiled inner-tile">
              <span class="title"><i class="fa fa-pie-chart fa-fw"></i> Positions:</span>
              <ul v-for="(position, index) in player.positions" :key="index">
                <li>{{position}}</li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="col-8 text-left summary-right">
          <header class="d-flex justify-content-between align-items-center">
            <h2>{{player.steamName}}</h2>
            <ul class="links">
              <li v-if="userId !== player.steamId"><a class="btn scale-up" @click="checkConversation(player._id)"><i class="fa fa-comment fa-fw"></i></a></li>
              <span v-if="userId === player.steamId">
                <li><router-link :to="{ path: `/app/players/${userId}/edit`}" class="btn scale-up"><i class="fa fa-edit fa-fw"></i></router-link></li>
              </span>
              <span v-else>
                <li v-if="inReceived"><a class="btn scale-up" @click="acceptRequest(player._id)"><i class="fa fa-check fa-fw"></i></a></li>
                <li v-if="inReceived"><a class="btn scale-up" @click="declineRequest(player._id)"><i class="fa fa-times fa-fw"></i></a></li>
                <li v-else-if="inSent"><a class="btn scale-up" @click="cancelRequest(player._id)"><i class="fa fa-ban fa-fw"></i></a></li>
                <li v-else-if="inAccepted"><a class="btn scale-up" @click="deleteFriend(player._id)"><i class="fa fa-trash fa-fw"></i></a></li>
                <li v-else><a :class="{disabled: !isLoggedIn}" class="btn scale-up" @click="sendRequest(player._id)"><i class="fa fa-user-plus fa-fw"></i></a></li>
              </span>
              <li><a :href="`http://www.steamcommunity.com/profiles/${player.steamId}`" class="btn scale-up" target="_blank"><i class="fa fa-steam-square fa-fw"></i></a></li>
              <li v-if="userId === player.steamId"><a :class="{disabled: !isLoggedIn}" class="btn scale-up" @click="updatePlayer"><i class="fa fa-refresh fa-fw"></i></a></li>
            </ul>
          </header>
          <div class="tiled description inner-tile">
            <p>
              <span class="title">Description:</span><br>
              {{player.description}}
            </p>
          </div>
          <div class="tiled heroes inner-tile">
            <p> 
              <span class="title">Most Played Heroes</span>
              <table>
                  <thead>
                    <tr>
                      <th class="text-center table-header hero">Hero</th>
                      <th class="text-center table-header">Played</th>
                      <th class="text-center table-header">Won</th>
                      <th class="text-center table-header">W/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(hero, index) in player.heroes.slice(0, 5)" :key="index">
                      <!--<img class="img-thumbnails" :src="'https://api.opendota.com' + heroStats.heroStats[hero.hero_id - 2].img" alt="Avatar">-->
                      <td class="text-center table-content"><img class="" :src="heroes[hero.hero_id - 1].img" alt="Avatar"></td>
                      <!--<td class="text-center">{{ heroStats.heroStats[hero.hero_id].id }}</td>-->
                      <td class="text-center table-content">{{ hero.games }}</td>
                      <td class="text-center table-content">{{ hero.win }}</td>
                      <td class="text-center table-content green ratio" :class="{red: hero.win/hero.games < 0.5}">{{ hero.win/hero.games | ratio}}</td>
                    </tr>
                  </tbody>
                </table>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    ratio (value) {
      return (value * 100).toFixed(1)
    }
  },
  computed: {
    userId () {
      return this.$store.getters.userId
    },
    heroes () {
      return this.$store.getters.heroes
    },
    player () {
      return this.$store.getters.player
    },
    loading () {
      return this.$store.getters.player_loading
    },
    inSent () {
      if (this.$store.getters.user) return this.$store.getters.user.friends.pending_sent.filter(pendingSent => (pendingSent._id === this.player._id)).length
      else return false
    },
    inReceived () {
      if (this.$store.getters.user) return this.$store.getters.user.friends.pending_received.filter(pendingReceived => (pendingReceived._id === this.player._id)).length
      else return false
    },
    inAccepted () {
      if (this.$store.getters.user) return this.$store.getters.user.friends.accepted.filter(accepted => (accepted._id === this.player._id)).length
      else return false
    },
    inBlocked () {
      if (this.$store.getters.user) return this.$store.getters.user.friends.blocked.filter(blocked => (blocked._id === this.player._id)).length
      else return false
    },
    isLoggedIn () {
      return this.$store.getters.isAuthenticated
      // return true
    }
  },
  methods: {
    checkConversation (playerId) {
      this.$store.dispatch('checkConversation', playerId)
    },
    sendRequest (id) {
      this.$store.dispatch('sendRequest', id)
      this.$socket.emit('friends_request', { sender: this.$store.getters.user, receiverID: id, socketId: this.$socket.id })
    },
    cancelRequest (id) {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('cancelRequest', id)
        this.$socket.emit('friends_cancel', { sender: this.$store.getters.user, receiverID: id, socketId: this.$socket.id })
      }
    },
    acceptRequest (id) {
      this.$store.dispatch('acceptRequest', id)
      this.$socket.emit('friends_accept', { sender: this.$store.getters.user, receiverID: id, socketId: this.$socket.id })
    },
    declineRequest (id) {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('declineRequest', id)
        this.$socket.emit('friends_decline', { sender: this.$store.getters.user, receiverID: id, socketId: this.$socket.id })
      }
    },
    deleteFriend (id) {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('deleteFriend', id)
        this.$socket.emit('friends_remove', { sender: this.$store.getters.user, receiverID: id, socketId: this.$socket.id })
      }
    },
    getPlayer () {
      this.$store.dispatch('getPlayer', this.$route.params.id)
    },
    onBack () {
      this.$router.go(-1)
    },
    updatePlayer () {
      console.log('Updating Players...')
      console.log(this.player)
      this.$store.dispatch('updatePlayer', this.player.steamId)
    }
  },
  // watch: {
  //   '$route.params.id' (newId, oldId) {
  //     this.$store.dispatch('resetPlayerDetails')
  //     this.getPlayer(newId)
  //   }
  // },
  activated () {
    this.$store.dispatch('resetPlayerDetails')
    console.log('Fetching player profile...')
    this.getPlayer()
  }
}
</script>

<style scoped>
  .player_summary {
    overflow-y: scroll;
    height: 83.4vh;
  }

  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }

  a {
    color: white;
  }

  header {
    border-bottom: 3px solid #666;
    margin-bottom: 15px;
  }

  a.btn {
    padding: 0;
  }

  a.scale-up i{
    cursor: pointer;
    transform: scale(1);
    transition: 0.3s;
  }

  a.scale-up:hover i{
    transform: scale(1.3);
    transition: 0.1s;
  }

  a.scale-up:active i{
    transform: scale(1.1); 
  }

  a.scale-up:focus i{
    transform: scale(1.1); 
  }
  
  a.btn.back {
    text-align: left;
    margin-bottom: 15px;
  }

  .img-thumbnails {
    border: 3px solid #fff;
    border-radius: 5px;
    margin-bottom: 30px;
    width: 100%;
  }

  ul {
    padding-left: 0;
  }

  li {
    list-style-type: none;
    line-height: 1.6em;
  }

  li.tiled {
    margin-bottom: 10px;
  }

  ul.links {
    margin-bottom: 5px;
  }
  ul.links li {
    display: inline-block;
  }
  ul.links li a i {
    font-size: 1.2em;
  }

  .description {
    word-break: break-word; 
  }

  table {
    width: 100%;
    color: white;
    margin-top: 10px;
  }
  
  tr th.table-header {
    font-size: 16px;
    font-weight: bold;
    background-color: #333;
  }

  tr th.hero {
    width: 100px;
  }
  
  tr img {
    height: 57px;
    width: 100px;
    margin: 0 auto;
  }

  .green {
    color:rgb(0, 218, 36);
  }

  .red {
    color: rgb(232, 4, 4);
  }

  .ratio {
    font-weight: 900;
  }

  @media screen and (max-width: 767px) {
    .container {
      padding-bottom: 0 !important;
    }

    header {
      border-bottom: 3px solid #666;
      margin-bottom: 10px;
    }

    p {
      font-size: 12px;
    }
    .summary-left {
      padding: 0 0 0 10px;
    }

    .tiled, li.tiled {
      margin-bottom: 5px;
    }

    .tiled ul li {
      padding-left: 5px;
      font-size: 12px;
    }

    .img-thumbnails {
      margin-bottom: 10px;
    }

    .inner-tile {
      padding: 5px;
      border-radius: 3px;
    }

    .summary-right {
      padding: 0 10px 0 5px;
    }

    table {
      width: 100%;
      color: white;
      margin-top: 5px;
    }

    tr:nth-child(odd) {
      background: rgba(255,255,255,0.05);
    }
    
    td {
      padding: 0;
    }

    tr th.table-header {
      font-size: .9em;
    }

    tr th.hero {
      width: 50px;
    }
    
    tr img {
      width: 50px;
      height: 29px;
    }

    .player_summary {
      overflow-y: scroll;
      height: calc(100vh - 138px);
    }
  }
</style>