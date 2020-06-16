<template>
  <div class="md-toolbar-row md-toolbar-offset" id="appnavbar">
    <md-tabs
      class="md-primary"
      md-alignment="centered"
      v-if="$store.getters.isAuthenticated && !this.$isMobile()"
    >
      <template slot="md-tab" slot-scope="{ tab }">
        <md-icon class="md-icon md-icon-font md-tab-icon md-theme-default">{{
          tab.icon
        }}</md-icon>
        <span class="md-tab-label">{{ tab.label }}</span>
        <i class="badge" v-if="tab.data.badge">{{ tab.data.badge }}</i>
      </template>
      <md-tab
              id="tab-home"
              md-label="Home"
              to="/index"
              md-icon="house"
      ></md-tab>
      <md-tab
              id="tab-people"
              md-label="Artists"
              to="/artists"
              md-icon="people"
      ></md-tab>
      <md-tab
              id="tab-artworks"
              md-label="Artworks"
              to="/artworks"
              md-icon="portrait"
      ></md-tab>
      <md-tab
              id="tab-messages"
              md-label="Messages"
              to="/messages"
              md-icon="message"
      ></md-tab>
      <md-tab
        v-if="this.isDevelopment()"
        id="tab-requests"
        md-label="Dev Tools"
        to="/devtools"
        md-icon="build"
      >
      </md-tab>
    </md-tabs>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Setup appnavbar
//
import { RequestHandler } from "../javascript/requests";

export default {
  name: "appnavbar",
  data: function() {
    return {
      user: this.$store.getters.getUser,
      numberOfUnreadMessages: this.$store.getters.getNumberUnreadMessages
    };
  },
  methods: {
    isDevelopment: function() {
      return this.$store.getters.isDevelopment && false;
    },
    mounted() {
      this.getNumberUnreadMessages();
    },
    getNumberUnreadMessages: async function() {
      let number = await RequestHandler.doGetRequest(
        "/messages/all/unread/number",
        {}
      ).then(data => {
        return data;
      });
      await this.$store.dispatch("SET_UNREAD_MESSAGE", number);
    },
    clearUnreadBadge: function() {
      this.getNumberUnreadMessages();
      this.numberOfUnreadMessages = this.$store.getters.getNumberOfUnreadMessages;
    },
    toMessages: function() {
      this.$router.push("/messages");
      this.clearUnreadBadge();
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>
