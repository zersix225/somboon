import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      bundle: true,
      dts: true,
      format: "esm",
      output: {
        distPath: {
          root: "./dist/esm",
        },
        minify: false,
        sourceMap: true,
        target: "node",
      },
    },
    {
      bundle: true,
      dts: true,
      format: "cjs",
      output: {
        distPath: {
          root: "./dist/cjs",
        },
        minify: false,
        sourceMap: true,
        target: "node",
      },
    },
  ],
});
