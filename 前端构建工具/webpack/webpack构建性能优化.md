

# webpack构建性能优化

### 一、选择合适的 Devtool 版本

**devtool配置决定了在构建过程中怎样生成 sourceMap 文件。**

- 通常来说**eval的性能最高**，但是不能生成的 sourceMap 文件解析出来的代码，**和源代码差异较大**。
- **source-map 的性能较差，但是可以生成原始版本的代码。** 
- 在大多数 Development 场景下 **cheap-module-eval-source-map 是最佳的选择**。



### 二、Build Cache

Webpack 和一些 **Plugin/Loader** 都有 Cache 选项**。开启 Cache 选项，有利用提高构建性能**。

使用 babel-loader 的时候开启 **cacheDirectory 选项**，会较为明显的提升构建速度。

最好配置一下include，不用去一一查找目录。

> module: {
>
> ​    rules: [{
>
> ​        test: /\.js$/,
>
> ​        use: ['babel-loader?cacheDirectory'],
>
> ​        include: path.join(__dirname, 'app')
>
> ​    }]
>
> }

### 三、减少代码体积

- 使用 CommonsChunksPlugin **提取多个 chunk 之间的通用模块，减少总体的代码体积。**
- **把部分依赖（比较大的库之类的）转移到 CDN 上，避免在每次编译过程中都由 Webpack 处理。**
- 对于支持**局部引入的类库**，在开发的过程中使用**局部引入**的方式，避免引入无用的文件。

比如 lodash（类underscore）就支持部分引入：

> import isArray from 'lodash/isArray';



#### 使用第三方 plugin，在编译过程中进行体积分析，并且以图表方式输出：

**代码大小分析工具：推荐使用 webpack-bundle-analyzer。**

```
1、先安装
npm install --save-dev webpack-bundle-analyzer

2、在webpack.config.js中配置：
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
plugins: [
	new BundleAnalyzerPlugin(
           {
              analyzerMode: 'server',
              analyzerHost: '127.0.0.1',
              analyzerPort: 8889,
              reportFilename: 'report.html',
              defaultSizes: 'parsed',
              openAnalyzer: true,
              generateStatsFile: false,
              statsFilename: 'stats.json',
              statsOptions: null,
              logLevel: 'info'
            }
    ),
]

3、在package.json的scripts里加入下面这句话，就可以npm run build之后看到webpack-bundle-analyzer的效果：(设置两个全局编译变量，global)
"analyz": "NODE_ENV=production npm_config_report=true npm run build"
```

### 四、减少目录检索范围

在使用 loader 的时候，**通过指定 exclude 和 incude 选项，减少 loader 遍历的目录范围**，从而加快 Webpack 编译速度。

比如指定 babel-loader 只处理业务代码：

> {
>
>    test: /\.js$/,
>
>    use: ['babel-loader'],
>
>    include: path.join(__dirname, 'app')
>
> }

### 五、减少检索路径

**resolve.alias 可以配置 webpack 模块解析的别名，对于比较深的解析路径，可以对其配置 alias. 可以提升 webpack 的构建速度。**

创建 `import` 或 `require` 的别名，**来确保模块引入变得更简单**。例如，一些位于 `src/` 文件夹下的常用模块：

```
alias: {
  Utilities: path.resolve(__dirname, 'src/utilities/'),
  Templates: path.resolve(__dirname, 'src/templates/')
}
```

现在，替换「在导入时使用相对路径」这种方式，就像这样：

```
import Utility from '../../utilities/utility';

```

你可以这样使用别名：

```
import Utility from 'Utilities/utility';

```

也可以在给定对象的键后的末尾添加 `$`，以表示精准匹配：

```
alias: {
  xyz$: path.resolve(__dirname, 'path/to/file.js')
}

```

这将产生以下结果：

```
import Test1 from 'xyz'; // 成功，file.js 被解析和导入。
import Test2 from 'xyz/file.js'; // 错误，/path/to/file.js/file.js 是无效的
```

下面的表格展示了许多情况：

| `别名：`                              | `import "xyz"`                        | `import "xyz/file.js"`              |
| ---------------------------------- | ------------------------------------- | ----------------------------------- |
| `{}`                               | `/abc/node_modules/xyz/index.js`      | `/abc/node_modules/xyz/file.js`     |
| `{ xyz: "/abs/path/to/file.js" }`  | `/abs/path/to/file.js`                | error                               |
| `{ xyz$: "/abs/path/to/file.js" }` | `/abs/path/to/file.js`                | `/abc/node_modules/xyz/file.js`     |
| `{ xyz: "./dir/file.js" }`         | `/abc/dir/file.js`                    | error                               |
| `{ xyz$: "./dir/file.js" }`        | `/abc/dir/file.js`                    | `/abc/node_modules/xyz/file.js`     |
| `{ xyz: "/some/dir" }`             | `/some/dir/index.js`                  | `/some/dir/file.js`                 |
| `{ xyz$: "/some/dir" }`            | `/some/dir/index.js`                  | `/abc/node_modules/xyz/file.js`     |
| `{ xyz: "./dir" }`                 | `/abc/dir/index.js`                   | `/abc/dir/file.js`                  |
| **`{ xyz: "modu" }`**              | **`/abc/node_modules/modu/index.js`** | `/abc/node_modules/modu/file.js`    |
| `{ xyz$: "modu" }`                 | `/abc/node_modules/modu/index.js`     | `/abc/node_modules/xyz/file.js`     |
| `{ xyz: "modu/some/file.js" }`     | `/abc/node_modules/modu/some/file.js` | error                               |
| `{ xyz: "modu/dir" }`              | `/abc/node_modules/modu/dir/index.js` | `/abc/node_modules/dir/file.js`     |
| `{ xyz: "xyz/dir" }`               | `/abc/node_modules/xyz/dir/index.js`  | `/abc/node_modules/xyz/dir/file.js` |
| `{ xyz$: "xyz/dir" }`              | `/abc/node_modules/xyz/dir/index.js`  | `/abc/node_modules/xyz/file.js`     |

