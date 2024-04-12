import { allDocs } from "@/.contentlayer/generated";
import CategoryIcon from "@/components/category-icon";

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
            {doc.category ? <CategoryIcon category={doc.category} /> : null}

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
