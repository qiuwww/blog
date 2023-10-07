// 增删改查，似乎都是可以了

const { parse } = require('@babel/parser');
const generate = require('@babel/generator').default;
const fs = require('fs');
const path = require('path');
const types = require('@babel/types');
const traverse = require('@babel/traverse').default;

// 1. 读取js文件
const code = fs.readFileSync(path.resolve(__dirname, './input/demo1.jsx'), 'utf8').toString();

// 2. 将字符串转为ast
const ast = parse(code, {
  sourceType: 'module',
  // 例如添加"jsx"这个plugins后就可以解析jsx代码，不添加上边的代码就会报错
  plugins: ['jsx'],
});

// 存入到本地文件
fs.writeFileSync(__dirname + '/output/demo1-before-traverse.json', JSON.stringify(ast));

// 3. 遍历操作节点
traverse(ast, {
  // path是一个对象，它表示两个节点之间的关联，我们可以通过path.node来访问其节点属性、通过path.parentPath访问其父路径等等。
  // 这里的enter会多次进入，每个自己点都会经过这个地方
  enter(path) {
    // console.log('## enter', path.node);

    // 可以打印出来相关的节点
    const { node } = path;
    // 修改变量定义为a｜func的变量为目标的name
    if (path.isIdentifier({ name: 'a' })) {
      path.node.name = 'b';
    }
    if (path.isIdentifier({ name: 'func' })) {
      path.node.name = 'myFunc';
    }
    // 修改span标签为div
    if (path.isJSXIdentifier({ name: 'span' })) {
      path.node.name = 'div';
    }
  },

  exit(path) {
    // console.log('## exit');
  },

  // 表示程序的入口，整体，如果想要层次的便利整个ast树，就从这里开始
  // 只会进入一次
  Program(path) {
    // console.log('## Program');
    const { node } = path;

    node.body.forEach((item, index) => {
      // 在var num = 123; 声明语句后边添加一条声明语句
      if (types.isVariableDeclaration(item)) {
        let targetIndex = -1;
        if (item.kind !== 'var') {
          return;
        }
        // 查找目标语句
        item.declarations.some((_item) => {
          if (_item.id.name === 'num' && _item.init.value === 123) {
            targetIndex = index;
            return true;
          }
          return false;
        });

        // 在其后添加一条变量声明
        if (targetIndex > -1) {
          const astNode = types.variableDeclaration('var', [
            types.variableDeclarator(
              types.identifier('helloworld'),
              types.stringLiteral('Hello World'),
            ),
          ]);

          node.body.splice(targetIndex + 1, 0, astNode);
        }
      }
    });
  },

  // 所有定义的类型，包括函数定义，变量定义，类定义等
  // 与path.isIdentifier()一个意思
  Identifier(path) {
    // console.log('## Identifier', path.node);
  },

  JSXText(path) {
    // console.log('## JSXText');
  },

  ClassBody(path) {
    // console.log('## ClassBody');
  },
  CallExpression(path) {
    // console.log('## CallExpression');
  },

  FunctionDeclaration(path) {
    if (path.node.id.name === 'func') {
      // console.log('## FunctionDeclaration', path.node);
      // 给目标函数添加一条返回值
      path.node.body.body.push(types.returnStatement(types.identifier('a')));
    }
  },
});

const output = generate(ast, {}).code;

fs.writeFileSync(__dirname + '/output/demo1-after-traverse.js', output);
