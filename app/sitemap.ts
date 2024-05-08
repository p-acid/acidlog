import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.acidlog.life/",
      lastModified: "2024-05-08T06:04:16+00:00",
      priority: 1.0,
    },
    {
      url: "https://www.acidlog.life/docs",
      lastModified: "2024-05-08T06:04:16+00:00",
      priority: 0.8,
    },
    {
      url: "https://www.acidlog.life/projects",
      lastModified: "2024-05-08T06:04:16+00:00",
      priority: 0.8,
    },
    {
      url: "https://www.acidlog.life/about",
      lastModified: "2024-05-08T06:04:16+00:00",
      priority: 0.8,
    },
    {
      url: "https://www.acidlog.life/posts/handle-markdown-with-notion-api",
      lastModified: "2024-05-08T06:04:16+00:00",
      priority: 0.8,
    },
    {
      url: "https://www.acidlog.life/posts/switter-review",
      lastModified: "2024-05-08T06:04:16+00:00",
      priority: 0.8,
    },
    {
      url: "https://www.acidlog.life/posts/2023-review",
      lastModified: "2024-05-08T06:04:16+00:00",
      priority: 0.8,
    },
    {
      url: "https://www.acidlog.life/posts/why-use-git-flow",
      lastModified: "2024-05-08T06:04:16+00:00",
      priority: 0.8,
    },
    {
      url: "https://www.acidlog.life/docs/google-ads-api-with-node",
      lastModified: "2024-05-08T06:04:16+00:00",
      priority: 0.64,
    },
  ];
}
