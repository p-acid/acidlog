import { access, constants, copyFile, mkdir, readdir, rm } from "fs/promises";
import path from "path";

const SOURCE_DIR = path.join(process.cwd(), "contents", "posts");
const TARGET_DIR = path.join(process.cwd(), "public", "assets", "posts");

const exists = async (path) => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const copyAssets = async () => {
  const entries = await readdir(SOURCE_DIR, { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  if (await exists(TARGET_DIR)) await rm(TARGET_DIR, { recursive: true });

  for await (const dir of dirs) {
    const sourceDirPath = path.resolve(path.join(SOURCE_DIR, dir));
    const targetDirPath = path.resolve(path.join(TARGET_DIR, dir));
    const entries = await readdir(sourceDirPath, { withFileTypes: true });
    const files = entries
      .filter((entry) => !entry.isDirectory())
      .map((entry) => entry.name);
    const assetFiles = files.filter((file) =>
      /.(jpg|jpeg|png|gif|mov)$/.test(file),
    );

    if (assetFiles.length === 0) continue;

    await mkdir(targetDirPath, { recursive: true });

    await Promise.all(
      assetFiles.map((assetFile) => {
        const sourceFilePath = path.resolve(
          path.join(sourceDirPath, assetFile),
        );
        const targetFilePath = path.resolve(
          path.join(targetDirPath, assetFile),
        );

        copyFile(sourceFilePath, targetFilePath);
      }),
    );
  }
};

await copyAssets();
