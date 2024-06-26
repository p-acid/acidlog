import { Metadata } from "next";
import { notFound } from "next/navigation";

import { allPosts } from "@/.contentlayer/generated";

import { Mdx } from "@/components/mdx-components";

import CategoryIcon from "@/components/category-icon";
import { Source } from "@/lib/route";
import Image from "next/image";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: `Samuel's DevLog : ${post.title}`,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const base = `${Source.Image.Post}/${post.slugAsParams}`;

  return (
    <article className="py-6 prose prose-emerald dark:prose-invert">
      {post.category ? (
        <CategoryIcon
          category={post.category}
          className="p-[10px] mb-6 rounded-xl"
          width={54}
          height={54}
        />
      ) : null}

      <h1 className="mb-3">{post.title}</h1>
      {post.description && (
        <p className="text-lg mt-0 text-zinc-700 dark:text-zinc-300 font-normal">
          {post.description}
        </p>
      )}
      {post.thumbnail && (
        <Image
          className="w-full max-h-[400px] object-cover"
          src={`${base}/${post.thumbnail}`}
          alt="thumbnail"
          width={680}
          height={400}
        />
      )}

      <Mdx base={base} code={post.body.code} />
    </article>
  );
}
