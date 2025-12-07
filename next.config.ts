import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    domains:["d2k6fvhyk5xgx.cloudfront.net" , "m.media-amazon.com"]
  },
  typescript: {
    ignoreBuildErrors: true
},

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },


};

export default nextConfig;
