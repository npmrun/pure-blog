import type { Post } from '#/post';
import { isDev } from '@blog/config';
import type { MarkdownInstance } from 'astro';
import { articleDir, articleRoute } from '@blog/share';
import path from 'path';

function co(data: any, cb: any){
    const array = Object.keys(data)
    const result = []
    for(let i = 0; i<array.length; i++){
        let value = cb(data[array[i]])
        if(!value.title){
          continue
        }
        if(!isDev && value.isDraft){
          continue
        }
        let key = array[i].slice(1)
        const tempArr = key.split("/")
        // if(value.isDraft){
        //   tempArr[1] = "草稿"
        // }
        let num = 1 // 从内部文件夹开始
        let curFiles = result;
        while(num<tempArr.length){
            const temp = tempArr[num]
            let cur = curFiles.filter(v=>v.name===temp)
            if(!cur.length){
                // 文件夹
                let v = {
                    name: temp,
                    active: "/post/"+tempArr.slice(1).slice(0, num).join('/').replace(/\.(md|mdx)$/g, ''),
                    path: "/article/"+tempArr.slice(1).slice(0, num).join('/').replace(/\.(md|mdx)$/g, ''),
                    filePath: "/article/"+tempArr.slice(1).slice(0, num).join('/'),
                    data: undefined,
                    children: []
                }
                if(num===tempArr.length-1){
                    // 文件
                    delete v.children
                    v.data = value
                }
                curFiles.push(v)
                curFiles = v.children
            }else{
                let o = cur[0]
                curFiles = o.children
            }
            num++
        }
    }
    return result
}

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
 * 获取文件树
 */
export async function publishedTree() {
  const obj = await import.meta.glob('@root/article/**/*.{md,mdx}', {
    eager: true,
  });
  return co(obj, function (post){
    return single(post)
  })
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
  let filePath = '/src/pages' + post.file.replace(articleRoute, '')
  if (!isRoute) {
    slug = post.file
      .replace(articleDir, '')
      .slice(1)
      .replace(/\.(md|mdx)$/g, '');
    url = '/post/' + slug;
    filePath = post.file.replace(articleDir, '')
  }
  const isDraft = slug.split('/')[0].startsWith('drafts');
  const isPages = !!isRoute;
  return {
    ...post.frontmatter,
    Content: post.Content,
    filePath: filePath,
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
export function getPost(props: any): any {
  const { frontmatter } = props;
  const isMd = !!frontmatter;
  return isMd ? single(props) : props;
}
