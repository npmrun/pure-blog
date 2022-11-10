import type { Post } from '#/post';
import { isDev } from '@blog/config';
import type { MarkdownInstance } from 'astro';
import { articleDir, articleRoute } from '@blog/share';

/**
 * 获取所有的文章
 */
export async function getPosts() {
  const obj = await import.meta.glob('@root/article/**/*.{md,mdx}', {
    eager: true,
  });
  return Object.values(obj) as MarkdownInstance<any>[];
}

/**
 * 处理单个文章信息
 */
export function single(post: MarkdownInstance<any>): Post {
  const isRoute = post.file.startsWith(articleRoute);
  let slug = post.file
    .replace(articleRoute, '')
    .slice(1)
    .replace(/\.(md|mdx)$/g, '');
  let url = post.url;
  if (!isRoute) {
    slug = post.file
      .replace(articleDir, '')
      .slice(1)
      .replace(/\.(md|mdx)$/g, '');
    url = '/post/' + slug;
  }
  const isDraft = slug.split('/')[0].startsWith('drafts');
  const isPages = !!isRoute;
  return {
    ...post.frontmatter,
    Content: post.Content,
    slug: slug,
    url, // 如果在src/pages目录外，此时url为undefined,那么就使用上面的slug手动拼接路由
    isDraft,
    isPages,
    pubTimestamp: !!post.frontmatter.pubDate
      ? new Date(post.frontmatter.pubDate).valueOf()
      : 0,
    updatedTimestamp: !!post.frontmatter.updatedDate
      ? new Date(post.frontmatter.updatedDate).valueOf()
      : 0,
  };
}

/**
 * 处理文章信息
 */
export async function published(): Promise<Post[]> {
  const posts = await getPosts();
  let allPosts = posts
    .filter((post) => post.frontmatter.title)
    .map((post) => single(post))
    .filter((post) => isDev || !post.isDraft);
  allPosts = allPosts.sort((a, b) => {
    if (b.pubTimestamp && a.pubTimestamp) {
      return b.pubTimestamp - a.pubTimestamp;
    } else {
      return -1;
    }
  });
  for (let i = 0; i < allPosts.length; i++) {
    const post = allPosts[i];
    if (post.top) {
      const delOne = allPosts.splice(i, 1);
      allPosts.unshift(delOne[0]);
    }
  }
  return allPosts;
}

/**
 * 获取Astro.props的文章数据，判断是不是解析过了
 */
export function getPost(props: any): Post {
  const { content, frontmatter } = props;
  const isMd = !!frontmatter;
  return isMd ? single(props) : content;
}
