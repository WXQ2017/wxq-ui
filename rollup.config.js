// import copy from "rollup-plugin-copy";
const path = require("path");
const vue = require("rollup-plugin-vue");
const babel = require("rollup-plugin-babel");
const rollup = require("rollup");
const ts = require("rollup-plugin-typescript2");
const json = require("@rollup/plugin-json");
const commonjs = require("rollup-plugin-commonjs");
const package = require("./package.json")
// import path from "path";
// import vue from "rollup-plugin-vue"

const comp = {
  message: "./packages/base/message/message.vue",
};

async function build(inputOptions, outputOptions) {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  console.log(bundle.imports); // an array of external dependencies
  console.log(bundle.exports); // an array of names exported by the entry point
  console.log(bundle.modules); // an array of module objects

  // generate code and a sourcemap
  //   const { code, map } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

Object.keys(comp).forEach((key) => {
  // console.log("key", key);
  const inputOptions = {
    input: comp[key],
    external: ["vue", "vue-class-component", "vue-property-decorator"],
    plugins: [
      // copy({
      //   targets: [{ src: "packages", dest: "dist" }],
      // }),
      vue(),
      babel({
        babelrc: true,
        exclude: "node_modules/**",
      }),
      ts(),
      json(),
      commonjs(),
    ],
  };
  const outputOptions = {
    file: path.join(path.join(__dirname, `lib/${key}`), "index.js"),
    format: "cjs",
    name: package.name,
    globals: {
      vue: "vue",
      "vue-class-component": "vue-class-component",
      "vue-property-decorator": "vue-property-decorator",
    },
  };
  build(inputOptions, outputOptions);
  build(inputOptions, {...outputOptions, format: "esm", file: path.join(path.join(__dirname, `lib/${key}`), "index.esm.js")});
});
