// http://www.daqianduan.com/6419.html

// jquery的ready与window.onload的区别，ready只是dom结构加载完毕，便视为加载完成。
// (此时图片没有加载完毕)，onload是指dom的生成和资源完全加载（比如flash、图片）出来后才执行。
// 接下来回到正题，先从单张图片说起。

// （1）、单张图片（图片在文档中）

// HTML
{
  /* <img id='xiu' src="http://www.daqianduan.com/wp-content/uploads/2014/11/hs-xiu.jpg"> */
}

// js
$(document).ready(function() {
  //jquery
  $("#xiu").load(function() {
    // 加载完成
  });

  //原生  onload
  var xiu = document.getElementById("xiu");
  xiu.onload = xiu.onreadystatechange = function() {
    if (
      !this.readyState ||
      this.readyState == "loaded" ||
      this.readyState == "complete"
    ) {
      // 加载完成
    }
  };
});

// （5）、多张图片（结合ES6 Promise.all()）

let mulitImg = [
  "http://www.daqianduan.com/wp-content/uploads/2017/03/IMG_0119.jpg",
  "http://www.daqianduan.com/wp-content/uploads/2017/01/1.jpg",
  "http://www.daqianduan.com/wp-content/uploads/2015/11/jquery.jpg",
  "http://www.daqianduan.com/wp-content/uploads/2015/10/maid.jpg"
];
let promiseAll = [],
  img = [],
  imgTotal = mulitImg.length;
for (let i = 0; i < imgTotal; i++) {
  promiseAll[i] = new Promise((resolve, reject) => {
    img[i] = new Image();
    img[i].src = mulitImg[i];
    img[i].onload = function() {
      // 第i张加载完成
      resolve(img[i]);
    };
  });
}
Promise.all(promiseAll).then(img => {
  // 全部加载完成
});
