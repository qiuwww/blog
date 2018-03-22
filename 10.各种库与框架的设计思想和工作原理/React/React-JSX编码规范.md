# React/JSX 编码规范

## 基本规范

- 每个文件只包含的一个 React 组件（联系紧密的组件可以使用「命名空间的形式」）。
- 始终使用 JSX 语法，不要使用 `React.createElement` 创建 ReactElement，以提高编写速度、可读性、可维护性（没有 JSX 转换的特殊场景例外，如在 `console` 中测试组件）。
- 使用 **ES6**。

## 命名规范

- **扩展名**：使用 `.js` 作为 React 组件的扩展名；
- **文件名**：使用**大驼峰命名法**，如 `MyComponent.js`；
- **组件命名**：组件名称和文件名一致，如 `MyComponent.js` 里的组件名应该是 `MyComponent`；一个目录的根组件使用 `index.js` 命名，以目录名称作为组件名称；

## 属性

### 属性命名

- React 组件的属性使用**小驼峰命名法**；
- 使用 `className` 代替 `class` 属性；
- 使用 `htmlFor` 代替 `for` 属性。

**传递给 HTML 的属性：**

- 传递给 HTML 元素的自定义属性，需要添加 `data-` 前缀，React 不会渲染非标准属性；
- [无障碍](http://www.w3.org/WAI/intro/aria)属性 `aria-` 可以正常使用。

### 属性对齐方式

- 属性较少时可以行内排列；
- 属性较多时每行一个属性，闭合标签单独成行

### 行内迭代

- 运算逻辑简单的直接使用行内迭代。

```
return (
  <div>
    {this.props.data.map(function(data, i) {
      return (<Component data={data} key={i} />)
    })}
    </div>
);
```



## 其他代码格式

### 注释(使用{}来取值表示，内部使用js注释方式)

- 组件之间的注释需要用 `{}` 包裹。

  ```
    var content = (
      <Nav>
        {/* child comment, put {} around */}
        <Person
          /* multi
             line
             comment */
          name={window.isLoggedIn ? window.name : ''} // end of line comment
        />
      </Nav>
    );
  ```

### 引号使用

- HTML/JSX 属性使用**双引号** `"`；
- JS 使用**单引号** `'`；


- 简短的输出在行内直接三元运算符；sss

  ```
    {this.state.show && 'This is Shown'}
    {this.state.on ? 'On' : 'Off'}

  ```

- 较复杂的结构可以在 `.render()` 方法内定义一个以 `Html` 结尾的变量。

```
 var dinosaurHtml = '';

  if (this.state.showDinosaurs) {  
    dinosaurHtml = (
      <section>
        <DinosaurTable />
        <DinosaurPager />
      </section>
    );
  }

  return (  
    <div>
      ...
      {dinosaurHtml}
      ...
    </div>
  );
```



### () 使用

- 多行的 JSX 使用 `()` 包裹，有组件嵌套时使用多行模式；























