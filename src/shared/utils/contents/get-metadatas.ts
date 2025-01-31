import { PostMetadata } from "@/shared/types/contents";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

export const getMetadatas = (basePath: string) => {
  const slugs = readdirSync(basePath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const metadatas = slugs.map((slug) => {
    const contentsPath = join(basePath, slug, "index.mdx");
    const file = readFileSync(contentsPath, { encoding: "utf8" });
    const { data } = matter(file);
    const metadata = data as PostMetadata;

    return { slug, ...metadata };
  });

  return metadatas;
};
