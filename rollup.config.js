import copy from "rollup-plugin-copy";

export default {
  input: "",
  output: {
    file: "",
    format: "esm",
  },
  plugins: [
    copy({
      targets: [{ src: "packages", dest: "dist" }],
    }),
  ],
};
