import { useMDXComponent } from "next-contentlayer/hooks";
import type { MDXComponents } from "mdx/types";

interface MdxProps {
  code: string;
  components?: MDXComponents;
}

export function Mdx({ code, components }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