如果在 `package.json` 中定义，`index.js` 可能会被解析为另一个文件。

`/abc/node_modules` 也可能在 `/node_modules` 中解析。

### 六、使用 DllPlugin/DllReferencePlugin 进行预先构建

Webpack 的 DllPlugin 和 DllReferencePlugin 是在**新版本中推出的 Plugin**，**其思路就是把改变频率比较小的第三方库等依赖单独打包构建，在打包整个项目的时候，如果解析到了通过 Dll 形式进行打包的依赖，会在正常的打包过程中跳过，同时把对这些依赖的引入导入到 Dll 模块上去。** 这样会大大提升在对业务代码进行打包时候的速度。

1. 新建一个单独的 webpack 配置文件，比如 webpack.dll.config.js
2. 在这个配置文件中，**使用 webpack DllPlugin 生成 manifest.json 文件和 Dll 模块文件**。也可以引入诸如 uglifyPlugin 对第三方依赖进行压缩等处理。

> import path from 'path';
>
> import pkg from './package.json';
>
> import webpack from 'webpack';
>
> var vendorPackages = Object.keys(pkg.dependencies);
>
> const config = {
>
> entry: {
>
> ​     vendor: vendorPackages
>
> },
>
> output: {
>
> ​     filename: 'dll.[name].js',
>
> ​     path: path.resolve(__dirname, 'build', 'dll'),
>
> ​     library: '[name]'
>
> },
>
> plugins: [
>
> ​     new webpack.DllPlugin({
>
> ​           context: __dirname,
>
> ​           name: "[name]_[hash]",
>
> ​           path: path.join(__dirname, "manifest.json"),
>
> ​     }),
>
> ​     new webpack.optimize.UglifyJsPlugin({
>
> ​           sourceMap: true,
>
> ​           minimize: true,
>
> ​           cache: true,
>
> ​           parallel: true
>
> ​       }),
>
> ​     ]
>
> }
>
> export default config;

3. 在正常的 webpack 配置文件中，**使用 webpack DllReferencePlugin 解析上一步生成的 manifest.json**

> new webpack.DllReferencePlugin({
>
> ​        context: path.join(__dirname),
>
> ​        manifest: require('./manifest.json')
>
> })

在具体的使用过成中， 在 Dll 中包含的依赖没有变化的场景下，**可以先执行单次 webpack –config webpack.dll.config.js。然后可以多次执行业务代码的构建过程。由于把第三方依赖进行了剥离，业务代码的构建会快很多。**

### 七、分离第三方依赖

> 为减少 rebuild 的时间, 我们可以分离第三方依赖, 在项目启动之前, 将其单独打包和引入。

### 八、多进程构建

Webpack的构建过程是单进程的, 利用 HappyPack 可让 loader 对文件进行多进程处理。在业务文件依赖越多和复杂的情况下, HappyPack 对 Webpack 构建效率的提升会越明显。

### 九、提取公共的依赖模块

无论是**单页还是多页应用**, 在生产环境下, 通常都会利用 CommonsChunkPlugin 插件来提供公共的依赖模块:

> new webpack.optimize.CommonsChunkPlugin({
>
> ​    name: "vendor",
>
> ​    minChunks: ({resource}) => {
>
> ​    	resource &&
>
> ​    	resource.indexOf('node_modules') &&
>
> ​    	resource.match(/.js$/)
>
> ​    }
>
> }),

这种方式会导致两个问题:

- 业务越复杂, 三方依赖会越多, vendor 包会越大
- 没有隔离业务路由组件, 所有的路由都有可能会去加载 vendor, 但并不是所有的路由组件都依赖 node_modules 下的所有模块

所以, 上述提取公共依赖的方式不可取. 我们应该去分析业务依赖和路由, 尽可能将所有路由组件的公共依赖提取出来:*（也就是把需要的提取出来，不是公共的就不要管了，都放在一个文件下面只有一个地方使用，完全没必要）。*

> entry: {
>
> ​    app: path.resolve(__dirname, '../src/page/index.js'),
>
> ​    vendor: [
>
> ​        'vue', 'vuex', 'vue-router', 'vuex-router-sync', 'babel-polyfill',
>
> ​        'axios', '....'
>
> ​    ]
>
> },
>
>  
>
> new webpack.optimize.CommonsChunkPlugin({
>
> ​    name: "vendor",
>
> ​    filename: "vendor.js"
>
> }),

###  十、资源混淆和压缩

Webpack提供的 UglifyJS 插件由于采用单线程压缩, 速度比较慢,

**可以使用 Parallel 插件进行优化**:

> let ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
>
> let os = require('os');
>
> new ParallelUglifyPlugin({
>
> ​    workerCount: os.cpus().length,
>
> ​    cacheDir: '.cache/',
>
> ​    uglifyJS: {
>
> ​        compress: {
>
> ​            warnings: false,
>
> ​            drop_debugger: true,
>
> ​            drop_console: true
>
> ​        },
>
> ​        comments: false,
>
> ​        sourceMap: true,
>
> ​        mangle: true
>
> ​    }
>
> })

**Gzip 压缩**

在生产环境下, 如果想进一步减小 bundle 文件的大小, 可以使用 Gzip 压缩。



