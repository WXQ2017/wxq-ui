import Vue, { Component } from "vue";

const r = require.context("./base", true, /.vue$/);
const components: Component[] = [];
r.keys().forEach((key) => {
  // console.log(key)
  components.push(r(key).default || r(key))
});
console.log(components)
const install: any = function (Vue: any,  opts = {}) {
  if (install.installed) return;
  components.map((component) => Vue.component(component.name, component));
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}


export default {
  version: '1.0.0',
  install,
  ...components
};
