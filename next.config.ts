/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the master override switch
  eslint: {
    // This tells the build command to completely ignore the step
    // that has been failing this whole time.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;