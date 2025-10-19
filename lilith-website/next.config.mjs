const isStaticExport = process.env.STATIC_EXPORT === "true"
const isVercel = Boolean(process.env.VERCEL)
const repo = "LilithUruguay"
const staticBasePath = isStaticExport && !isVercel ? `/${repo}` : ""

/** @type {import("next").NextConfig} */
const nextConfig = {
  ...(isStaticExport ? { output: "export" } : {}),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: isStaticExport ? true : undefined,
  basePath: staticBasePath || undefined,
  assetPrefix: staticBasePath ? `${staticBasePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: staticBasePath,
  },
  reactStrictMode: true,
}

export default nextConfig
