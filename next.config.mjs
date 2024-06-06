import MillionLint from '@million/lint';
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "github.com",
      port: "",
      pathname: "/**"
    }]
  }
};
export default MillionLint.next({
  rsc: true
})(nextConfig);