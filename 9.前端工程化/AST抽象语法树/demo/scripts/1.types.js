/**
 * 更多参考types的test部分
 */
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');
const generate = require('@babel/generator').default;
const { parse } = require('@babel/parser');
const t = types;

/**
 * 生成一些基本你的类型
 */
// 生成一个字符串
const strAst = types.stringLiteral('hello world');
console.log('生成一个string节点：', strAst, generate(strAst).code);

const numAst = types.numericLiteral(10e9);
console.log('生成一个数值节点：', numAst, generate(numAst).code);

const bolAst = types.booleanLiteral(0.5 > Math.random());
console.log('生成一个boolean类型节点：', bolAst, generate(bolAst).code);

const regExpAst = types.regExpLiteral('\\d.jsx?$', 'ig');
console.log('生成一个regexp节点：', regExpAst, generate(regExpAst).code);

// 生成一段语句 var str = hello world!
// 这里的var可以直接修改为const/let
const statementAst = types.variableDeclaration('var', [
  types.variableDeclarator(types.identifier('str'), types.stringLiteral('hello world!')),
]);
console.log('生成一个语句：', statementAst, '\n', generate(statementAst).code);

// c，只是定义的变量，并没有声明和赋值
const identifier = t.identifier('c');

console.log('生成一个定义节点identifier：', identifier, generate(identifier).code);

// 生成一个计算语句
const expressAst = t.assignmentExpression('+', types.identifier('a'), types.identifier('b'));
console.log('生成一个计算语句：', expressAst, generate(expressAst).code);

/**
 * 生成一个对象
  {
    a: {
      b: "foo"
    }
  }
 */
const obj = t.objectExpression([
  t.objectProperty(
    t.identifier('a'),
    t.objectExpression([t.objectProperty(t.identifier('b'), t.stringLiteral('foo'))]),
  ),
]);
console.log('obj：', obj, '\n', generate(obj).code);

/**
 * 生成一个数组
 */

const arr = types.arrayExpression([
  types.stringLiteral('string'),
  types.booleanLiteral(0.5 > Math.random()),
  types.numericLiteral(10e2),
  types.regExpLiteral('\\.jsx?$', 'g'),
  obj,
]);

console.log('arr：', arr, '\n', generate(arr).code);

/**
 * 生成一个函数
 */

// arrowFunctionExpression肩头函数使用这个类型

const funcAst = types.functionDeclaration(
  types.identifier('func'),
  [types.identifier('a'), types.identifier('b')],
  types.blockStatement([
    types.expressionStatement(
      types.callExpression(types.identifier('console.log'), [
        types.identifier('a'),
        types.identifier('b'),
      ]),
    ),
    // 这里返回return a + b;
    // t.assignmentExpression(operator, left, right)
    types.returnStatement(
      t.assignmentExpression('+', types.identifier('a'), types.identifier('b')),
    ),
  ]),
);

console.log('funcAst：', funcAst, '\n', generate(funcAst).code);

/**
 * 生成一个class并添加属性和方法
 */

// t.classDeclaration(id, superClass, body, decorators);
const classAst = types.classDeclaration(
  types.identifier('Person'),
  null,
  types.classBody([
    // t.classMethod(kind, key, params, body, computed, static, generator, async);
    types.classMethod(
      'constructor',
      t.identifier('constructor'),
      [types.identifier('name')],
      t.blockStatement([
        // t.expressionStatement(expression);
        types.expressionStatement(
          // t.assignmentExpression(operator, left, right);
          types.assignmentExpression(
            '=',
            // t.memberExpression(object, property, computed, optional);
            types.memberExpression(t.thisExpression(), t.identifier('name')),
            types.identifier('name'),
          ),
        ),
      ]),
    ),

    types.classMethod(
      'method',
      t.identifier('getName'),
      [],
      t.blockStatement([
        t.returnStatement(t.memberExpression(t.thisExpression(), t.identifier('name'))),
      ]),
    ),
  ]),
);

console.log('classAst:', classAst, generate(classAst).code);

// class Person {
//   constructor(name) {
//     this.name = name;
//   }
//   getName() {
//     return this.name;
//   }
// }

/**
 * 节点是否相等、是否是目标类型
 */
const isNodesEquivalent = t.isNodesEquivalent(parse('1 + 1'), parse('1+1'));
const parseAdd = parse('1 + 1');

console.log('isNodesEquivalent：', isNodesEquivalent, parseAdd, generate(parseAdd).code);

const isCompatTag = t.react.isCompatTag('div');
console.log('isCompatTag：', isCompatTag);
