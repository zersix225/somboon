import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],
  env: {
    port: "3000",
  }, // ensures UI package is compiled
};

export default nextConfig;
