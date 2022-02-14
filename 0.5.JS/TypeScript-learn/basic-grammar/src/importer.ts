import { StringValidator } from './7.exporter.js';

const numberRegexp = /^[0-9]+$/;

class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

let myValidator = new ZipCodeValidator();
// 实例化之后，可以调用isAcceptable方法
console.log("ZipCodeValidator: ", myValidator, myValidator.isAcceptable('aaa'));