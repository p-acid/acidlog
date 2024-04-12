import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

import { Docs } from "@/.contentlayer/generated";
import { Source } from "@/lib/route";

interface CategoryIconProps extends Partial<ImageProps> {
  category: Docs["category"];
}

export default function CategoryIcon({
  className,
  category,
  ...rest
}: CategoryIconProps) {
  return (
    <Image
      className={cn(
        "p-2 bg-zinc-900 rounded-lg my-0 dark:bg-zinc-100",
        className
      )}
      src={`${Source.Image.CategoryIcon}/${
        category ? CategoryIconImage[category] : "default.svg"
      }`}
      alt={category ?? "default-category"}
      width={40}
      height={40}
      {...rest}
    />
  );
}

export const CategoryIconImage: Record<
  Exclude<Docs["category"], undefined>,
  string
> = {
  nodejs: "nodejs.svg",
  git: "git.svg",
  notion: "notion.png",
};
