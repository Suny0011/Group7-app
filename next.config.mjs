/** @type {import('next').NextConfig} */

const nextConfig = {
  compress: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
};

const nextConfig = {};
export default nextConfig;
