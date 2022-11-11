// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

const { MODE } = import.meta.env;
export const isDev = MODE === 'development';
export const isProd = MODE === 'production';

export const SITE_TITLE = '简单博客';
export const SITE_DESCRIPTION = '花径不曾缘客扫，蓬门今始为君开!';

// If any images in article, then show the first on the top.
export const showArticleHeroImage = false

// 注意最后的main为当前所在分支
export const githubURL = 'https://github.com/npmrun/pure-blog/edit/main'
export const githubNewURL = 'https://github.com/npmrun/pure-blog/new/main'