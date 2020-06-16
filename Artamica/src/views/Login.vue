<template>
  <div id="login">
    <md-card>
      <md-card-header>
        <h1 class="md-title">Login</h1>
      </md-card-header>
      <md-divider />
      <md-card-content>
        <form class="login" @submit.prevent="login">
          <md-field>
            <label for="username">Username</label>
            <md-input
              name="username"
              id="username"
              autocomplete="username"
              v-model="form.username"
              required
            />
          </md-field>
          <md-field>
            <label for="password">Password</label>
            <md-input
              name="password"
              id="password"
              type="password"
              v-model="form.password"
              required
            />
          </md-field>
        </form>
      </md-card-content>
      <md-card-actions>
        <router-link to="/index" :disabled="canLogin">
          <md-button type="submit" class="md-primary md-raised" @click="login"
            >Login</md-button
          >
        </router-link>
        <md-button class="md-accent" to="/register">Register</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Imports
//
import { RequestUIHandler } from "../javascript/request_ui_handler";
import axios from "axios";
import Store from "../store";

// Local Setup
export default {
  name: "login",
  data: () => {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login: function() {
      this.$store
        .dispatch("AUTH_REQUEST", {
          username: this.form.username,
          password: this.form.password,
          clientInfo: this.$store.state.clientInfo
        })
        .then(resp => {
          const token = resp.data.access_token;
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          sessionStorage.setItem("access-token", token);
          sessionStorage.setItem("user-token", JSON.stringify(resp.data));
          RequestUIHandler._getSuccessFunction(undefined, Store.state);
          this.retrieveUser()
            .then(() => {
              this.$router.go();
            })
            .catch(() => {
              this.$store.dispatch("AUTH_LOGOUT").then(() => {
                this.$router.push("/login");
              });
            });
        })
        .catch(err => {
          sessionStorage.removeItem("access-token");
          sessionStorage.removeItem("user-token");
          RequestUIHandler._getFailureFunction(undefined, err, Store.state);
        });
    },
    canLogin: function() {
      return this.$store.getters.hasClient();
    },
    retrieveUser: function() {
      return this.$store
        .dispatch("RETRIEVE_USER", {
          username: this.form.username,
          password: this.form.password
        })
        .then(resp => {
          const user = resp.data;
          sessionStorage.setItem("user-details", JSON.stringify(user));
          RequestUIHandler._getSuccessFunction(undefined, Store.state);
        })
        .catch(err => {
          sessionStorage.removeItem("user-details");
          RequestUIHandler._getFailureFunction(undefined, err, Store.state);
        });
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>
