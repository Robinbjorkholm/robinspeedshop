/** @type {import('next').NextConfig} */
import dotenv from "dotenv";

dotenv.config();

const nextConfig = {
  cssModules: {
    localIdentName: "[local]--[hash:base64:5]",
  },
};

export default nextConfig;
