/**
 * 同事
 * @param mediator
 * @constructor
 * @description 同事可以是一种类型也可以是多种类型的，这里按照单个类型处理，有两个方法，发消息和收消息
 */

function Colleague(mediator, name) {
  this.mediator = mediator;
  this.name = name;
}
Colleague.prototype.send = function(msg, receiver) {
  // 1
  this.mediator.send(msg, this.name, receiver);
};
Colleague.prototype.receiveMsg = function(msg, sender) {
  // b 3
  console.log(this.name, '####', sender + ' say: ' + msg);
};

/**
 * 中介者（可以处理多个同事）
 * @constructor
 */
function Mediator() {}

Mediator.prototype.addColleague = function(colleague) {
  // 需要将同事的引用保存到中心节点上
  this[colleague.name] = colleague;
  return this;
};

/**
 * @param sender 发送的人
 * @param receiver 接受的人
 */
// @ts-ignore
Mediator.prototype.send = function(msg, sender, receiver) {
  // 2
  try {
    this[receiver].receiveMsg(msg, sender);
  } catch (err) {
    console.log('receiver ' + receiver + ' is not exsit');
    this[sender].receiveMsg('receiver ' + receiver + ' is not exsit', 'mediator');
  }
};

// 测试中介者模式，通过a发消息给b
var _mediator = new Mediator();
var a = new Colleague(_mediator, 'a');
var b = new Colleague(_mediator, 'b');
console.log(_mediator, a, b);

_mediator.addColleague(a).addColleague(b);

a.send('hello i am a', 'b');
b.send('hello i am b', 'a');
