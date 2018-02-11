## 开发环境与生产环境的区别

**开发环境**

- NODE_ENV 为 development
- 启用模块热更新（hot module replacement）
- 额外的 webpack-dev-server 配置项，API Proxy 配置项
- 输出 Sourcemap

**生产环境**

- NODE_ENV 为 production
- 将 React、jQuery 等常用库设置为 external，直接采用 CDN 线上的版本
- 样式源文件（如 css、less、scss 等）需要通过 ExtractTextPlugin 独立抽取成 css 文件
- 启用 post-css
- 启用 optimize-minimize（如 uglify 等）
- 中大型的商业网站生产环境下，是绝对不能有 console.log() 的，所以要为 babel 配置 Remove console transform

> 这里需要说明的是因为开发环境下启用了 hot module replacement，为了让样式源文件的修改也同样能被热替换，不能使用 ExtractTextPlugin，而转为随 JS Bundle 一起输出。

