import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";
import type { Element } from "hast";
import { h } from "hastscript";

/**
 * A rehype plugin that wraps standalone images in a lightbox-friendly anchor
 * that works with Astro's image optimization
 */
export const rehypeLightbox: RehypePlugin = ({
    lightboxClass = "lightbox",
    excludeClass = "no-lightbox",
    imageTag = "lightbox-image",
} = {}) => {
    return (tree) => {
        // Find all images and process them
        visit(tree, "element", (node: Element, index, parent) => {
            // Only process img elements
            if (node.tagName !== "img") return;
            
            // Tag all images for potential post-processing
            if (!node.properties) node.properties = {};
            if (!node.properties.className) {
                node.properties.className = [imageTag];
            } else if (Array.isArray(node.properties.className)) {
                (node.properties.className as string[]).push(imageTag);
            }
            
            // Skip if the image is already inside a link
            if (parent && 'tagName' in parent && parent.tagName === "a") return;
            
            // Skip if the image has the exclude class
            const nodeClasses = (node.properties?.className || []) as string[];
            if (nodeClasses.includes(excludeClass)) return;
            
            // Store original src as a data attribute
            // This allows client-side code to use the final optimized URL
            const imgSrc = node.properties?.src as string;
            if (!imgSrc) return;
            node.properties["data-original-src"] = imgSrc;
            
            // Get alt text for captions
            const imgAlt = node.properties?.alt as string;
            
            // Create the wrapper div
            const wrapperDiv = h("div", { style: "display:block;margin-bottom:1rem;" });
            
            // Create the anchor element with lightbox class
            // Use a special href format that our client-side code will process
            const anchor = h("a", { 
                href: imgSrc,
                class: lightboxClass,
                "data-caption": imgAlt || "",
                "data-src": imgSrc,
                "data-lightbox": "true",
            });
            
            // Add cursor style to image
            if (!node.properties.style) node.properties.style = "";
            node.properties.style += "cursor:zoom-in;";
            
            // Replace the image with our new structure: div > a > img
            anchor.children = [node];
            wrapperDiv.children = [anchor];
            
            // Replace the original node with our wrapper structure
            if (parent && index !== undefined) {
                parent.children.splice(index, 1, wrapperDiv);
            }
        });
    };
};
