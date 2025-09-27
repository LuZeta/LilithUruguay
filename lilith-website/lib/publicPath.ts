export function publicPath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  if (!path) return base
  return base + (path.startsWith('/') ? path : `/${path}`)
}

