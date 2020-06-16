<template>
  <div id="devtools">
    <md-card>
      <md-card-header>
        <span class="md-title">DEV Tools</span>
      </md-card-header>
      <md-card-content>
        <form>
          <md-field>
            {{ apiUrl }}
          </md-field>
          <md-field>
            <label for="username">Username</label>
            <md-input name="username" id="username" v-model="form.username" />
          </md-field>
          <md-field>
            <label for="password">Password</label>
            <md-input name="password" id="password" v-model="form.password" />
          </md-field>
        </form>
      </md-card-content>
      <md-card-actions>
        <md-button>
          Do Stuff
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
  name: "devtools",
  data: function() {
    return {
      form: {
        url: "http://localhost:8080",
        username: "",
        password: "",
        parameters: {
          param1: ""
        }
      },
      apiUrl: process.env.VUE_APP_ROOT_API
    };
  },
  methods: {}
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>
