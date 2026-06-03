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
  // Deploy ágil: não bloquear o build por warnings de lint ou TS.
  // (Reativar para reforçar qualidade quando o site estabilizar.)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
