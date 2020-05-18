var template = function (str) {
  var regExp;
  return function (obj) {
    for (var i in obj) {
      regExp = new RegExp(`\\<\\%\\=\\s+${i}\\s+?\\%\\>`, 'g');
      str = str.replace(regExp, obj[i]);
      console.log('str', regExp, str);
    }
    return str;
  };
};

template('hello <%= user %>')({ user: 'world!' });
