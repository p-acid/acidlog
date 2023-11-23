import { notFound } from "next/navigation";
import { Metadata } from "next";

import { allPosts } from "@/.contentlayer/generated";

import MdxImage from "@/components/mdx-image";
import { Mdx } from "@/components/mdx-components";
import { Source } from "@/lib/route";

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
    ...post,
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
    <article className="py-6 prose dark:prose-invert">
      <h1 className="mb-2">{post.title}</h1>

      {post.description && (
        <p className="text-lg mt-0 text-zinc-700 dark:text-zinc-200">
          {post.description}
        </p>
      )}

      {post.thumbnail && (
        <MdxImage base={base} fileName={post.thumbnail ?? ""} />
      )}

      <Mdx
        code={post.body.code}
        components={{
          Image: (props) => <MdxImage base={base} {...props} />,
        }}
      />
    </article>
  );
}
