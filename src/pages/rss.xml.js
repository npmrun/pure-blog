import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_LANG } from '@blog/config';
import { published } from '@blog/utils';

const posts = await published();

export const get = () => {
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    stylesheet: true,
    customData: `<language>${SITE_LANG || 'en-us'}</language>`,
    site: import.meta.env.SITE,
    items: posts.slice(10).map((post) => ({
      link: post.url,
      title: post.title,
      pubDate: post.pubDate,
      desc: post.description,
    })),
  });
};
