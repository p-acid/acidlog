import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

import { Docs } from "@/.contentlayer/generated";
import { Source } from "@/lib/route";

type RealCategory = Exclude<Docs["category"], undefined>;

interface CategoryIconProps extends Partial<ImageProps> {
  category: RealCategory;
}

export default function CategoryIcon({
  className,
  category,
  ...rest
}: CategoryIconProps) {
  return (
    <Image
      className={cn(
        "p-2 bg-zinc-700 rounded-lg my-0 dark:bg-zinc-200",
        className
      )}
      src={`${Source.Image.Docs}/category-icon/${CategoryIconImage[category]}`}
      alt={category}
      width={40}
      height={40}
      {...rest}
    />
  );
}

export const CategoryIconImage: Record<RealCategory, string> = {
  nodejs: "nodejs.svg",
};
