import { visit } from "unist-util-visit";

const remarkPublicAssets = () => {
  return (tree, file) => {
    const path = file.history.at(0).split("/").at(-2);

    visit(tree, "image", (node) => {
      node.url = `/assets/posts/${path}/${node.url}`;
    });

    visit(tree, (node) => {
      if (node.name === "Video") {
        node.attributes = node.attributes.map((attribute) => {
          if (attribute.name === "src") {
            return {
              ...attribute,
              value: `/assets/posts/${path}/${attribute.value}`,
            };
          }

          return attribute;
        });
      }
    });
  };
};

export default remarkPublicAssets;
