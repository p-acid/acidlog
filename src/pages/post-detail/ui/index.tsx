import dayjs from "dayjs";

import { contentsBases } from "@/shared/constants/paths";
import { PostFrontmatter } from "@/shared/types/contents";
import { NextPageProps } from "@/shared/types/nextjs";
import { getContent } from "@/shared/utils/contents";

export type PostDetailPageParams = {
  slug: string;
};

export const PostDetailPage = async ({
  params,
}: NextPageProps<PostDetailPageParams>) => {
  const { slug } = await params;

  const { frontmatter, MDX } = await getContent<PostFrontmatter>({
    base: contentsBases.posts,
    slug,
  });

  return (
    <section className="prose prose-invert mt-6 w-full">
      <div className="mb-8 border-b border-zinc-800 pb-6">
        <ul className="mb-6 mt-0 flex list-none gap-2 pl-0">
          {frontmatter.tags.map((tag) => (
            <li
              key={tag}
              className="my-0 rounded-md bg-zinc-800 px-2.5 py-1.5 text-xs"
            >
              {tag}
            </li>
          ))}
        </ul>

        <h1 className="mb-3 text-3xl font-bold">{frontmatter.title}</h1>

        <span className="text-base max-sm:text-sm">
          {dayjs(frontmatter.date).format("YYYY년 MM월 DD일")}
        </span>
      </div>

      <MDX />
    </section>
  );
};
