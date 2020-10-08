import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Store from "./store";
import BootstrapVue from "bootstrap-vue";
// TODO: Replace the bellow import with more specific ones to avoid unneccessary imports
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "./registerServiceWorker";
import axios from "axios";
import VueMobileDetection from "vue-mobile-detection";

// Import the Auth0 configuration
import { domain, clientId } from "../auth_config.json";
// Import the plugin here
import { Auth0Plugin } from "./auth/auth";

const token = sessionStorage.getItem("access-token");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueMaterial);
Vue.use(VueMobileDetection);
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
        appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
    );
  }
});

new Vue({
  router,
  store: Store,
  render: h => h(App),
  mounted: function() {
  }
}).$mount("#app");
