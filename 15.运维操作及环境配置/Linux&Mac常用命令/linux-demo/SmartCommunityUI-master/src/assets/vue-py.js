import { pinyin } from "./pinyin.js";
export default {
  //全部
  chineseToPinYin: function (l1) {
    var l2 = l1.length;
    var I1 = "";
    var reg = new RegExp("[a-zA-Z0-9]");
    for (var i = 0; i < l2; i++) {
      var val = l1.substr(i, 1);
      var name = this.arrayNormal(val, pinyin);
      if (reg.test(val)) {
        I1 += val;
      } else if (name !== false) {
        I1 += name;
      }
    }
    I1 = I1.replace(/ /g, "-");
    while (I1.indexOf("--") > 0) {
      I1 = I1.replace("--", "-");
    }
    return I1;
  },
  //简拼
  simplePinYin: function (l1) {
    var l2 = l1.length;
    var I1 = "";
    var reg = new RegExp("[a-zA-Z0-9]");
    for (var i = 0; i < l2; i++) {
      var val = l1.substr(i, 1);
      var name = this.arraySimple(val, pinyin);
      if (reg.test(val)) {
        I1 += val;
      } else if (name !== false) {
        I1 += name;
      }
    }
    I1 = I1.replace(/ /g, "-");
    while (I1.indexOf("--") > 0) {
      I1 = I1.replace("--", "-");
    }
    return I1;
  },
  //全部处理
  arrayNormal: function (l1) {
    for (var name in pinyin) {
      if (pinyin[name].indexOf(l1) !== -1) {
        return this.normalHandle(name);
      }
    }
    return false;
  },
  normalHandle: function (l1) {
    if (l1.length > 0) {
      return l1;
    }
  },
  //简拼处理
  arraySimple: function (l1) {
    for (var name in pinyin) {
      if (pinyin[name].indexOf(l1) !== -1) {
        return this.simpleHandle(name);
      }
    }
    return false;
  },
  simpleHandle: function (l1) {
    if (l1.length > 0) {
      var first = l1.substr(0, 1);
      return first;
    }
  }
};
