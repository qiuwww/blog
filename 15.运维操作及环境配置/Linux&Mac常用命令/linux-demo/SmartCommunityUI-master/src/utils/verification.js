import {
  regexName,
  regexEmail,
  regexPhone,
  regexIdCard,
  regexWeChat,
  regexEnglish,
  regexLandline,
  regexIntNumber,
  regexLicensePlate,
  regexAmountOfMoney,
  regexNumberOrLetter,
  regexChineseOrNumberOrLetter
} from "./regex";

export const isNotMatch = (regex, val) => {
  return val.toString().search(regex) === -1;
};

export const vPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入手机号码！"));
  } else if (isNotMatch(regexPhone, value)) {
    return callback(new Error("请输入11位手机号码！"));
  } else {
    return callback();
  }
};

export const vPhoneOrLandline = (rule, value, callback) => {

  if (!value) {
    return callback(new Error("请输入电话号码！"));
  } else if (
    isNotMatch(regexPhone, value) &&
    isNotMatch(regexLandline, value)
  ) {
    return callback(new Error("请输入有效号码！"));
  } else {
    return callback();
  }
};

export const vLicensePlate = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入访客车牌！"));
  } else if (isNotMatch(regexLicensePlate, value)) {
    return callback(new Error("请输入正确车牌号！"));
  } else {
    return callback();
  }
};

export const vEnglish = (min, max, msg) => {
  return (rule, value, callback) => {
    if (!value) {
      return callback(new Error(msg));
    } else if (isNotMatch(regexEnglish, value)) {
      return callback(new Error("请输入A-Z大写字母！"));
    } else if (value.length < min) {
      return callback(new Error(`长度在 ${min}-${max}个字母`));
    } else if (value.length > max) {
      return callback(new Error(`长度在 ${min}-${max}个字母`));
    } else {
      return callback();
    }
  };
};

export const vName = (min, max, msg) => {
  return (rule, value, callback) => {
    if (!value) {
      return callback(new Error(msg));
    } else if (isNotMatch(regexName, value)) {
      return callback(new Error("请输入中文或字母！"));
    } else if (value.length < min) {
      return callback(new Error(`长度在 ${min}-${max}个汉字或字母`));
    } else if (value.length > max) {
      return callback(new Error(`长度在 ${min}-${max}个汉字或字母`));
    } else {
      return callback();
    }
  };
};

export const vAmountOfMoney = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入金额！"));
  } else if (isNotMatch(regexAmountOfMoney, value)) {
    return callback(new Error("请输入正确金额！"));
  } else {
    return callback();
  }
};

export const vChineseOrNumberOrLetter = (min, max, msg) => {
  return (rule, value, callback) => {
    if (!value) {
      return callback();
    } else if (isNotMatch(regexChineseOrNumberOrLetter, value)) {
      return callback(new Error("请输入中文或数字或字母！"));
    } else if (value.length < min) {
      return callback(new Error(`长度在 ${min}-${max}个字符`));
    } else if (value.length > max) {
      return callback(new Error(`长度在 ${min}-${max}个字符`));
    } else {
      return callback();
    }
  };
};

export const vNumberOrLetter = (min, max, msg) => {
  return (rule, value, callback) => {
    if (!value) {
      return callback(new Error(msg));
    } else if (isNotMatch(regexNumberOrLetter, value)) {
      return callback(new Error("请输入数字或字母！"));
    } else if (value.length < min) {
      return callback(new Error(`长度在 ${min}-${max}个字符`));
    } else if (value.length > max) {
      return callback(new Error(`长度在 ${min}-${max}个字符`));
    } else {
      return callback();
    }
  };
};

export const vIdCard = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入身份证号！"));
  } else if (isNotMatch(regexIdCard, value)) {
    return callback(new Error("身份证号填写有误！"));
  } else {
    return callback();
  }
};

export const vIntNumber = (min, max, msg) => {
  return (rule, value, callback) => {
    if (!value) {
      return callback(new Error(msg));
    } else if (isNotMatch(regexIntNumber, value)) {
      return callback(new Error("请输入正整数！"));
    } else if (value.length < min) {
      return callback(new Error(`长度在 ${min}-${max}个字符`));
    } else if (value.length > max) {
      return callback(new Error(`长度在 ${min}-${max}个字符`));
    } else {
      return callback();
    }
  };
};

export const vPositiveNumber = (min, max, msg) => {
  return (rule, value, callback) => {
    if (!value) {
      return callback(new Error(msg));
    } else if (+value <= 0) {
      return callback(new Error("请输入正数！"));
    } else if (value.length < min) {
      return callback(new Error(`范围在 ${min}-${max}`));
    } else if (value.length > max) {
      return callback(new Error(`范围在 ${min}-${max}`));
    } else {
      return callback();
    }
  };
};

export const vlength = (min, max, msg) => {
  return (rule, value, callback) => {
    if (!value) {
      return callback(new Error(msg));
    } else if (value.length < min) {
      return callback(new Error(`长度在 ${min}-${max}个字符`));
    } else if (value.length > max) {
      return callback(new Error(`长度在 ${min}-${max}个字符`));
    } else {
      return callback();
    }
  };
};

export const vAlipay = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入支付宝账号！"));
  } else if (isNotMatch(regexPhone, value) && isNotMatch(regexEmail, value)) {
    return callback(new Error("格式错误！"));
  } else {
    return callback();
  }
};

export const vWeChat = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入微信账号！"));
  } else if (isNotMatch(regexWeChat, value)) {
    return callback(new Error("格式错误！"));
  } else {
    return callback();
  }
};
