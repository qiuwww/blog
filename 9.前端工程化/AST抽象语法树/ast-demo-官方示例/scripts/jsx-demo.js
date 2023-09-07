// node inspect scripts/add.js
// 主要用到的babel模块
const execa = require('execa');
const fs = require('fs');
// const ast = parser.parse(readFileSync(configPath, 'utf-8')，通过文件地址来解析code为ast树
const parser = require('@babel/parser');
// traverse(ast, {， https://www.babeljs.cn/docs/babel-traverse，@babel/traverse 可以用来遍历更新@babel/parser生成的AST
const traverse = require('@babel/traverse').default;
// const newCode = generate(ast, {}).code; AST到代码
const generate = require('@babel/generator').default;
const t = require('@babel/types');

// 读取代码并修改后保存
// 42["blockOpt-emit","{\"cwd\":\"/Users/qiuww/code/eazytec/project-menu/Test-ast\",\"filename\":\"/Users/qiuww/code/eazytec/project-menu/Test-ast/src/pages/Dashboard/index.js\",\"index\":\"0\"}"]

const FILE_PATH = '/Users/qiuww/code/eazytec/project-menu/Test-ast/src/pages/Dashboard/index.js';
const DIST_PATH = './out/result.js';

// 读取源文件
const oldEntry = fs.readFileSync(FILE_PATH, 'utf-8');
// console.log('### oldEntry', oldEntry);
// 对代码进行解析
function parseContent(code) {
  return parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'decorators-legacy', 'typescript', 'classProperties', 'dynamicImport'],
  });
}
const ast = parseContent(oldEntry);
// console.log('### parseContent', ast);
// 结果可以查看 https://astexplorer.net/
// 组件的 AST 表示
// Node {
//   type: 'File',
//   start: 0,
//   end: 2323,
//   loc:
//    SourceLocation {
//      start: Position { line: 1, column: 0 },
//      end: Position { line: 83, column: 0 } },
//   errors: [],
//   program:
//    Node {
//      type: 'Program',
//      start: 0,
//      end: 2323,
//      loc: SourceLocation { start: [Position], end: [Position] },
//      sourceType: 'module',
//      interpreter: null,
//      body:
//       [ [Node], [Node], [Node], [Node], [Node], [Node], [Node], [Node] ],
//      directives: [] },
//   comments: [] }
// 对原文件进行处理

traverse(ast, {
  // 这里是更新逻辑
  // Program
  // Identifier
  // JSXText
  Program({ node }) {
    const { body } = node;
    // const code = "import { Row, Col } from 'antd'";
    // const ast2 = parseContent(code);
  },
  CallExpression(p) {
    // 对语法树中特定的节点进行操作 参考@babel/types （特定节点类型）
    // CallExpression 特定节点
  },
  FunctionDeclaration: function (path) {
    // 对语法树中特定的节点进行操作 参考@babel/types （特定节点类型）
    // FunctionDeclaration 特定节点
  },
  // .....
  enter(path) {
    // 进入节点
    if (path.node.type === 'ThisExpression') {
      // 对所有的操作
    }
  },
  exit(path) {
    // 退出节点
    // console.log(`exit ${path.type}(${path.key})`);
  },

  // 添加一个引入 import
  JSXText(path) {
    console.log('JSXText', path.type);
  },
});

const newEntry = generate(ast, {}).code;

// 写文件

fs.writeFileSync(DIST_PATH, newEntry);
