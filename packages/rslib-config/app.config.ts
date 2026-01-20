import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      bundle: true,
      dts: false,
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
  ],
});
