import { Metadata } from "next";
import { notFound } from "next/navigation";

import { allPages } from "@/.contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import MdxImage from "@/components/mdx-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Source } from "@/lib/route";

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
    title: `Samuel's DevLog : ${page.title}`,
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
          a: (props) => <a target="_blank" {...props} />,
          Image: (props) => <MdxImage base={Source.Image.Page} {...props} />,
          Carousel: ({
            pageName,
            images = [],
          }: {
            pageName: string;
            images: string[];
          }) => (
            <Carousel>
              <CarouselContent>
                {images?.map((fileName) => (
                  <CarouselItem key={fileName}>
                    <MdxImage
                      className="max-h-[500px] object-scale-down"
                      base={`${Source.Image.Page}/${pageName}`}
                      fileName={fileName}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ),
        }}
      />
    </article>
  );
}
