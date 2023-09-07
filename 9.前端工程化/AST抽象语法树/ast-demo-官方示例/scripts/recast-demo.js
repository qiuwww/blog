/**
 * step 1，查看代码的ast树解构
 */

// 给你一把"螺丝刀"——recast
const recast = require('recast');

// 你的"机器"——一段代码
// 我们使用了很奇怪格式的代码，想测试是否能维持代码结构
const code = `
  function add(a, b) {
    return a +
      // 有什么奇怪的东西混进来了
      b
  }
  `;
// 用螺丝刀解析机器
const ast = recast.parse(code);

// ast可以处理很巨大的代码文件
// 但我们现在只需要代码块的第一个body，即add函数
const add = ast.program.body[0];

// console.log(add);
// console.log(add.params[0]);
// console.log(add.body.body[0].argument.left);

/**
 * step 2，修改ast树结构
 */
// 最简单的例子，我们想把之前的function add(a, b){...}声明，改成匿名函数式声明const add = function(a ,b){...}

// 第一步，我们创建一个VariableDeclaration变量声明对象，声明头为const， 内容为一个即将创建的VariableDeclarator对象。
// 第二步，创建一个VariableDeclarator，放置add.id在左边， 右边是将创建的FunctionDeclaration对象
// 第三步，我们创建一个FunctionDeclaration，如前所述的三个组件，id params body中，因为是匿名函数id设为空，params使用add.params，body使用add.body。

// 这样，就创建好了const add = function(){}的AST对象。

// 引入变量声明，变量符号，函数声明三种“模具”
const { variableDeclaration, variableDeclarator, functionExpression } = recast.types.builders;

// 将准备好的组件置入模具，并组装回原来的ast对象。
ast.program.body[0] = variableDeclaration('const', [
  variableDeclarator(
    add.id,
    functionExpression(
      null, // Anonymize the function expression.
      add.params,
      add.body,
    ),
  ),
]);

// 将AST对象重新转回可以阅读的代码
const output = recast.print(ast).code;

console.log('改装前的:', code, '\n改装之后的输出:', output);
