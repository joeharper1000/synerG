<template>
  <div class="players tile gray-tile mobile">
    <div class="mobile">
      <!-- LOGGED IN -->
      <div id="rightprofile" class="card-header d-flex align-items-center desktopOnly" v-if="isLoggedIn">
        <img class="avatar" :src="user.img" alt="Avatar">
        <h4 class="profile-name">{{ user.steamName }}</h4>
      </div>

      <!-- SIGN IN BUTTON-->
      <!-- <div class="login" v-else>
        <a href="/auth/steam/steam" class="btn btn-outline-secondary btn-md d-inline-flex align-items-center my-3 sign-in">
          <i class="fa fa-steam p-2"></i> 
          <span class="p-2">Sign in with Steam</span>
        </a>
      </div> -->

      
      <b-nav justified tabs class="tabs">
        <b-nav-item @click="tab = 'app-player-list'" :active="tab === 'app-player-list'">Players</b-nav-item>
        <b-nav-item @click="tab = 'app-team-list'" :active="tab === 'app-team-list'">Teams</b-nav-item>
        <b-nav-item @click="tab = 'app-community-list'" :active="tab === 'app-community-list'">Communities</b-nav-item>
      </b-nav>
      <keep-alive>
        <component :is="tab" id="search"></component>
      </keep-alive>

    </div>
  </div>
</template>

<script>
import Settings from './Settings'
import PlayerList from '../../center/players/Player_list'
import TeamList from '../../center/teams/Team_list'
import CommunityList from '../../center/communities/Community_list'

export default {
  data: () => {
    return {
      tab: 'app-player-list'
    }
  },
  computed: {
    user () {
      return !this.$store.getters.user ? 'No user logged in' : this.$store.getters.user
    },
    userId () {
      return this.$store.getters.userId
    },
    isLoggedIn () {
      return this.$store.getters.isAuthenticated
      // return true
    },
    notif_friends () {
      return this.$store.getters.user.friends.pending_received.length
    }
  },
  components: {
    appSettings: Settings,
    appPlayerList: PlayerList,
    appTeamList: TeamList,
    appCommunityList: CommunityList
  }
}
</script>

<style scoped>

  a.btn.sign-in {
    color: white !important;
    border-color: white !important;
  }

  a.btn.sign-in:hover {
    background-color: rgba(0,0,0,0.5) !important;
  }

  .login i {
    flex: 1;
    font-size: 2em;
  }
  .login span {
    flex: 2;
  }

  .players {
    min-height: 40vh;
    color: white;
  }
  
  #rightprofile{
    padding: 5px;
  }
  
  .avatar{
    margin-right: 10px;
    max-height: 100px;
    max-width: 100px;
  }

  #search{
    padding: 5px;
  }
  

  /* STYLE FOR TOP NAVBAR */
/*  ul.nav-tabs.top-tabs  {
    border-radius: 5px 5px 0 0;
  }*/

/*  ul.nav-tabs {
    background: #333;
    border-color: #333;
  }*/

  li.nav-item {
    border:0;
  }

  li.nav-item a.nav-link{
    border-radius: 0;
    border:0;
    transition: 0.5s;
  }

/*  li.nav-item a.nav-link:hover{
    background-color: #222; 
    transition: 0.1s;
  }

  li.nav-item a.nav-link.active{
    background-color:#111;
    color: white;
  }*/

  i.fa {
    transform: scale(1);
  }

  li.nav-item a.nav-link.active i{
    transform: scale(1.3);
    transition: 0.2s;
  }

  .top-tabs li.nav-item:first-child a.nav-link{
    border-radius: 5px 0 0 0;
    border:0;
  }

  .top-tabs li.nav-item:first-child a.nav-link.active{
    border-radius: 5px 0 0 0;
    border:0;
  } 
  .top-tabs li.nav-item:last-child a.nav-link{
    border-radius: 0 5px 0 0;    
    border:0;
  }

  .top-tabs li.nav-item:last-child a.nav-link.active{
    border-radius: 0 5px 0 0;    
    border:0;
  }

  .nav-tabs {
    border-bottom: 3px solid #600;
  } 
  /* END STYLE TOP NAVBAR */

  /* NOTIFICATION */

  .tab {
    position: relative;
  }

  .notification {
    position: absolute;
    right: 12px;
    top: 5px;
    margin: 0;
    padding: 0;
    width: 15px;
    height: 15px;
    background-color: red;
    color: white;
    border-radius: 50%;
    text-align: center;
  }

  .notification p {
    font-size: 0.8em;
    font-weight: bold;
    margin-top: -1px;
    margin-left: 0px;
  }
  
  @media screen and (max-width: 767px) {
    #rightprofile {
      display: none !important;
    }
  }
</style>
