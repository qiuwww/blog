var http = require('http'); // http 网路

var href =
  'http://test1.ygsong.com/cmobile/index.php?app=goods&mod=goods_list&order=&order_key=&price_from=&price_to=&keyword=%e5%9f%83%e5%8f%8a';

let request = new Promise(function (resolve, reject) {
  http.get(href, function (res) {
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        resolve(parsedData);
      } catch (e) {
        reject(e);
        console.error(e.message);
      }
    });
  });
});

request.then((res) => {
  console.log(res.datas.goods_list);
});
