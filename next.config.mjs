/** @type {import('next').NextConfig} */
export default {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  experimental: {
    optimizeCss: true,
    swcMinify: true,
    optimizePackageImports: ["lucide-react", "react-icons", "motion"],
    outputFileTracingIncludes: {
      "/lab/[slug]": [
        "./components/lab/**/*",
        "./components/lab/examples/**/*",
        "./hooks/**/*",
      ],
    },
    outputFileTracingExcludes: {
      "*": ["**/*.mdx"],
    },
  },
};
