import { notFound } from "next/navigation";
import { Metadata } from "next";

import { Mdx } from "@/components/mdx-components";
import MdxImage from "@/components/mdx-image";
import { Source } from "@/lib/route";
import { allPages } from "@/.contentlayer/generated";

interface PageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/");
  const page = allPages.find((page) => page.slugAsParams === slug);

  if (!page) {
    null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <article className="py-6 prose prose-emerald dark:prose-invert">
      <h1>{page.title}</h1>

      {page.description && (
        <p className="text-xl font-semibold">{page.description}</p>
      )}

      <Mdx
        code={page.body.code}
        components={{
          Image: (props) => <MdxImage base={Source.Image.Page} {...props} />,
        }}
      />
    </article>
  );
}
