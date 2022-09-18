// NPM: MAIN
import Vue from "vue";

// PROJECT: MAIN
import App from "./App.vue";

// PROJECT: OTHER
require("./utils/imports");

/**************************************************************************
 * VUE INSTANCE
 **************************************************************************/
Vue.config.productionTip = false;

export default new Vue({
  render: h => h(App)
}).$mount("#app");
