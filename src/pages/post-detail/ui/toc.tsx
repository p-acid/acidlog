import { TableOfContents } from "@/shared/types/contents";
import { cn } from "@/shared/utils/cn";
import Link from "next/link";

interface TocProps {
  toc: TableOfContents;
}

export const Toc = ({ toc }: TocProps) => {
  return (
    <aside className="absolute left-[calc(100%_+_32px)] h-full w-full max-xl:hidden">
      <ul className="sticky top-40 my-0 w-full max-w-72 border-l border-slate-700 pl-5">
        {toc.map(({ id, text, depth }, index) => {
          return (
            <li
              key={`${id}-${index}`}
              className={cn("my-1 list-none pl-0", {
                [DEPTH_SPACING[depth]]: !!DEPTH_SPACING[depth],
              })}
            >
              <Link
                href={`#${id}`}
                className="font-norma break-keep text-sm text-zinc-100 no-underline hover:underline"
              >
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

const DEPTH_SPACING: Record<number, string> = {
  3: "pl-4",
  4: "pl-8",
};
