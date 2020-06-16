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

const token = sessionStorage.getItem("access-token");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueMaterial);
Vue.use(VueMobileDetection);

new Vue({
  router,
  store: Store,
  render: h => h(App),
  mounted: function() {
  }
}).$mount("#app");
