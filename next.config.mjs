/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xjcgmcphxwvbnhituozi.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    serverActions: {
      // permite upload de vídeos grandes pelas Server Actions (padrão é 1MB)
      bodySizeLimit: "200mb",
    },
  },
};

export default nextConfig;
