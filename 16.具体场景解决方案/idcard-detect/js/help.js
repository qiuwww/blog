function getLocationSearch() {
  var href = location.href;
  var search = location.search;
  var theRequest = new Object();
  if (href.indexOf('?') > -1) {
    var url = search ? search : href;
    var hrefStr = href.substring(href.indexOf('?') + 1);
    while (hrefStr.indexOf('/') > -1) {
      hrefStr = hrefStr.substring(0, hrefStr.indexOf('/'));
    }
    var arr = hrefStr.split('&');
    arr.filter((item) => {
      theRequest[item.split('=')[0]] = item.split('=')[1];
    });
    return theRequest;
  }
  return '';
}

/* 压缩base64图片，怎么压缩base64是题外话，这里不赘述 */
function compress(
  base64, // 源图片
  rate, // 缩放比例
  callback, // 回调
) {
  //处理缩放，转格式
  var _img = new Image();
  _img.src = base64;
  _img.onload = function () {
    var _canvas = document.createElement('canvas');
    var w = this.width / rate;
    var h = this.height / rate;
    _canvas.setAttribute('width', w);
    _canvas.setAttribute('height', h);
    _canvas.getContext('2d').drawImage(this, 0, 0, w, h);
    var base64 = _canvas.toDataURL('image/*');
    _canvas.toBlob(function (blob) {
      if (blob.size > 700 * 600) {
        // 如果还大，继续压缩
        compress(base64, rate, callback);
      } else {
        callback(base64);
      }
    }, 'image/*');
  };
}
