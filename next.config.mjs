// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: [],
//     unoptimized: true, // For static sites
//   },
//   // Enable static export
//   output: 'export',
//   // Optional: Add trailing slash for static hosting
//   trailingSlash: true,
// }

// export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ REMOVE या COMMENT OUT ये line:
  // output: 'export',
  
  images: {
    unoptimized: true,
  },
  
  // Optional: Add other configs if needed
  // trailingSlash: true,
  // reactStrictMode: true,
};

export default nextConfig;