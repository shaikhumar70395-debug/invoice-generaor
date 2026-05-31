import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdfkit"],
  // On synced folders (e.g. OneDrive), huge Turbopack cache writes can freeze the PC.
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
