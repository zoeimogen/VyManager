import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // IMPORTANT: We do NOT use rewrites here because they are evaluated at BUILD TIME
  // and cannot be configured at runtime. Instead, all API proxying is done through
  // API route handlers in src/app/api/* which read BACKEND_URL at RUNTIME.
  //
  // This allows users to set BACKEND_URL=http://some-host:8000 in their .env
  // without needing to rebuild the Docker image.

  // Sub-path deployment support (BUILD TIME — must be passed as a Docker build arg).
  // Set NEXT_PUBLIC_BASE_PATH=/vymanager when building the image to serve the app
  // from https://host/vymanager/ instead of https://host/.
  // Leave unset (or empty) for root-path deployments.
  ...(process.env.NEXT_PUBLIC_BASE_PATH
    ? { basePath: process.env.NEXT_PUBLIC_BASE_PATH }
    : {}),

  // Allow dev HMR from custom origins (for reverse proxy / custom domain access).
  // Set ALLOWED_DEV_ORIGINS as a comma-separated list in .env, e.g.:
  //   ALLOWED_DEV_ORIGINS=mysite.example.com,other.example.com
  ...(process.env.ALLOWED_DEV_ORIGINS
    ? { allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS.split(",").map(s => s.trim()) }
    : {}),
};

export default nextConfig;
