/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    // We handle AudioContext errors in the code
    ignoreBuildErrors: true
  }
};

export default nextConfig; 