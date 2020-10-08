<template>
  <div id="login">
    <md-card class="page-wide-card">
      <md-card-header>
        <h1 class="md-title">Login</h1>
      </md-card-header>
      <md-divider />
      <md-card-content>
        <p>You must be logged in to use this app</p>
      </md-card-content>
      <md-card-actions v-if="! $auth.loading">
          <md-button type="submit" class="md-primary md-raised" @click="login" :disabled="$auth.isAuthenticated"
            >Login</md-button
          >
          <md-button type="submit" class="" @click="logout" :disabled="!$auth.isAuthenticated">Logout
          </md-button>
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
  name: "login",
  data: () => {
    return {};
  },
  methods: {
    login: function() {
      this.$auth.loginWithRedirect();
    },
    logout: function() {
      this.$auth.logout({
        returnTo : window.location.origin
      });
    }
  },
    beforeCreate() {
      if (this.$auth.isAuthenticated) {
          this.$router.push("/artists");
      }
    }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>
