import { defineConfig } from 'astro/config';
// import mdx from '@astrojs/mdx';
import path from 'path';
import remarkBlock from './plugins/remark-block.mjs';
import Directive from 'remark-directive';
 
// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [Directive, [remarkBlock, {}]],
  },
  integrations: [],
  vite: {
    ssr: {
      external: ['svgo'],
    },
    resolve: {
      alias: {
        '@root': path.resolve('./'),
        '@blog': path.resolve('./src'),
        '#': path.resolve('./typings'),
      },
    },
    plugins: [],
  },
});
