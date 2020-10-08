<template>
  <div class="md-toolbar-row" id="apptitlebar">
    <md-button class="md-icon-button" @click="showMenu">
      <md-icon class="md-icon">menu</md-icon>
    </md-button>
    <span class="md-title titlefont md-large" to="/">{{title}}</span>
    <div class="md-toolbar-section-end" v-if="user !== null">
      <md-button class="md-icon-button" @click="goToProfile">
        <md-avatar v-if="user !== null" class="md-avatar-icon">
          <img v-bind:src="user.picture" alt="person">
        </md-avatar>
      </md-button>
    </div>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Setup appnavbar
export default {
  name: "apptitlebar",
  data: function() {
    return {
      user: this.$store.getters.getUser,
      title: process.env.VUE_APP_TITLE
    };
  },
  methods: {
    showMenu() {
      this.$store.dispatch("TOGGLE_MENU");
    },
    goToProfile() {
      this.$router.push("/profile");
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons");
</style>
