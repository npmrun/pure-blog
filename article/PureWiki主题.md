---
title: PureWiki主题
description: 一个简单的主题
heroImage: https://tva1.sinaimg.cn/large/005QfeMjgy1h8fzntjxv3j32h41bz4qp.jpg
heroPosition: top
top: true
pubDate: 2022/11/15 16:05:35
updatedDate: 2022/11/15 16:05:56
---

[TOC]

对于该主题，主要目的是为可展示文章的，提供一个树状菜单，可以简单当作一个界面纯净的Wiki。

界面总感觉有点怪怪的。

## 特性

1. 文章可用元输入如下（有一些其他的，可以自己看代码，tpyings尚不完善，得看布局代码）
    ```
    title: Markdown测试       <!-- 必须，文章标题 -->
    description: 描述         <!-- 描述，可用作seo，文章中暂未展示 -->
    pubDate: 2022/5/12        <!-- 发布日期 -->
    updatedDate: 2023/01/01   <!-- 修改日期-->
    heroImage: ""             <!-- 文章头图 -->
    ```

2. 使用如下代码，会被标题替换，支持三级标题
    ```
    [TOC]
    ```
3. 内部已支持了`markdown`命令转化为`html`了
    ```
    :abbr[提示]{title="提示"}
    ```
    效果：:abbr[提示]{title="提示"}
4. 支持面板
    ```
    ::::card
    横排排版演示
    :::card-title
    横排排版演示
    :::
    ::::
    ```
    横排已经可以了，竖排感觉也没啥用。
5. 可配置头图为文章中的第一张图片，只需要将配置的`showArticleHeroImage`设置为true即可。
6. 文章提供了直接在github编辑功能，自行配置即可
7. 增加`mermaid`渲染流程图时序图（暂时提供两个）
8. 增加`mathjax`渲染公式
9. 提供`iframe`命令和`iframec`命令  
    `iframe`为收缩框默认打开  
    `iframec`为收缩框默认关闭
    ```
    ::iframe[流程图Demo]{url=/demo/flowchart.html}
    ::iframec[流程图Demo]{url=/demo/flowchart.html}
    ```
    目前版本能够展示url的网页,效果如下：
    ::iframe[流程图Demo]{url=/demo/flowchart.html}
    ::iframec[时序图]{url=/demo/sequence-diagrams.html}

    ::iframe[BiliBili]{url="//player.bilibili.com/player.html?aid=690345969&bvid=BV1N24y117QE&cid=895902728&page=1"}

10. 提供`demo`命令

    ```
    :::demo
    <div>
        <div>before content<div>
        text
        <div>after content<div>
    </div>
    :::
    ```
    效果：
    :::demo
    <div>
        <div>before content<div>
        text
        <div>after content<div>
    </div>
    :::
    
    ```
    ::demo{path="/demo/flowchart.html"}
    ```
    效果：
    ::demo{path="/demo/flowchart.html"}


## 截图欣赏

![图 1](/article/Pure%20Wiki%20%E5%BC%80%E5%8F%91%E8%AE%A1%E5%88%92_2022-11-15_15-16-09-33.png)  
![图 2](/article/Pure%20Wiki%20%E5%BC%80%E5%8F%91%E8%AE%A1%E5%88%92_2022-11-15_15-16-09-58.png)  

 
## 开发计划

- [x] 图片alt显示
- [ ] 置顶与收藏（类似notion）
- [ ] 上一页与下一页
- [ ] 分类与标签
- [ ] 专题
- [ ] 内链文章
- [ ] 导出
- [ ] 备份
- [ ] 收藏