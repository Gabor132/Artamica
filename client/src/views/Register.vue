<template>
  <div id="register">
    <md-card>
      <md-card-header>
        <h1 class="md-title">Register</h1>
      </md-card-header>
      <md-divider />
      <md-card-content>
        <div v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
        <form class="register" @submit.prevent="checkForm">
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
            <label for="email">Email</label>
            <md-input
              name="email"
              id="email"
              autocomplete="email"
              v-model="form.email"
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
          <md-field>
            <label for="password-confirm">Confirm Password</label>
            <md-input
              name="password-confirm"
              id="password-confirm"
              type="password"
              v-model="form.passwordConfirm"
              required
            />
          </md-field>
          <md-checkbox
            name="consent"
            id="consent"
            v-model="form.consent"
            class="md-primary"
            required
            >Whatever personal data you put here, it's your fault you used it.
            LOL. (don't worry, there is no email confirmation or other stuff
            yet)
          </md-checkbox>
        </form>
      </md-card-content>
      <md-card-actions>
        <md-button type="submit" class="md-primary md-raised" @click="register"
          >Register</md-button
        >
        <md-button class="md-accent" to="/login">Login</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import { RequestHandler } from "../javascript/requests";
import axios from "axios";
import { RequestUIHandler } from "../javascript/request_ui_handler";

export default {
  name: "Register",
  data: function() {
    return {
      errors: [],
      form: {
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        consent: false
      }
    };
  },
  methods: {
    validEmail: function(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    checkForm: function() {
      this.errors = [];

      if (
        this.form.username &&
        this.form.email &&
        this.form.password &&
        this.form.passwordConfirm
      ) {
        if (this.form.password !== this.form.passwordConfirm) {
          this.errors.push(
            "Password and password confirmation must be identical."
          );
        }
        if (!this.validEmail(this.form.email)) {
          this.errors.push("Valid email required.");
        }
      }

      if (!this.form.consent) {
        this.errors.push("You need to consent, stop trying to escape it.");
      }
      if (!this.form.username) {
        this.errors.push("Username required.");
      }
      if (!this.form.email) {
        this.errors.push("Email required.");
      }
      if (!this.form.password) {
        this.errors.push("Password required.");
      }
      if (!this.form.passwordConfirm) {
        this.errors.push("Password Confirmation required.");
      }
    },
    register: async function() {
      this.checkForm();
      if (this.errors.length === 0) {
        let result = await this.checkUsername();
        if (result) {
          result = await this.checkEmail();
          if (result) {
            return axios
              .post(RequestHandler.getBaseUrl() + "/register/add", {
                id: null,
                name: this.form.username,
                password: this.form.password,
                email: this.form.email,
                is_admin: this.form.is_admin
              })
              .then(() => {
                RequestUIHandler._getSuccessFunction(
                  undefined,
                  this.$store.state
                );
                this.$router.push("/login");
              })
              .catch(error => {
                RequestUIHandler._getFailureFunction(
                  undefined,
                  error,
                  this.$store.state
                );
              });
          } else {
            this.errors.push("Email is not available");
          }
        } else {
          this.errors.push("Username is not available");
        }
      }
    },
    checkUsername: async function() {
      return await axios
        .post(RequestHandler.getBaseUrl() + "/register/checkUsername", {
          id: null,
          name: this.form.username,
          password: null,
          email: null
        })
        .then(resp => {
          return resp.data;
        })
        .catch(error => {
          RequestUIHandler._getFailureFunction(
            undefined,
            error,
            this.$store.state
          );
          return false;
        });
    },
    checkEmail: async function() {
      return await axios
        .post(RequestHandler.getBaseUrl() + "/register/checkEmail", {
          id: null,
          name: null,
          password: null,
          email: this.form.email
        })
        .then(resp => {
          return resp.data;
        })
        .catch(error => {
          RequestUIHandler._getFailureFunction(
            undefined,
            error,
            this.$store.state
          );
          return false;
        });
    }
  }
};
</script>

<style scoped></style>
