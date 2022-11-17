import { defineConfig } from 'astro/config';
// import mdx from '@astrojs/mdx';
import prefetch from '@astrojs/prefetch';
import path from 'path';
import remarkBlock from './plugins/remark-block.mjs';
import Directive from 'remark-directive';
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import { viteStaticCopy } from 'vite-plugin-static-copy'
import Watcher from 'vite-plugin-watcher'

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
        '@article': path.resolve('../../article'),
        '@root': path.resolve('./'),
        '@blog': path.resolve('./src'),
        '#': path.resolve('./typings'),
      },
    },
    server: {
        fs: {
            // strict: false,
            allow: [path.resolve('../../article')]
        }
    },
    plugins: [
        // Watcher(w => {
        //     // 添加文件进入监听器
        //     w.add(['../../article'])
            
        //     // 监听文件添加
        //     w.on('add', path => {
        //         console.log(path) // 此时文件添加时将输出对应路径
        //     })
        // }),
        viteStaticCopy({
            targets: [
              {
                src: '../../article_static/**',
                dest: ''
              }
            ]
          })
    ],
  },
});
