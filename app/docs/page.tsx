import { Docs, allDocs } from "@/.contentlayer/generated";
import { Source } from "@/lib/route";
import Image from "next/image";

import Link from "next/link";

export default function Home() {
  const docs = allDocs.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  return (
    <main className="prose prose-emerald dark:prose-invert">
      <h1 className="pt-6">Docs</h1>

      <div className="flex flex-col gap-10 pt-6">
        {docs.map((doc) => (
          <article
            key={doc._id}
            className="flex items-center gap-6 max-sm:gap-4 max-sm:flex-col max-sm:items-start"
          >
            {doc.category ? (
              <Image
                className="p-[6px] bg-zinc-300 rounded-lg my-0"
                src={`${Source.Image.Docs}/category-icon/${
                  CATEGORY_ICON_IMAGE[doc.category]
                }`}
                alt={doc.category}
                width={40}
                height={40}
              />
            ) : null}

            <Link className="no-underline" href={doc.slug}>
              <h2 className="w-fit animate-underline mb-1 my-0">{doc.title}</h2>
              {doc.description && <p className="mb-0">{doc.description}</p>}
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

const CATEGORY_ICON_IMAGE: Record<
  Exclude<Docs["category"], undefined>,
  string
> = {
  nodejs: "nodejs.svg",
};
