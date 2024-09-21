import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";
import type { Element } from "hast";

export const isRTL = (text: string): boolean => {
  const rtlPattern = /[\u04c7-\u0591\u05D0-\u05EA\u05F0-\u05F4\u0600-\u06FF]/;
  return rtlPattern.test(text);
};

export const rehypeBidi: RehypePlugin = ({
  rtlClassName = "isrtl",
  rtlTags = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "div"],
  listTags = ["ul", "ol"],
} = {}) => {
  return (tree) => {
    visit(tree, "element", (e: Element) => {
      if (
        (rtlTags.includes(e.tagName) &&
          e.children &&
          e.children.some(
            (child) => child.type === "text" && isRTL(child.value)
          )) ||
        (listTags.includes(e.tagName) &&
          e.children &&
          e.children.some(
            (child) =>
              child.type === "element" &&
              child.tagName === "li" &&
              child.children &&
              child.children.some(
                (liChild) => liChild.type === "text" && isRTL(liChild.value)
              )
          ))
      ) {
        e.properties.className =
          (e.properties.className || "") + ` ${rtlClassName}`;
      }
    });
  };
};
