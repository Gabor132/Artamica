<template>
  <div id="appnavdrawer">
    <md-app-toolbar class="md-transparent" md-elevation="0">
      <md-button class="md-icon-button" @click="hideDrawer">
        <md-icon class="md-icon">arrow_back</md-icon>
      </md-button>
      <span class="md-title titlefont" to="/">Menu</span>
    </md-app-toolbar>
    <md-divider />
    <md-list>
      <md-list-item @click="goToProfile()" v-if="isAuthenticated()">
        <md-icon>account_circle</md-icon>
        <span class="md-list-item-text">My Profile</span>
      </md-list-item>
      <md-list-item to="/artists" @click="hideDrawer">
        <md-icon>people</md-icon>
        <span class="md-list-item-text">Artists</span>
      </md-list-item>
      <md-list-item to="/artworks" @click="hideDrawer">
        <md-icon>portrait</md-icon>
        <span class="md-list-item-text">Artworks</span>
      </md-list-item>
      <md-list-item to="/about" @click="hideDrawer">
        <md-icon>help</md-icon>
        <span class="md-list-item-text">About</span>
      </md-list-item>
      <md-list-item @click="logout" v-if="isAuthenticated()">
        <md-icon>no_meeting_room</md-icon>
        <span class="md-list-item-text">Logout</span>
      </md-list-item>
    </md-list>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Setup appnavdrawer
export default {
  name: "appnavdrawer",
  props: ["global"],
  data: function() {
    return {
      user: this.$auth.user,
      isSubscribed: false,
      isPushNotificationsActive: this.$store.getters.isPushNotificationsActive,
      title: process.env.VUE_APP_TITLE
    };
  },
  methods: {
    logout: function() {
      this.$auth.logout({
        returnTo : window.location.origin
      });
    },
    hideDrawer: function() {
      this.$store.dispatch("TOGGLE_MENU");
    },
    goToProfile: function() {
      this.hideDrawer();
      this.$router.push("/profile");
    },
    isAuthenticated: function() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons");
</style>
