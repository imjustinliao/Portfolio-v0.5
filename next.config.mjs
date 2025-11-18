const repoName = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath = repoName ? `/${repoName}` : "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  ...(basePath && { basePath, assetPrefix: basePath }),
};

export default nextConfig;
