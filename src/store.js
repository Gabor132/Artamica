import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

import { RequestHandler } from "./javascript/requests";
const queryString = require("querystring");

const Store = new Vuex.Store({
  state: {
    token: sessionStorage.getItem("access-token") || "",
    userToken: JSON.parse(sessionStorage.getItem("user-token")),
    clientInfo: JSON.parse(sessionStorage.getItem("clientInfo")),
    user: {
      name: "You",
      email: "email@fakeemail.com"
    },
    status: "",
    env: process.env.VUE_APP_NODE_ENV,
    myNotifications: [],
    isMenuShown: false,
    serviceResponseBar: {
      position: "center",
      duration: 4000,
      showSnackbar: false,
      isError: false,
      error: {
        status: "",
        description: ""
      }
    },
    isPushNotificationsActive:
      process.env.VUE_APP_IS_PUSH_NOTIFICATIONS_ACTIVE === "true"
  },
  mutations: {
    AUTH_REQUEST: state => {
      state.status = "loading";
    },
    AUTH_SUCCESS: (state, token) => {
      state.status = "success";
      state.token = token;
    },
    AUTH_ERROR: state => {
      state.status = "error";
    },
    AUTH_LOGOUT: state => {
      state.status = "";
      state.token = "";
    },
    CLIENT_REQUEST: state => {
      state.status = "loading";
    },
    CLIENT_SUCCESS: (state, clientInfo) => {
      state.status = "success";
      state.clientInfo = clientInfo;
    },
    CLIENT_ERROR: state => {
      state.status = "error";
    },
    USER_DETAILS_REQUEST: state => {
      state.status = "loading user details";
    },
    USER_DETAILS_SUCCESS: (state, user) => {
      state.status = "success";
      state.user = user;
    },
    USER_DETAILS_FAILURE: state => {
      state.status = "failed to get user details";
    },
    TOGGLE_MENU: state => {
      state.isMenuShown = !state.isMenuShown;
    },
    GET_MY_NOTIFY: (state, notifications) => {
      state.myNotifications = notifications;
      for (let index in state.myNotifications) {
        state.myNotifications[index].showDetails = false;
        state.myNotifications[index].showMessagePrompt = false;
      }
    },
  },
  actions: {
    TOGGLE_MENU: ({ commit }) => {
      commit("TOGGLE_MENU");
    },
    // Login/Register requests
    RETRIEVE_USER: ({ commit }) => {
      return new Promise((resolve, reject) => {
        commit("USER_DETAILS_REQUEST");
        return axios({
          method: "get",
          url: RequestHandler.getBaseUrl() + "/users/get_user_details",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(resp => {
            commit("USER_DETAILS_SUCCESS", resp.data);
            resolve(resp);
          })
          .catch(err => {
            commit("USER_DETAILS_FAILURE");
            reject(err);
          });
      });
    },
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        return axios({
          method: "post",
          url: RequestHandler.getBaseUrl() + "/oauth/token",
          data: queryString.stringify({
            grant_type: "password",
            client_id: user.clientInfo.client_id,
            client_secret: user.clientInfo.client_secret,
            username: user.username,
            password: user.password
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
          .then(resp => {
            commit("AUTH_SUCCESS");
            resolve(resp);
          })
          .catch(err => {
            commit("AUTH_ERROR");
            reject(err);
          });
      });
    },
    AUTH_LOGOUT: ({ commit }) => {
      return new Promise(resolve => {
        commit("AUTH_LOGOUT");
        sessionStorage.removeItem("access-token");
        sessionStorage.removeItem("user-token");
        sessionStorage.removeItem("user-details");
        // remove the axios default header
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    CLIENT_REQUEST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        commit("CLIENT_REQUEST");
        return axios({
          method: "get",
          url: RequestHandler.getBaseUrl() + "/app-security/clientId",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => {
            commit("CLIENT_SUCCESS", response.data);
            resolve(response);
          })
          .catch(error => {
            commit("CLIENT_ERROR");
            reject(error);
          });
      });
    },
    GET_MY_NOTIFY: ({ commit }) => {
      RequestHandler.doGetRequest("/notifications/my", {}).then(data => {
        commit("GET_MY_NOTIFY", data);
      });
    }
  },
  getters: {
    hasClient: state => !!state.clientInfo,
    // Change this when we can authenticate the user
    // eslint-disable-next-line no-unused-vars
    isAuthenticated: state => true,
    getUser: state => state.user,
    showMenu: state => state.isMenuShown,
    isProduction: state => state.env === "production",
    isDevelopment: state => state.env === "development",
    getMyNotifications: state => state.myNotifications,
  }
});

export default Store;
