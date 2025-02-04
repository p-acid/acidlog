import type { MDXComponents } from "mdx/types";

import { Callout, Code, Video } from "@/shared/ui";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props) => <a target="_blank" {...props} />,
    Video,
    Code,
    Callout,
    ...components,
  };
}
