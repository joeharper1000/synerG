<template>
  <div class="community_details tile gray-tile">
    <!-- WHILE LOADING -->
    <div v-if="loading" class="text-center">
      <div class="container py-3 text-left">
        <a class="btn btn-primary btn-sm back" @click="onBack"><i class="fa fa-arrow-left fa-fw"></i> Back</a>
      </div>
      <div class="text-center">
        <h2 class="py-3">...</h2>
      </div>
      <p class="lead">Baking bread...</p>
      <img src="../../../assets/loading.svg" alt="">
    </div>
    <!-- CONTENT -->
    <div v-else class="container py-3 text-left">
      <div class="row">
        <div class="col-4 text-left">
          <img class="img-thumbnails" src="data:image/jpeg;base64,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" alt="Avatar">
          <div class="tiled inner-tile">
            <p>{{community.description}}</p>
          </div>
        </div>
        <div class="col-8 text-left">
          <header class="d-flex justify-content-end align-items-center">
            <h3 class="mr-auto">{{community.communityName}}</h3>
            <router-link v-if="isCommunityAdmin" :to="{ name: 'communityEdit', params: { id: community._id }}" class="btn scale-up"><i class="fa fa-edit"></i></router-link>
            <a v-if="isCommunityMember || isCommunityAdmin"  class="btn btn-danger btn-sm float-right" @click="leaveCommunity"><i class="fa fa-times fa-fw"></i></a>
            <a v-else-if="isCommunityPending"  class="btn btn-warning btn-sm float-right" @click="cancelCommunityRequest"><i class="fa fa-ban fa-fw"></i></a>
            <a v-else class="btn btn-primary btn-sm float-right" @click="sendCommunityRequest()"><i class="fa fa-plus fa-fw"></i></a>
          </header>
          <b-nav justified tabs class="tabs community-nav">
            <b-nav-item @click="tab = 'app-community-posts'" :active="tab === 'app-community-posts'">Posts</b-nav-item>
            <b-nav-item @click="tab = 'app-community-members'" :active="tab === 'app-community-members'">Members</b-nav-item>
          </b-nav>
          <keep-alive>
            <component :is="tab" id="search"></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommunityPosts from './Community_posts'
import CommunityMembers from './Community_members'

export default {
  data () {
    return {
      tab: 'app-community-posts'
    }
  },
  computed: {
    user () {
      if (!this.$store.getters.user) return false
      return this.$store.getters.user
    },
    community () {
      return this.$store.getters.community
    },
    loading () {
      return this.$store.getters.community_loading
    },
    isCommunityAdmin () {
      if (this.$store.getters.user) return this.$store.getters.community.admins.filter(admin => (admin.steamId === this.$store.getters.user.steamId)).length
      else return false
    },
    isCommunityMember () {
      if (this.$store.getters.user) return this.$store.getters.community.members.filter(member => (member.steamId === this.$store.getters.user.steamId)).length
      else return false
    },
    isCommunityPending () {
      if (this.$store.getters.user) return this.$store.getters.community.pending.filter(pending => (pending.steamId === this.$store.getters.user.steamId)).length
      else return false
    }
  },
  methods: {
    getCommunity () {
      this.$store.dispatch('getCommunity', this.$route.params.id)
    },
    sendCommunityRequest () {
      this.$store.dispatch('sendCommunityRequest')
    },
    cancelCommunityRequest () {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('cancelCommunityRequest', this.$route.params.id)
      }
    },
    leaveCommunity () {
      if ((this.$store.getters.community.admins.filter(admin => (admin.steamId === this.$store.getters.user.steamId)).length) && this.$store.getters.community.admins.length === 1) {
        if (confirm('You are the last community admin, assign admin status to another member otherwise community will disband')) {
          this.$store.dispatch('deleteCommunity', this.$route.params.id)
        }
      } else {
        if (confirm('Are you sure?')) {
          this.$store.dispatch('leaveCommunity', this.$route.params.id)
        }
      }
    },
    onBack () {
      this.$router.go(-1)
    }
  },
  components: {
    appCommunityPosts: CommunityPosts,
    appCommunityMembers: CommunityMembers
  },
  activated () {
    this.$store.dispatch('resetCommunityDetails')
    console.log('Fetching team profile...')
    this.getCommunity()
  }
}
</script>

<style scoped>
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }

  #search{
    padding: 5px;
    overflow-y: scroll;
    height: 73.5vh;
  }
  
  a {
    color: white;
    cursor: pointer;
  }

  header {
    border-bottom: 3px solid #666;
    margin-bottom: 15px;
  }

  a.btn {
    margin-left: 8px;
  }

  a.btn.scale-up {
    padding: 0;
  }

  .scale-up i{
    font-size: 1.8em;
    cursor: pointer;
    transform: scale(1);
    transition: 0.3s;
  }

  .scale-up:hover i{
    transform: scale(1.3);
    transition: 0.1s;
  }

  .scale-up:active i{
    transform: scale(1.1); 
  }

  .scale-up:focus i{
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

  /*Styling for the nav bar tabs*/
  ul.community-nav.nav-tabs {
    border-bottom: 3px solid #600;
  }
</style>