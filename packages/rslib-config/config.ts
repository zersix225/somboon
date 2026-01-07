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
        minify: true,
        sourceMap: true,
        target: "web",
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
        minify: true,
        sourceMap: true,
        target: "web",
      },
    },
  ],
});
