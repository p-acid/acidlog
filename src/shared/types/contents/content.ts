import { FunctionComponent } from "react";

export interface Content<F extends Record<string, unknown>> {
  frontmatter: F;
  MDX: FunctionComponent;
}

export type FrontmatterBase = {
  title: string;
  description: string;
  tags: string[];
};
