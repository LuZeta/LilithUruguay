const isProd = process.env.NODE_ENV === "production"
const isStatic = process.env.STATIC_EXPORT === "true"
const repo = "LilithUruguay"

/** @type {import("next").NextConfig} */
const nextConfig = {
  ...(isStatic ? { output: "export" } : {}),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: isStatic ? true : undefined,
  basePath: isStatic && isProd ? `/${repo}` : undefined,
  assetPrefix: isStatic && isProd ? `/${repo}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isStatic && isProd ? `/${repo}` : "",
  },
  reactStrictMode: true,
}

export default nextConfig
