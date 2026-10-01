import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos are served and resized by their CDN (see the loader).
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
