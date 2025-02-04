"use client";

import Link from "next/link";

import { navigationRoutes } from "@/shared/constants/page-routes";
import { cn } from "@/shared/utils/cn";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-5">
      {navigationRoutes.map(({ text, path }) => (
        <Link
          key={path}
          href={path}
          className={cn("text-base text-zinc-100 hover:underline", {
            underline: pathname === path,
          })}
        >
          {text}
        </Link>
      ))}
    </nav>
  );
};
