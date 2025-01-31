import { contentPaths } from "@/shared/constants/contents";
import {
  NextGenerateMetadata,
  NextGenerateStaticParams,
} from "@/shared/libs/nextjs";
import { getMetadatas } from "@/shared/utils/contents";
import { PostContentsPageParams } from "../types/page";

export const generateStaticParams: NextGenerateStaticParams<
  PostContentsPageParams
> = async () => {
  const contents = getMetadatas(contentPaths.posts);
  return contents.map(({ slug }) => ({ slug }));
};

export const generateMetadata: NextGenerateMetadata<
  PostContentsPageParams
> = async ({ params }) => {
  const { slug } = await params;

  const metadata = getMetadatas(contentPaths.posts).find(
    (metadata) => metadata.slug === slug,
  );

  if (!metadata) {
    return {};
  }

  return { title: metadata.title, description: metadata.description };
};
