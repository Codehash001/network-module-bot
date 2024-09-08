import fs from "fs";
import withLlamaIndex from "llamaindex/next";
import customWebpack from "./webpack.config.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = JSON.parse(fs.readFileSync("./next.config.json", "utf-8"));

// Merge the custom webpack configuration with PDF.js worker setup
nextConfig.webpack = (config, options) => {
  // Apply the custom webpack configuration
  config = customWebpack(config, options);

  // Add configuration for PDF.js worker
  config.resolve.alias.canvas = false;
  config.resolve.fallback = {
    ...config.resolve.fallback,
    canvas: false,
    fs: false,
    path: false,
    url: false,
  };

  return config;
};

// Additional configuration for PDF viewer
nextConfig.compress = true; // Enable compression
nextConfig.reactStrictMode = true; // Enable React strict mode

// Enable transpilePackages for react-pdf and pdfjs-dist
nextConfig.transpilePackages = [
  ...(nextConfig.transpilePackages || []),
  'react-pdf',
  'pdfjs-dist',
];

// use withLlamaIndex to add necessary modifications for llamaindex library
export default withLlamaIndex(nextConfig);