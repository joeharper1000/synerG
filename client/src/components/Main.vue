<template>
<div class="main">
  <app-header></app-header>

  <!-- Components News/Players/Teams -->
  <div class="container-fluid">
    <div class="row">
      <div class="left col-md-1 col-lg-2 sidebar desktopOnly">
        <app-left></app-left>
      </div>
      <div class="center col-md-7">
        <!-- <transition name="fade" mode="out-in"> -->
          <keep-alive>
            <router-view :key="$route.fullPath"></router-view>
          </keep-alive>
        <!-- </transition> -->
      </div>
      <div class="right col-md-4 col-lg-3 sidebar desktopOnly">
        <app-right></app-right>
      </div>
    </div>
  </div>

  <app-footer class="desktopOnly"></app-footer>
</div>
</template>

<script>
import Header from './Header'
import Right from './sidebars/right/Right'
import Left from './sidebars/left/Left'
import Footer from './Footer'

export default {
  name: 'Main',
  components: {
    appHeader: Header,
    appRight: Right,
    appLeft: Left,
    appFooter: Footer
  },
  created () {
    this.$store.dispatch('checkLogin', this.$route.query)
    this.$router.push('/app')
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media (min-width: 1200px) {
    div.main .container-fluid {
      max-width: 1200px;
    }
/*      div.right.col-lg-4 {
        max-width: 29%;
    }*/
  }

  
  .center, .right {
    padding: 10px;
/*    padding-top: 20px;*/
  }
  .left {
    padding: 10px;
    border-radius: 5px;
  }
  .right {
/*    padding-right: 20px;*/
  }


  .main {
/*    background: #304352;  /* fallback for old browsers */
    /*background: -webkit-linear-gradient(to top, #304352, #d7d2dd);   Chrome 10-25, Safari 5.1-6 */
    /*background: linear-gradient(to top, #304352, #d7d2dd);  W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    /*background: -webkit-linear-gradient(to top, #6c8193, #8e9eab);*/
    /*background: linear-gradient(to top, #6c8193, #8e9eab);*/

    background: #8E0E00;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #8E0E00, #1F1C18);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #8E0E00 0%, rgba(80,0,0, 1) 40%, rgba(80,0,0,.4)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background-attachment: fixed;
    /* background: linear-gradient(to bottom, rgba(80,0,0.1),rgba(120,0,0,.5)); */
    /* background: #161616; */


    /* background: linear-gradient(to top, #000000, #53346d);
    background: linear-gradient(to bottom, #159957, #155799);
    background: linear-gradient(to bottom, #007991, #78ffd6);
    background: linear-gradient(to top, #200122, #6f0000);
    background: linear-gradient(to top, #000428, #004e92);
    background: linear-gradient(to top, #3a7bd5, #3a6073);
    background: linear-gradient(to top, #000000, #434343);
    background: linear-gradient(to top, #2980b9, #2c3e50);
    background: linear-gradient(to top, #4b79a1, #283e51);
    background: linear-gradient(to bottom, #485563, #29323c); 
    /*background: linear-gradient(to top, #141e30, #243b55);*/

    /* background: linear-gradient(to bottom, #023, #012); */

    /* background: url('../assets/back.jpg') center no-repeat;
    background-size: cover;
    background-attachment: fixed; */
    height: 100vh;
    width: 100%;
  }

  .container-fluid {
    height: calc(100% - 112.5px);
    position: relative;
    top: 55px;
  }
 /* .fixed {
    position: sticky;
  }*/
  div.container-fluid div.row {
    height: 100%
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .15s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }


  .bounce-enter-active {
    animation: bounce-in-top .5s cubic-bezier(.11,.67,.07,.97);
  }
  .bounce-leave-active {
    animation: bounce-in-bot .5s reverse cubic-bezier(.11,.67,.07,.97);
  }
  @keyframes bounce-in-top {
    from {
      transform: translateY(-1000px);
      opacity: 0
    }
    /* 50% {
      transform: translateY(0);
      opacity: 1;
    }
    70% {
      transform: translateY(-20px);
    }
    90% {
      transform: translateY(10px);
    } */
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes bounce-in-bot {
    from {
      transform: translateY(1000px);
      opacity: 0
    }
    10% {
      opacity: 1;
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes bounce-in-left {
    from {
      transform: translateX(-2500px);
      opacity: 0
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes bounce-in-right {
    from {
      transform: translateX(2500px);
      opacity: 0
    }
    50% {
      transform: translateX(0);
      opacity: 1;
    }
    70% {
      transform: translateX(-20px);
    }
    90% {
      transform: translateX(10px);
    }
    to {
      transform: translateX(0);
    }
  }

  @media screen and (max-width: 767px) {
    .center, .right {
      padding: 0;
      margin: 0;
    }

    .tile {
      border-radius: 0px;
    }

    .tiled {
      margin: 0;
      border-radius: 0px;
    }
  }
</style>

<style>
  * {
    font-size: 14px;
    font-weight: 400;
  }
  

  /*STYLING NAV BARS*/
  ul.nav-tabs {
    background-color: #2F363D;
    border-color: #2F363D;
    border-radius: 5px 5px 0 0;
  }

  li.nav-item a.nav-link {
    color: #fff;
  }

  li.nav-item a.nav-link.active {
    background-color: #600;
    color: #DAA520;
    border: 1px solid #600;
  }

  .tile {
    border-radius: 5px;
  }
  .gray-tile {
    /* background: #111; */
    /*background: rgba(17, 17, 17, 0.5);*/
    /* background-color: #21272c; */
    background-color: rgba(35, 39, 44, 1);
    color: #f4f4f4;
  }

  .inner-tile {
    background: rgba(0, 0, 0, 0.35) !important;
  }

  .inner-2-tile {
    background: rgba(100, 100, 100, 0.2) !important;
  }
  .tile-shadow {
    box-shadow: 0px 2px 2px #000;
  }
  .title {
    font-weight: 600;
    color: #DAA520;
  }

  .mobileOnly {
    display: none !important;
  }

  @media (min-width: 767px) {
    /*STYLING SCROLLBARS*/
    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }
    
    /* Track */
    ::-webkit-scrollbar-track {
        background: rgba(35, 39, 44, 1);
        border-radius: 8px;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.35);
        border-radius: 8px;
    }
    
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
  }

  /* MOBILE */

  @media screen and (max-width: 767px) {
    * {
      font-size: 13px;
      font-weight: 400;
    }

    .mobileOnly {
      display: block !important;
    }

    .desktopOnly {
      display: none;
    }

    /* .center, .right {
      padding: 0;
      margin: 0;
    } */

    .tile {
      border-radius: 0px;
    }

    .mobile {
      position: relative;
      height: 100% !important;
      display: flex;
      flex-direction: column;
    }

    .mobile > * {
      flex: auto;
    }



    .center {
      position: relative;
      height: calc(100vh - 105px);
      min-height: 500px;
      overflow: hidden;
      position: fixed;
    }

    /* FILTER AND OVERLAYS */
    
    .overlay {
      position: absolute;
      z-index: 998;
      width: 100%;
      height: 100%;
      background-color: rgba(55,0,0,0.8);
    }

    .filter-mobile {
      border-top: 3px solid rgba(118, 0, 0, 1 );
      padding-top: 5px;
      opacity: 0;
      background: #222;
      position: fixed;
      bottom: -100%;
      left : 50%;
      transform: translateX(-50%);
      width: 100%;
      z-index: 999;
      transition: .3s;
    }

    .filter-mobile.visible {
      z-index: 999;
      opacity: 1;
      bottom: 50px;
    }
  }
</style>
