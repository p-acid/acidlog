import { Metadata } from "next";
import { notFound } from "next/navigation";

import { allPosts } from "@/.contentlayer/generated";

import { Mdx } from "@/components/mdx-components";
import MdxImage from "@/components/mdx-image";
import { Source } from "@/lib/route";
import Image from "next/image";
import { ReactNode } from "react";

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

      <Mdx
        code={post.body.code}
        components={{
          a: (props) => <a target="_blank" {...props} />,
          Image: (props) => <MdxImage base={base} {...props} />,
          Video: ({ filename, ...rest }) => (
            <video controls width="100%" {...rest}>
              <source src={`${base}/${filename}`} type="video/mp4" />
            </video>
          ),
          Callout: ({
            type = "note",
            children,
          }: {
            type: CalloutType;
            children: ReactNode;
          }) => {
            const { src, background } = CALLOUT_INFOS[type];
            return (
              <div
                className={`flex gap-4 px-6 py-5 rounded-lg my-6 ${background}`}
              >
                <Image
                  className="m-0 mt-[2px] w-6 h-6"
                  src={src}
                  alt="callout_icon"
                  width={24}
                  height={24}
                />
                <div className="callout-content">{children}</div>
              </div>
            );
          },
        }}
      />
    </article>
  );
}

const CALLOUT_INFOS = {
  note: {
    src: "/images/callout-icon/note.png",
    background: "bg-zinc-300 dark:bg-zinc-800",
  },
  info: {
    src: "/images/callout-icon/info.png",
    background: "bg-green-200 dark:bg-green-950",
  },
  warning: {
    src: "/images/callout-icon/warning.png",
    background: "bg-orange-200 dark:bg-yellow-900",
  },
};

type CalloutType = keyof typeof CALLOUT_INFOS;
