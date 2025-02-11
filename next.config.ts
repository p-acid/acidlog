import createMDX from "@next/mdx";
import { CodeHikeConfig, recmaCodeHike, remarkCodeHike } from "codehike/mdx";
import type { NextConfig } from "next";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import remarkPublicAssets from "./scripts/remark-public-assets.mjs";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

const codehikeConfig: CodeHikeConfig = {
  components: { code: "Code" },
  syntaxHighlighting: { theme: "github-dark" },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkGfm,
      remarkPublicAssets,
      [remarkCodeHike, codehikeConfig],
    ],
    recmaPlugins: [[recmaCodeHike, codehikeConfig]],
  },
});

export default withMDX(nextConfig);
