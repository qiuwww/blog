'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require('./common/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _common.log)('test', '123');

// 测试async.await
// index.js


// 测试import与moudle
var sleep = function sleep(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    });
};

var start = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('start');
                        _context.next = 3;
                        return sleep(3000);

                    case 3:
                        console.log('end');

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function start() {
        return _ref.apply(this, arguments);
    };
}();

start();

// 测试class

var Person = function () {
    function Person(name, age) {
        (0, _classCallCheck3.default)(this, Person);

        this.name = name;
        this.age = age;
    }

    (0, _createClass3.default)(Person, [{
        key: 'sayName',
        value: function sayName() {
            console.log(this.name);
        }
    }]);
    return Person;
}();

var lilei = new Person('lilei', '20');

lilei.sayName();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInNsZWVwIiwidGltZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2V0VGltZW91dCIsInN0YXJ0IiwiY29uc29sZSIsImxvZyIsIlBlcnNvbiIsIm5hbWUiLCJhZ2UiLCJsaWxlaSIsInNheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOzs7O0FBR0EsaUJBQUksTUFBSixFQUFZLEtBQVo7O0FBRUE7QUFUQTs7O0FBR0E7QUFPQSxJQUFJQSxRQUFRLFNBQVJBLEtBQVEsQ0FBVUMsSUFBVixFQUFnQjtBQUN4QixXQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUMxQ0MsbUJBQVcsWUFBWTtBQUNuQkY7QUFDSCxTQUZELEVBRUdGLElBRkg7QUFHSCxLQUpNLENBQVA7QUFLSCxDQU5EOztBQVFBLElBQUlLO0FBQUEsMEVBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNSQyxnQ0FBUUMsR0FBUixDQUFZLE9BQVo7QUFEUTtBQUFBLCtCQUVGUixNQUFNLElBQU4sQ0FGRTs7QUFBQTtBQUdSTyxnQ0FBUUMsR0FBUixDQUFZLEtBQVo7O0FBSFE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBUjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFKOztBQU1BRjs7QUFJQTs7SUFDTUcsTTtBQUNMLG9CQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUFzQjtBQUFBOztBQUNyQixhQUFLRCxJQUFMLEdBQVlBLElBQVo7QUFDQSxhQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFDQTs7OztrQ0FDUztBQUNUSixvQkFBUUMsR0FBUixDQUFZLEtBQUtFLElBQWpCO0FBQ0E7Ozs7O0FBR0YsSUFBSUUsUUFBUSxJQUFJSCxNQUFKLENBQVcsT0FBWCxFQUFvQixJQUFwQixDQUFaOztBQUVBRyxNQUFNQyxPQUFOIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6InNyYyJ9
