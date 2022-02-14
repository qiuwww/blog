"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 把验证规则集中到一起
var Validation;
(function (Validation) {
    var Breakpoint;
    (function (Breakpoint) {
        Breakpoint[Breakpoint["xxl"] = 0] = "xxl";
        Breakpoint[Breakpoint["xl"] = 1] = "xl";
        Breakpoint[Breakpoint["lg"] = 2] = "lg";
        Breakpoint[Breakpoint["md"] = 3] = "md";
        Breakpoint[Breakpoint["sm"] = 4] = "sm";
        Breakpoint[Breakpoint["xs"] = 5] = "xs";
    })(Breakpoint = Validation.Breakpoint || (Validation.Breakpoint = {}));
    var Animal = /** @class */ (function () {
        function Animal(theName) {
            this.name = theName;
        }
        Animal.prototype.move = function (distanceInMeters) {
            if (distanceInMeters === void 0) { distanceInMeters = 0; }
            console.log("".concat(this.name, " moved ").concat(distanceInMeters, "m."));
        };
        return Animal;
    }());
    Validation.Animal = Animal;
    var Snake = /** @class */ (function (_super) {
        __extends(Snake, _super);
        function Snake(name) {
            return _super.call(this, name) || this;
        }
        Snake.prototype.move = function (distanceInMeters) {
            if (distanceInMeters === void 0) { distanceInMeters = 5; }
            console.log("Slithering...");
            _super.prototype.move.call(this, distanceInMeters);
        };
        return Snake;
    }(Animal));
    Validation.Snake = Snake;
})(Validation || (Validation = {}));
