/** @type {import("next").NextConfig} */
const isStaticExport = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "static";
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath =
  isStaticExport && rawBasePath
    ? rawBasePath.startsWith("/")
      ? rawBasePath
      : `/${rawBasePath}`
    : "";

const nextConfig = {
  reactStrictMode: true,
  ...(isStaticExport
    ? {
        output: "export",
        images: { unoptimized: true },
        trailingSlash: true,
        ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
      }
    : {}),
};

module.exports = nextConfig;
