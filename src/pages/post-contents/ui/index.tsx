import { contentPaths } from "@/shared/constants/contents";
import { NextPageProps } from "@/shared/libs/nextjs";
import { getContents } from "@/shared/utils/contents";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PostContentsPageParams } from "../types/page";

// TODO : 커스텀 컴포넌트 추가 필요

export const PostContentsPage = async ({
  params,
}: NextPageProps<PostContentsPageParams>) => {
  const { slug } = await params;

  const contents = getContents(contentPaths.posts, slug);

  return (
    <div>
      <h1>Page Component</h1>
      <MDXRemote source={contents.content} />
    </div>
  );
};
