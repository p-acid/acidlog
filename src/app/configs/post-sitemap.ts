import dayjs from "dayjs";
import type { MetadataRoute } from "next";

import { contentsBases } from "@/shared/constants/paths";
import { siteUrl } from "@/shared/constants/url";
import { PostFrontmatter } from "@/shared/types/contents";
import { getContents } from "@/shared/utils/contents";

export const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts = getContents<PostFrontmatter>({ base: contentsBases.posts });

  const getPriority = (date: string) => {
    const currentDate = dayjs();
    const targetDate = dayjs(date);
    const diffInMonths = currentDate.diff(targetDate, "month");
    const priority = diffInMonths >= 1 ? 0.7 : 1;

    return priority;
  };

  return posts.map(({ slug, date }) => ({
    url: `${siteUrl}/${slug}`,
    lastModified: date,
    priority: getPriority(date),
  }));
};
