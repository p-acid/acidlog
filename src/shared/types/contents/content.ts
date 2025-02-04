import { FunctionComponent } from "react";

export interface Content<F extends Record<string, unknown>> {
  frontmatter: F;
  MDX: FunctionComponent;
}
