/** @type {import('next').NextConfig} */
const nextConfig = {
  // swcMinify: true,
  experimental: {
    // Optional: enable if using SWC fully
    forceSwcTransforms: true,
  },
  // Tell SWC/Babel to output modern JS
  compiler: {
    styledComponents: true, // if you use it
  },
  // Important: modern browserslist
  // Remove or comment out any old targets
  // If you have browserslist in package.json, set:
  // "browserslist": [">0.25%", "not dead"]
}

export default nextConfig
