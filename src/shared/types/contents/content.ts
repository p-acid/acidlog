import { FunctionComponent } from "react";

export type TableOfContents = {
  id: string;
  text: string;
  depth: number;
}[];

export interface Content<F extends Record<string, unknown>> {
  frontmatter: F;
  MDX: FunctionComponent;
  toc: TableOfContents;
}

export type FrontmatterBase = {
  title: string;
  description: string;
  tags: string[];
};
