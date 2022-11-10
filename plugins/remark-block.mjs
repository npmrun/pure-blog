// https://github.com/remarkjs/remark-directive
// https://github.com/syntax-tree/mdast-util-directive#syntax-tree

import { visit } from 'unist-util-visit';
import { h } from 'hastscript';
import { toString } from 'hast-util-to-string';
import Slugger from 'github-slugger';

const slugs = new Slugger();

export default function calloutsPlugin() {
  return (tree, file) => {
    slugs.reset();

    const images = [];
    visit(tree, 'image', (node) => {
      const name = node.url.split('/').reverse()[0];
      images.push({
        name: name,
        alt: node.alt,
        url: node.url,
      });
    });
    const head = [];
    visit(tree, 'heading', (node) => {
      head.push({
        level: node.depth,
        title: slugs.slug(toString(node)),
      });
    });
    file.data.astro.frontmatter._rawString = file.value;
    file.data.astro.frontmatter._images = images;
    file.data.astro.frontmatter._head = head;

    visit(tree, (node) => {
      if (node.type === 'containerDirective') {
        if (node.name !== 'card') return;
        const data = node.data || (node.data = {});
        const attributes = node.attributes || {};
        node.__handled = true;
        const children =
          node.children.filter((v) => v.name !== 'card-title') || [];
        const cardTitle = node.children.filter(
          (v) => v.type === 'containerDirective' && v.name === 'card-title'
        )[0];
        const isVertical = !!(attributes.id === 'vertical');
        const isCenter = !!(attributes.class === 'center');

        data.hName = 'figure';
        data.hProperties = {
          class: `card ${isVertical ? 'card--vertical' : ''}`,
        };
        node.children = isVertical
          ? [
              {
                type: 'containerDirective',
                __handled: true,
                data: {
                  hName: 'div',
                  hProperties: {
                    class: `card__vertical-container`,
                    style: isCenter
                      ? `display: flex;justify-content: center;align-items: center;`: ''
                  },
                },
                children: [
                  {
                    type: 'containerDirective',
                    __handled: true,
                    data: {
                      hName: 'section',
                      hProperties: {},
                    },
                    children: children,
                  },
                ],
              },
            ]
          : children;
        if (!!cardTitle) {
          node.children.push({
            ...cardTitle,
            __handled: true,
            data: {
              hName: 'figcaption',
            },
          });
        }
      }
    });
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        if (node.__handled) return;
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes);
        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    });
  };
}
