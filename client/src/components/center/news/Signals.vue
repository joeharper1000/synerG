<template>
  <div class="signals tile gray-tile mobile">
    <b-nav justified tabs class="signals-nav">
      <b-nav-item @click="tab = 'app-signals-search'" :active="tab === 'app-signals-search'">Search</b-nav-item>
      <b-nav-item @click="tab = 'app-signals-new'" :active="tab === 'app-signals-new'">New Signal</b-nav-item>
    </b-nav>
    <keep-alive>
      <component :is="tab" @backToSearch="tab = $event"></component>
    </keep-alive>
  </div>
</template>

<script>
import SignalsSearch from './Signals_search'
import SignalsNew from './Signals_new'

export default {
  name: 'Home',
  data () {
    return {
      tab: 'app-signals-search'
    }
  },
  methods: {
    resetPage () {
      this.tab = 'app-signals-search'
    }
  },
  components: {
    appSignalsSearch: SignalsSearch,
    appSignalsNew: SignalsNew
  },
  activated () {
    this.resetPage()
  }
}
</script>

<style scoped>
  div.container-fluid {
    padding: 0;
  }

  /*Styling for the nav bar tabs*/
  ul.signals-nav.nav-tabs {
    border-bottom: 3px solid #600;
  }

/*  li.nav-item a.nav-link {
    color: #fff;
  }

  li.nav-item a.nav-link.active {
    background-color: #600;
    color: #fff;
    border: 1px solid #600;
  }*/

  @media screen and (max-width: 767px) {
    .right {
      padding-right: 0;
    }
  }
</style>