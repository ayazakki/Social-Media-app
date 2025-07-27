import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[new URL ("https://linked-posts.routemisr.com/**")]
  }
};

export default nextConfig;
