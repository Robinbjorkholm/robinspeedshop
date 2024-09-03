/** @type {import('next').NextConfig} */
import dotenv from "dotenv";

dotenv.config();

const nextConfig = {
  output: "standalone", // or "export"
  experimental: {},
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
