import Vue from "vue";
import app from "./app";

const vm = new Vue({
  render: (h) => h(app),
}).$mount("#app");
