import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://acidlog.world/",
      lastModified: "2024-07-29T07:17:33+00:00",
      priority: 1.0,
    },
    {
      url: "https://acidlog.world/docs",
      lastModified: "2024-07-29T07:17:33+00:00",
      priority: 0.8,
    },
    {
      url: "https://acidlog.world/projects",
      lastModified: "2024-07-29T07:17:33+00:00",
      priority: 0.8,
    },
    {
      url: "https://acidlog.world/about",
      lastModified: "2024-07-29T07:17:33+00:00",
      priority: 0.8,
    },
    {
      url: "https://acidlog.world/posts/static-contents-management-with-notion",
      lastModified: "2024-07-29T07:17:33+00:00",
      priority: 0.8,
    },
    {
      url: "https://acidlog.world/posts/switter-review",
      lastModified: "2024-07-29T07:17:33+00:00",
      priority: 0.8,
    },
    {
      url: "https://acidlog.world/posts/2023-review",
      lastModified: "2024-07-29T07:17:33+00:00",
      priority: 0.8,
    },
    {
      url: "https://acidlog.world/posts/why-use-git-flow",
      lastModified: "2024-07-29T07:17:33+00:00",
      priority: 0.8,
    },
    {
      url: "https://acidlog.world/docs/bundler-basics",
      lastModified: "2024-07-29T07:17:33+00:00",
      priority: 0.64,
    },
    {
      url: "https://acidlog.world/docs/transpiler-basics",
      lastModified: "2024-07-29T07:17:33+00:00",
      priority: 0.64,
    },
  ];
}
