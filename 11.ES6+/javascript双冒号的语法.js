
// 需要stage-0支持

// es7中有一个语法糖可以用来用::做方法绑定（Function bind syntax）

// 具体的语法如下：

// javascript 

let log = ::console.log;

// 等同于如下： let log = console.log.bind(console);

function bar (a, b) {
    return (this.x * a) + (this.y * b);
}

let foo = {
    x: 1,
    y: 2
};

foo::bar(2, 3); // => (1*2) + (2*3) = 8

// bar.apply(foo, [2, 3]);

// 方法绑定有2种用法，第一种是把对象绑定为这个方法的this，这时候：：放在要绑定方法的对象名前，这个对象后面紧接着它的一个方法

let obj = {
    method: function () {
        console.log(this);
    }
};

::obj.method;

// 等同于obj.method.bind(obj);

// 第二种用法是放到对象和方法名之间，将这个对象绑定为这个方法的this

let obj = {
    foo: 'bar'
};

function method () {
    console.log(this.foo);
}

obj::method();

// method.call(obj);
// or:
// method.bind(obj)();

obj::method;

// method.bind(obj);
// 接下来对比一下es5-es7几个版本中不同的方法绑定的用法

// ES5

function Collection () {
    this._array = [];
}

function _mixin (source) {
    Object.keys(source).forEach(function (key) {
        Collection.prototype[key] = source[key];
    });
}

function _makeArray (arrayLike) {
    return Array.prototype.slice.call(arrayLike);
}

_mixin({
    add: function () {
        var items = _makeArray(arguments);

        items.forEach(function (item) {
            this._array.push(item);
        }, this);

        return this;
    },

    remove: function () {
        var items = _makeArray(arguments);

        items.forEach(function (item) {
            var index = this._array.indexOf(item);

            if (index > -1) {
                this._array.splice(index, 1);
            }
        }, this);

        return this;
    },

    print: function () {
        this._array.forEach(function (value, i) {
            console.log(i + ':', value);
        });

        return this;
    }
});

var arr = new Collection();

arr
    .add(1, 2, 3)
    .remove(1, 4)
    .add(4, 5)
    .remove(3, 5)
;

arr.print();

// ES6的语法：

 class Collection extends Array {
    constructor () {
        super(...arguments);
    }

    add (...items) {
        this.push(...items);

        return this;
    }

    remove (...items) {
        for (let item of items) {
            let index = this.indexOf(item);

            if (index > -1) {
                this.splice(index, 1);
            }
        }

        return this;
    }

    print () {
        this.forEach((value, i) => {
            console.log(`{i}:`, value);
        });

        return this;
    }
}

var arr = new Collection();

arr
    .add(1, 2, 3)
    .remove(1, 4)
    .add(4, 5)
    .remove(3, 5)
;

arr.print();

// ES7的语法

function add (...items) {
    this.push(...items);

    return this;
}

function remove (...items) {
    items.forEach(item => {
        let index = this.indexOf(item);

        if (index > -1) {
            this.splice(index, 1);
        }
    });

    return this;
}

function print () {
    this.forEach((value, i) => {
        console.log(`{i}:`, value);
    });

    return this;
}

let arr = [];

// 返回当前对象所以可以连写

arr
    ::add(1, 2, 3)
    ::remove(1, 4)
    ::add(4, 5)
    ::remove(3, 5)
;

arr::print();