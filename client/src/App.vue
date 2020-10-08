----------------------------Template----------------------------------------------
<template>
  <md-app class="md-waterfall">
    <md-app-toolbar class="md-small md-primary md-dense">
      <apptitlebar />
      <appnavbar v-if="! this.$isMobile()"/>
    </md-app-toolbar>
    <md-app-drawer :md-active="this.$store.getters.showMenu" md-swipeable>
      <appnavdrawer />
    </md-app-drawer>
    <md-app-content>
      <appcontent />
    </md-app-content>
  </md-app>

</template>
----------------------------Style----------------------------------------------
<script>
//
// Imports
import appcontent from "./components/AppContent.vue";
import appnavbar from "./components/AppNavBar.vue";
import apptitlebar from "./components/AppTitleBar.vue";
import appnavdrawer from "./components/AppNavDrawer.vue";

//
// Setup of #app
export default {
  name: "app",
  meta: {
    title: process.env.VUE_APP_TITLE,
    bodyScript: [
      {
        src: "https://unpkg.com/vue"
      },
      {
        src: "https://unpkg.com/vue-material"
      }
    ]
  },
  methods: {
    showMenu() {
      this.$store.dispatch("TOGGLE_MENU");
    }
  },
  components: {
    appcontent,
    apptitlebar,
    appnavbar,
    appnavdrawer
  }
};
</script>
----------------------------Style----------------------------------------------
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons");
@import "assets/scss/theme";
@import "assets/scss/main";
#app {
  font-family: "Roboto", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>
