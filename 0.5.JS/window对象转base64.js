// base64编码在前端通常用于图片和icon的编码，它将每3个8位字节为一组，分成4组6位字节，
// 并且每个字节的高位补零，形成4个8位的字节，由此可看出base64编码是可逆推的。
// 在大多数浏览器中，提供了ASCII字符的base64编码函数，即window.btoa()。
// 该函数无法针对宽字节进行base64编码，若针对中文编码，则需现转换位UTF－8编码，然后进行base64编码。
function unicodeToBase64(s) {
  return window.btoa(unescape(encodeURIComponent(s)));
}

var str =
  "实在上节中已提到了js编码，即js可执行unicode编码和十六（八）进制编码后的字符串，但是不支持十进制编码的字串";

unicodeToBase64(str);
