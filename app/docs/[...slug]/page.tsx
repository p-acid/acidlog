import { Metadata } from "next";
import { notFound } from "next/navigation";

import { allDocs } from "@/.contentlayer/generated";

import CategoryIcon from "@/components/category-icon";
import { Mdx } from "@/components/mdx-components";
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
      {doc.category ? (
        <CategoryIcon
          category={doc.category}
          className="p-[10px] mb-6 rounded-xl"
          width={54}
          height={54}
        />
      ) : null}

      <h1 className="mb-3">{doc.title}</h1>

      {doc.description && (
        <p className="text-lg mt-0 text-zinc-700 dark:text-zinc-300 font-normal">
          {doc.description}
        </p>
      )}

      {doc.thumbnail && (
        <Image
          className="w-full max-h-[400px] object-cover"
          src={`${base}/${doc.thumbnail}`}
          alt="thumbnail"
          width={680}
          height={400}
        />
      )}

      <Mdx base={base} code={doc.body.code} />
    </article>
  );
}
