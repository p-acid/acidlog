import { allPosts } from "@/.contentlayer/generated";

import Link from "next/link";

export default function Home() {
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  return (
    <main className="prose prose-emerald dark:prose-invert">
      <h1 className="pt-6">Post</h1>

      {posts.map((post) => (
        <article key={post._id}>
          <Link className="no-underline" href={post.slug}>
            <h2 className="w-fit animate-underline mb-1">{post.title}</h2>
          </Link>
          {post.description && <p className="mt-1">{post.description}</p>}
        </article>
      ))}
    </main>
  );
}
