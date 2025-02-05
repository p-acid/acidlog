import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

import { contentsBases } from "@/shared/constants/contents";
import { contentsDirectoryPath } from "@/shared/constants/contents/paths";
import { PostFrontmatter } from "@/shared/types/contents";
import dayjs from "dayjs";

interface GetContentsParams {
  base: (typeof contentsBases)[keyof typeof contentsBases];
}

export const getContents = ({ base }: GetContentsParams) => {
  const path = join(contentsDirectoryPath, base);

  const slugs = readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const contents = slugs.map((slug) => {
    const contentsPath = join(path, slug, "index.mdx");
    const file = readFileSync(contentsPath, { encoding: "utf8" });
    const { data } = matter(file);
    const frontmatter = data as PostFrontmatter;

    return { slug, ...frontmatter };
  });

  const sortedContents = contents.sort((a, b) =>
    dayjs(b.date).diff(dayjs(a.date)),
  );

  return sortedContents;
};
