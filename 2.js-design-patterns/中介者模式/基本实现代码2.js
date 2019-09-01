/**
 * 同事
 * @param mediator
 * @constructor
 */
function Colleague(mediator) {
    this.mediator = mediator;

};

Colleague.prototype.getMediator = function () {
    return this.mediator;
};

Colleague.prototype.doOperation = function () {
    this.getMediator().change(this);
};

/**
 * 中介者（可以处理多个同事）
 * @param colleague1
 * @param colleague2
 * @constructor
 */
function Mediator(colleague1, colleague2) {
    this.colleague1 = colleague1;
    this.colleague2 = colleague2;
};

/*
当一个同事的状态发生改变的时候，由中介者获取到同事，并对该同事的状态进行改变
不需要和其他同事进行交互
 */
Mediator.prototype.change = function (colleague) {
    colleague.doOperation();
};

Mediator.prototype.setColleague1 = function (colleague1) {
    this.colleague1 = colleague1;
    this.change(this.colleague2);
};

Mediator.prototype.setColleague2 = function (colleague2) {
    this.colleague2 = colleague2;
    this.change(this.colleague1);
};

// 这里function实现的是抽象对象，prototype后面实现的是具体对象；