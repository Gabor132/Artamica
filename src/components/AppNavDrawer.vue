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
      <md-list-item to="/people" @click="hideDrawer">
        <md-icon>people</md-icon>
        <span class="md-list-item-text">People</span>
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
// Setup appnavbar
import {
  checkSubscription,
  subscribeNotifications
} from "../registerServiceWorker";
import { RequestHandler } from "../javascript/requests";

export default {
  name: "appnavdrawer",
  props: ["global"],
  data: function() {
    return {
      user: this.$store.getters.getUser,
      isSubscribed: false,
      isPushNotificationsActive: this.$store.getters.isPushNotificationsActive,
      title: process.env.VUE_APP_TITLE
    };
  },
  async beforeMount() {
    if (this.isPushNotificationsActive) {
      this.isSubscribed = await checkSubscription();
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("AUTH_LOGOUT").then(() => {
        this.hideDrawer();
        this.$router.go();
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
    },
    isDragos: function() {
      return this.user.name === "admin";
    },
    subscribeForCanISmoke: async function() {
      this.hideDrawer();
      let subscription = await subscribeNotifications();
      let data = subscription.toJSON();
      await RequestHandler.doPostRequest("/notification/add", {
        endpointUrl: data.endpoint,
        p256dh: data.keys.p256dh,
        auth: data.keys.auth
      }).then(() => {
        // eslint-disable-next-line no-console
        console.log("Success");
      });
      this.$forceUpdate();
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons");
</style>
