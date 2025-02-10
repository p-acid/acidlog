import { contentsBases } from "@/shared/constants/contents";
import { Content } from "@/shared/types/contents";
import { FrontmatterBase } from "@/shared/types/contents/content";

interface GetContentParams {
  base: (typeof contentsBases)[keyof typeof contentsBases];
  slug: string;
}

export const getContent = async <F extends FrontmatterBase>(
  params: GetContentParams,
): Promise<Content<F>> => {
  const result = await import(
    `/contents/${params.base}/${params.slug}/index.mdx`
  );

  const { frontmatter, default: MDX } = result;

  return { frontmatter, MDX };
};
