import { allPosts } from "@/.contentlayer/generated";
import CategoryIcon from "@/components/category-icon";

import Link from "next/link";

export default function Home() {
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  return (
    <main className="prose prose-emerald dark:prose-invert">
      <h1 className="pt-6">Post</h1>

      <div className="flex flex-col gap-10 pt-6">
        {posts.map((post) => (
          <article
            key={post._id}
            className="flex items-center gap-6 max-sm:gap-4 max-sm:flex-col max-sm:items-start"
          >
            <CategoryIcon category={post.category} />

            <Link className="no-underline" href={post.slug}>
              <h2 className="w-fit animate-underline mb-1 my-0">
                {post.title}
              </h2>
              {post.description && <p className="mb-0">{post.description}</p>}
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
