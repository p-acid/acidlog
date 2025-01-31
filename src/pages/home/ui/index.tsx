import { contentPaths } from "@/shared/constants/contents";
import { pageRoutes } from "@/shared/constants/page-routes";
import { getMetadatas } from "@/shared/utils/contents";
import Link from "next/link";

export const HomePage = async () => {
  const posts = getMetadatas(contentPaths.posts);

  return (
    <main className="flex min-h-screen flex-col gap-8">
      <h1 className="text-xl font-extrabold">Posts</h1>

      <ul className="space-y-4">
        {posts.map(({ slug, title, description }) => (
          <li key={slug}>
            <Link href={`${pageRoutes.posts}/${slug}`}>
              <p className="text-base font-semibold">{title}</p>
              <p className="text-sm">{description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};
