import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const Store = new Vuex.Store({
  state: {
    user: JSON.parse(sessionStorage.getItem("user-details")),
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
    TOGGLE_MENU: state => {
      state.isMenuShown = !state.isMenuShown;
    },
    SAVE_USER: state => {
      state.user = JSON.parse(sessionStorage.getItem("user-details"));
    },
    CLEAR_USER: state => {
      state.user = null;
    }
  },
  actions: {
    TOGGLE_MENU: ({ commit }) => {
      commit("TOGGLE_MENU");
    },
    SAVE_USER: ({commit}, user) => {
      if(user !== null && user !== undefined){
        commit("SAVE_USER");
        sessionStorage.setItem("user-details", JSON.stringify(user));
      }else{
        commit("CLEAR_USER");
      }
    },
    CLEAR_USER: ({commit}) => {
      commit("CLEAR_USER");
      sessionStorage.removeItem("user-details");
    }
  },
  getters: {
    getUser: state => state.user,
    isAuthenticated: state => !!state.user,
    showMenu: state => state.isMenuShown,
    isProduction: state => state.env === "production",
    isDevelopment: state => state.env === "development",
  }
});

export default Store;
