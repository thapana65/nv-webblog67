// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import { sync } from "vuex-router-sync";
import store from "./store";
import VueResource from "vue-resource";
import BackHeader from "@/components/Header";
import VueCkediter from "vue-ckeditor2";

Vue.config.productionTip = false;

Vue.component("back-header", BackHeader);

Vue.use(VueResource);
Vue.use(VueCkediter);

sync(store, router);
Vue.component("navigationBar", BackHeader);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
});
