/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    hygraphEndpoint:
      "https://api-ap-southeast-2.hygraph.com/v2/cly466pil01qy07v2vxnkxnhd/master",
  },
};

export default nextConfig;
