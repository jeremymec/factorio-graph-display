import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const packageJson = require("./package.json");

export default {
  input: "index.ts",
  output: [
    {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: false
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
  ]
};