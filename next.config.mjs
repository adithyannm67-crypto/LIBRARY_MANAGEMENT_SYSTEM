import path from "path"
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      },
    ],
  },
  turbopack:{
    root:path.resolve(".")
  }
};

export default nextConfig;
