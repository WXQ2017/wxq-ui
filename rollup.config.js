// import copy from "rollup-plugin-copy";
const babel = require("rollup-plugin-babel");
const rollup = require("rollup");
const ts = require("rollup-plugin-typescript2");
const json = require("@rollup/plugin-json");
const commonjs = require("rollup-plugin-commonjs");
import path from "path";
import vue from "rollup-plugin-vue"

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
  console.log("key", key);
  const inputOptions = {
    input: comp[key],
    // external: ['vue', 'vue-class-component', 'vue-property-decorator'],
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
    name: "aaa",
    // globals: {
    //     vue: 'vue',
    //     'vue-class-component': 'vue-class-component',
    //     'vue-property-decorator': 'vue-property-decorator',
    //   },
  };
  build(inputOptions, outputOptions);
});
const rollupConfig = {
  input: path.join(__dirname, "./packages/index.ts"),
  output: [
    {
      file: path.join(path.join(__dirname, "/lib"), "index.js"),
      format: "cjs",
      name: "aa",
    },
  ],
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
export default rollupConfig;
