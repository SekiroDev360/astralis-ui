import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "path";

const nextConfig: NextConfig = {
  // Support both .ts/.tsx and .md/.mdx page files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  
  // Point Turbopack root to the workspace root directory
  turbopack: {
    root: path.resolve(__dirname, "../../"),
  },
};

const withMDX = createMDX({
  // Add any remark/rehype markdown plugins here if needed
});

export default withMDX(nextConfig);
