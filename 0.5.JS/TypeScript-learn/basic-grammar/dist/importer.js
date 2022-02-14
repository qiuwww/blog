var numberRegexp = /^[0-9]+$/;
var ZipCodeValidator = /** @class */ (function () {
    function ZipCodeValidator() {
    }
    ZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && numberRegexp.test(s);
    };
    return ZipCodeValidator;
}());
var myValidator = new ZipCodeValidator();
// 实例化之后，可以调用isAcceptable方法
console.log("ZipCodeValidator: ", myValidator, myValidator.isAcceptable('aaa'));
export {};
