import { MarkdownInstance } from 'astro';

export type PostProps = {
  title: string // 文章标题
  slug: string
  desc: string // 文章描述
  author: string // 文章作者
  pubDate: string // 文章创建时间
  updatedDate: string // 文章更新时间
  pubTimestamp: number // 发布文章时间戳
  updatedTimestamp?: number // 更新文章时间戳
  isDraft: boolean // 是否是草稿
  isPages: boolean // 是否是页面路由
  categories: string[] // 分类
  top: boolean // 首页置顶
  hero: string // 文章头图
  heroPosition: 'center' | 'top' | 'bottom' // 文章头图展示部位
  heroHideTitle: boolean // 文章头图中间是否展示文字
  Content: MarkdownInstance<any>['Content'] // 在路由中的md才会存在，是一个展示文档的组件
  postPicture: string
  toc: boolean // 是否开启悬浮标题
  mode?: 'indent' // 首行段落是否缩进
  comment: boolean // 是否可以评论
  theme: 'github' | 'normal' // 是否可以评论
}

export type Post = {
  file: URL
} & PostProps;
