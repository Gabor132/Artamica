<template>
  <div class="profile">
    <md-card-header>
      <md-card-header-text>
        <h3 class="md-title">{{ user.name }}</h3>
        <span> profile page </span>
      </md-card-header-text>
      <md-card-media class="md-medium">
        <md-icon class="md-size-5x">person</md-icon>
      </md-card-media>
    </md-card-header>
    <md-divider />
    <md-card-actions>
      <md-button @click="logout">Logout</md-button>
    </md-card-actions>
    <md-card-header>
      <md-card-header-text>
        <h3 class="md-title">About</h3>
      </md-card-header-text>
    </md-card-header>
    <md-divider />
    <md-card-content>
      <md-card-area>
        <p>Username: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
      </md-card-area>
    </md-card-content>
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
      this.$store.dispatch("AUTH_LOGOUT").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>
