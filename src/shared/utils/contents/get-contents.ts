import { PostMetadata } from "@/shared/types/contents";
import { readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

export const getContents = (basePath: string, slug: string) => {
  const contentsPath = join(basePath, slug, "index.mdx");
  const file = readFileSync(contentsPath, { encoding: "utf8" });
  const { data, content } = matter(file);
  const metadata = data as PostMetadata;

  return { metadata, content };
};
