import { Metadata } from "next";
import { notFound } from "next/navigation";

import { allDocs } from "@/.contentlayer/generated";

import { Mdx } from "@/components/mdx-components";
import MdxImage from "@/components/mdx-image";
import { Source } from "@/lib/route";
import Image from "next/image";

interface DocProps {
  params: {
    slug: string[];
  };
}

async function getDocFromParams(params: DocProps["params"]) {
  const slug = params?.slug?.join("/");
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    null;
  }

  return doc;
}

export async function generateMetadata({
  params,
}: DocProps): Promise<Metadata> {
  const doc = await getDocFromParams(params);

  if (!doc) {
    return {};
  }

  return {
    title: `Samuel's DevLog : ${doc.title}`,
    description: doc.description,
  };
}

export async function generateStaticParams(): Promise<DocProps["params"][]> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

export default async function DocPage({ params }: DocProps) {
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  const base = `${Source.Image.Docs}/${doc.slugAsParams}`;

  return (
    <article className="py-6 prose prose-emerald dark:prose-invert">
      <h1 className="mb-3">{doc.title}</h1>

      {doc.description && (
        <p className="text-lg mt-0 text-zinc-700 dark:text-zinc-300 font-normal">
          {doc.description}
        </p>
      )}

      <Mdx
        code={doc.body.code}
        components={{
          Image: (props) => <MdxImage base={base} {...props} />,
        }}
      />
    </article>
  );
}
