import { defineConfig } from 'astro/config';
// import mdx from '@astrojs/mdx';
import prefetch from '@astrojs/prefetch';
import path from 'path';
import remarkBlock from './plugins/remark-block.mjs';
import Directive from 'remark-directive';
// 尝试是否支持微信浏览器
import legacy from '@vitejs/plugin-legacy'

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
    })
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
        '@root': path.resolve('./'),
        '@blog': path.resolve('./src'),
        '#': path.resolve('./typings'),
      },
    },
    plugins: [
      legacy({
        targets: ['defaults', 'not IE 11']
      })
    ],
  },
});
