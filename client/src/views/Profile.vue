<template>
  <div class="profile">
    <md-card class="page-wide-card">
    <md-card-header>
      <md-card-header-text>
        <h3 class="md-title">{{ user.name }}</h3>
      </md-card-header-text>
      <md-card-media class="md-medium">
          <img v-bind:src="user.picture" alt="person">
      </md-card-media>
    </md-card-header>
    <md-divider />
    <md-card-content>
      <md-card-area>
        <p>Username: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
      </md-card-area>
    </md-card-content>
    <md-card-actions>
      <md-button @click="logout">Logout</md-button>
    </md-card-actions>
    </md-card>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Imports
//
// Local Setup
export default {
  name: "profile",
  data: function() {
    return {
      user: this.$store.getters.getUser,
      previewImage: null,
      file: null
    };
  },
  methods: {
    logout: function() {
      this.$auth.logout({
        returnTo : window.location.origin
      });
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>
