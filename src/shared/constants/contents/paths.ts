import path from "path";

const rootDirectoryName = "contents";

const contentsDirectories = {
  posts: "posts",
};

export const contentPaths = {
  posts: path.resolve(
    process.cwd(),
    rootDirectoryName,
    contentsDirectories.posts,
  ),
};
