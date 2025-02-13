import { contentsBases } from "@/shared/constants/paths";
import { Content, FrontmatterBase } from "@/shared/types/contents";

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

  const { frontmatter, default: MDX, toc } = result;

  return { frontmatter, MDX, toc };
};
