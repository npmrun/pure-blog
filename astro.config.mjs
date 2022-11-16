import { defineConfig } from 'astro/config';
// import mdx from '@astrojs/mdx';
import prefetch from '@astrojs/prefetch';
import path from 'path';
import remarkBlock from './plugins/remark-block.mjs';
import Directive from 'remark-directive';
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://astro.build/config
export default defineConfig({
  site: 'https://pure-blog.netlify.app/',
  markdown: {
    syntaxHighlight: 'prism',
    extendDefaultPlugins: true,
    remarkPlugins: [Directive, [remarkBlock, {}]],
  },
  integrations: [
    prefetch({
      selector: "a[href^='/post']",
      throttle: 3
    }),
    sitemap(),
    robotsTxt(),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ` @import "@blog/styles/_global.scss"; `,
        },
      },
    },
    ssr: {
      external: ['svgo'],
    },
    resolve: {
      alias: {
        '@pure': path.resolve('../pure'),
        '@root': path.resolve('./'),
        '@blog': path.resolve('./src'),
        '#': path.resolve('./typings'),
      },
    },
    plugins: [
        viteStaticCopy({
            targets: [
              {
                src: 'article_static/**',
                dest: ''
              }
            ]
          })
    ],
  },
});
