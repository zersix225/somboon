import { defineConfig } from "@rslib/core";

export default defineConfig({
  source: {
    entry: {
      index: "./src/index.ts",
      client: "./src/client.ts",
    },
  },
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
