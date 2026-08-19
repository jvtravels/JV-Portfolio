import tempoNextjsPlugin from "tempo-sdk/nextjs/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

export default tempoNextjsPlugin()(nextConfig);
