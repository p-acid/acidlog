import type { MDXComponents } from "mdx/types";

import { Callout, Code, Video } from "@/shared/ui";
import { ImgHTMLAttributes } from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props) => <a target="_blank" {...props} />,
    img: (props: ImgHTMLAttributes<HTMLImageElement>) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="max-h-[50vh] w-full bg-slate-950 object-contain"
        alt="이미지"
        {...props}
      />
    ),
    Video,
    Code,
    Callout,
    ...components,
  };
}
