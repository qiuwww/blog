

# PostCss插件

CSS 规范在浏览器兼容性方面一直存在各种各样的问题。不同浏览器在 CSS 规范的实现方面的进度也存在很大差异。

### 介绍

PostCSS 本身是一个功能比较单一的工具。它提供了一种方式用 JavaScript 代码来处理 CSS。它负责把 CSS 代码解析成抽象语法树结构（Abstract Syntax Tree，AST），再交由插件来进行处理。插件基于 CSS 代码的 AST 所能进行的操作是多种多样的，比如可以支持变量和混入（mixin），增加浏览器相关的声明前缀，或是把使用将来的 CSS 规范的样式规则转译（transpile）成当前的 CSS 规范支持的格式。从这个角度来说，PostCSS 的强大之处在于其不断发展的插件体系。目前 PostCSS 已经有 200 多个功能各异的插件。开发人员也可以根据项目的需要，开发出自己的 PostCSS 插件。

**PostCSS 的主要功能只有两个**：第一个就是前面提到的把 CSS 解析成 JavaScript 可以操作的 AST，第二个就是调用插件来处理 AST 并得到结果。

### 使用示例

##### 在 Webpack 中使用 PostCSS 插件

```
var path = require('path');
module.exports = {
    context: path.join(__dirname, 'app'),
    entry: './app',
    output: {
    	path: path.join(__dirname, 'dist'),
    	filename: 'bundle.js'
    },
    module: {
    	loaders: [{
    		test:   /\.css$/,
    		// 如果使用了ExtractTextPlugin就需要使用
    		// loader:  ExtractTextPlugin.extract('style', 'css!postcss')
    		// 否则
    		loader: "style-loader!css-loader!postcss-loader"
    	}]
    },
    postcss: function () {
    	return [require('autoprefixer')];
    }
} 
```

### 常用插件

- **Autoprefixer**

  - Autoprefixer 是一个流行的 PostCSS 插件，其作用是为 CSS 中的属性添加浏览器特定的前缀。为了兼容不同浏览器的不同版本，在编写 CSS 样式规则声明时通常需要添加额外的带前缀的属性。这是一项**繁琐而无趣的工作**。Autoprefixer 可以自动的完成这项工作。Autoprefixer 可以根据需要指定支持的浏览器类型和版本，自动添加所需的带前缀的属性声明。开发人员在编写 CSS 时只需要使用 CSS 规范中的标准属性名即可。**Autoprefixer 可以配置需要支持的浏览器。**

  ```
  require('autoprefixer')({
      browsers: ['last 2 versions']
      // 这里推荐使用browserslist来设置要兼容的浏览器版本，具体参考这里
      // https://github.com/ai/browserslist#queries
  })
  ```

  - Autoprefixer 除了添加所需要的属性名称前缀之外，还可以移除 CSS 代码中冗余的属性名称前缀。遗留 CSS 代码中可能包含由开发人员手动添加的旧版本的浏览器所支持的带前缀的属性名称。Autoprefixer 默认情况下会移除这些冗余的前缀。可以通过配置对象中的 **remove 属性**来配置该行为。

- **cssnext**
  cssnext 插件允许开发人员在当前的项目中使用 CSS 将来版本中可能会加入的新特性。cssnext 负责把这些新特性转译成当前浏览器中可以使用的语法。从实现角度来说，cssnext 是一系列与 CSS 将来版本相关的 PostCSS 插件的组合。比如，cssnext 中已经包含了对 Autoprefixer 的使用，因此使用了 cssnext 就不再需要使用 Autoprefixer。

- **自定义属性和变量**

  - CSS 的层叠变量的自定义属性规范（CSS Custom Properties for Cascading Variables）允许在 CSS 中定义属性并在样式规则中作为变量来使用它们。自定义属性的名称以“--”开头。当声明了自定义属性之后，可以在样式规则中使用“var()”函数来引用。

  ```
  :root {
   --text-color: black;
  }
   
  body {
   color: var(--text-color);
  }
  ```

  - CSS 扩展规范（CSS Extensions）中允许创建自定义选择器，比如可以对所有的标题元素（h1 到 h6）创建一个自定义选择器并应用样式。**通过“@custom-selector”来定义自定义选择器。**在[代码清单](https://www.ibm.com/developerworks/cn/web/1604-postcss-css/index.html#_清单 9. 自定义选择器)[ 9 ](https://www.ibm.com/developerworks/cn/web/1604-postcss-css/index.html#_清单 9. 自定义选择器)中，“--heading”是自定义选择器的名称，其等同于选择器声明“h1, h2, h3, h4, h5, h6”。

  - CSS 模块（CSS modules）并不要求使用 **BEM** 那样复杂的命名规范。每个组件可以自由选择最合适的简单 CSS 类名。组件的 CSS 类名在使用时会被转换成带唯一标识符的形式。这样就避免了名称冲突。在组件开发中可以继续使用简单的 CSS 类名，而不用担心名称冲突问题。[代码清单](https://www.ibm.com/developerworks/cn/web/1604-postcss-css/index.html#_清单 13. 使用 CSS 模块规范的 CSS 代码)[ 13 ](https://www.ibm.com/developerworks/cn/web/1604-postcss-css/index.html#_清单 13. 使用 CSS 模块规范的 CSS 代码)中给出了使用 CSS 模块规范的 CSS 代码。**样式规则之前的“:global”表示这是一个全局样式声明。其他的样式声明是局部的。**
    **全局的 CSS 类名 title 保存不变，局部的 CSS 类名 content 被转换成_content_6xmce_5。这样就确保了不会与其他组件中名称为 content 的类名冲突。**

    由于在组件的 HTML 代码中引用的 CSS 类名和最终生成的类名并不相同，因此需要一个中间的过程来进行类名的转换。对于 React 来说，可以使用 react-css-modules 插件；在其他情况下，可以使用 PostHTML 对 HTML 进行处理。postcss-modules 插件把 CSS 模块中的 CSS 类名的对应关系保存在一个 JavaScript 对象中，可以被 PostHTML 中的 posthtml-css-modules 插件来使用。

    ```
    :global .title {
     font-size: 20px;
    }
     
    .content {
     font-weight: bold;
    }
    // 生成的css
    .title {
     font-size: 20px;
    }
     
    ._content_6xmce_5 {
     font-weight: bold;
    }
    ```

    ​