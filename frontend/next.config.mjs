/** @type {import('next').NextConfig} */
const nextConfig = {
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
