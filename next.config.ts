import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Services were consolidated from nine pages to five; keep old URLs working.
  // Keep in sync with LEGACY_SERVICE_REDIRECTS in src/components/marketing/service-content.ts.
  async redirects() {
    const legacy: Record<string, string> = {
      "cloud-services": "cloud-infrastructure",
      "infrastructure-services": "cloud-infrastructure",
      "managed-application": "cloud-infrastructure",
      "big-data-analytics": "data-ai",
      "enterprise-services": "enterprise-applications",
      "sap-services": "enterprise-applications",
      erp: "enterprise-applications",
    };
    return Object.entries(legacy).map(([from, to]) => ({
      source: `/services/${from}`,
      destination: `/services/${to}`,
      permanent: true,
    }));
  },
  // Image fallback detection also runs inside Vercel serverless functions.
  outputFileTracingIncludes: { "/*": ["./public/images/**/*"] },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  experimental: {
    serverActions: { bodySizeLimit: "4.5mb" },
    optimizePackageImports: ["lucide-react"],
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

export default nextConfig;
