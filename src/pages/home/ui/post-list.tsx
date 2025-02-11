import { pageRoutes } from "@/shared/constants/page-routes";
import { contentsBases } from "@/shared/constants/paths";
import { PostFrontmatter } from "@/shared/types/contents";
import { getContents } from "@/shared/utils/contents";
import { getRelativeDate } from "@/shared/utils/get-relative-date";
import dayjs from "dayjs";
import Link from "next/link";

export const PostList = () => {
  const posts = getContents<PostFrontmatter>({ base: contentsBases.posts });

  const sortedPosts = posts.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));

  return (
    <ul className="space-y-5">
      {sortedPosts.map(({ slug, title, description, date }) => (
        <li key={slug}>
          <Link
            className="flex justify-between gap-4"
            href={`${pageRoutes.posts}/${slug}`}
          >
            <div className="flex flex-col gap-1">
              <p className="w-fit text-base font-medium text-zinc-100 hover:underline">
                {title}
              </p>
              <p className="break-keep text-sm text-zinc-400">{description}</p>
            </div>

            <span className="whitespace-pre text-sm text-zinc-200">
              {getRelativeDate(date)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
