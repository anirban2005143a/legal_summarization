/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_FAST_URL: "https://divyanshu8210-legalsummary.hf.space",
  },
  webpack: (config) => {
    // Ignore PDF files inside node_modules during build
    config.module.rules.push({
      test: /\.pdf$/,
      use: "null-loader",
    });

    return config;
  },
};

export default nextConfig;
