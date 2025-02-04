import { resolve } from "path";

const rootDirectoryName = "contents";

export const contentsDirectoryPath = resolve(rootDirectoryName);

export const contentsBases = {
  posts: "posts",
} as const;
