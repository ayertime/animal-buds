import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow SVG placeholders. These are local files only — no remote SVG risk.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
