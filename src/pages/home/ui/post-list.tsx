import { contentsBases } from "@/shared/constants/contents";
import { pageRoutes } from "@/shared/constants/page-routes";
import { getContents } from "@/shared/utils/contents";
import { getRelativeDate } from "@/shared/utils/get-relative-date";
import Link from "next/link";

export const PostList = () => {
  const posts = getContents({ base: contentsBases.posts });

  return (
    <ul className="space-y-5">
      {posts.map(({ slug, title, description, date }) => (
        <li key={slug}>
          <Link
            className="flex justify-between"
            href={`${pageRoutes.posts}/${slug}`}
          >
            <div className="flex flex-col gap-1">
              <p className="w-fit text-base font-medium text-zinc-100 hover:underline">
                {title}
              </p>
              <p className="text-sm text-zinc-400">{description}</p>
            </div>

            <span className="text-sm text-zinc-200">
              {getRelativeDate(date)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
