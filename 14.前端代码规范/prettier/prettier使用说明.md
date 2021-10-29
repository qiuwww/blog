# prettier 使用说明

用于文件格式化；

## 全局&局部（vscode）

1. 全局配置 setting.json 来设置 vscode 的默认设置，在不存在项目的`.prettierrc`的时候生效；
2. 在项目内有`.prettierrc`或者`.prettierrc.js`来配置；

## 使用的.prettierrc 标准

```js
module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  proseWrap: 'never',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  // 尾后逗号，这里有好有坏，要看具体情况。
  trailingComma: 'none',
  printWidth: 120,
  htmlWhitespaceSensitivity: 'ignore', // vue-html尖括号掉行
};
```

### 在 setting.json 中配置使用 prettier 格式化文件

```
 "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
```
