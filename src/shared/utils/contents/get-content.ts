import { contentsBases } from "@/shared/constants/contents";
import { Content, PostFrontmatter } from "@/shared/types/contents";

interface GetContentParams {
  base: (typeof contentsBases)[keyof typeof contentsBases];
  slug: string;
}

export const getContent = async (
  params: GetContentParams,
): Promise<Content<PostFrontmatter>> => {
  const result = await import(
    `/contents/${params.base}/${params.slug}/index.mdx`
  );

  const { frontmatter, default: MDX } = result;

  return { frontmatter, MDX };
};
