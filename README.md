# 编程百科

一个简单展示文章的界面，中文排版优先, 反正没人点Star, 自己随意开发.

## 使用

文章可以直接在`article`下写，`article/drafts`目录下的是草稿，不会发布在正式版中，但会显示在开发版中。

需要使用在Github新增或编辑功能的需要在`src/config.ts`自行配置Github相关。

文章可用元数据如下：
```
title: Markdown测试       <!-- 必须，文章标题 -->
pubDate: 2022/5/12        <!-- 发布日期 -->
updatedDate: 2023/01/01   <!-- 修改日期-->
heroImage: ""             <!-- 文章头图 -->
```

> 最好不要取有特殊字符的标题

## 部署
[![](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/npmrun/pure-blog)

## 推荐
推荐Fork之后使用 https://stackblitz.com 写博客，此方式的缺点是图片需要自行上传再粘贴，同时需注意的是未Commit之前，网页一旦刷新，本地的数据就没了，这个需时刻注意。
网速可以的话推荐直接用Github写，别和stackblitz一起用就行，可能会导致stackblitz的不是最新代码而提交不上去。

## Demo
https://pure-blog.netlify.app/

## 是否可支持特性

考虑可能添加的特性，有具体方案的可以提issue。

- [ ] 备份
- [ ] 导出


## 致谢开源项目
- [astro](https://github.com/withastro/astro) 
- [type.css](https://github.com/sofish/typo.css) 
- [heti](https://github.com/sivan/heti)
- [github-slugger](https://github.com/Flet/github-slugger)
- [hast-util-to-string](https://github.com/rehypejs/rehype-minify/tree/main)
- [better-directory-sort](https://www.npmjs.com/package/better-directory-sort)
