/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        port: "",
      },
      // Temporary placeholder until real Vercel Blob thumbnails are uploaded
      {
        protocol: "https",
        hostname: "placeholder.com",
        port: "",
      },
    ],
  },
};

export default config;
