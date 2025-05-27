import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
  webpack: (config) => {
    Object.defineProperty(config, "devtool", {
      get() {
        return "source-map";
      },
      set() {},
    });
    // config.devtool = "source-map";
    return config;
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
