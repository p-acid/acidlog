import {
  DocumentTypeDef,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";
import rehypePrettyCode, {
  Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";

const computedFields: DocumentTypeDef<
  "Page" | "Post" | "Docs"
>["computedFields"] = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

const rehypeOptions: RehypePrettyCodeOptions = {
  theme: "material-theme-ocean",
  keepBackground: true,
};

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields,
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    thumbnail: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
  },
  computedFields,
}));

export const Docs = defineDocumentType(() => ({
  name: "Docs",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    category: {
      type: "enum",
      options: ["nodejs"],
    },
    date: {
      type: "date",
      required: true,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page, Docs],
  mdx: {
    rehypePlugins: [[rehypePrettyCode, rehypeOptions]],
  },
});
