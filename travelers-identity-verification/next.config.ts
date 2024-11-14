import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config: any) => {
    let modularizeImports = null;
    config.module.rules.some((rule: any) =>
      rule.oneOf?.some((oneOf: any) => {
        modularizeImports = oneOf?.use?.options?.nextConfig?.modularizeImports;
        return modularizeImports;
      })
    );
    if (modularizeImports?.["@headlessui/react"]) {
      delete modularizeImports["@headlessui/react"];
    }
    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  /* diğer yapılandırma seçenekleri */
};

export default nextConfig;
