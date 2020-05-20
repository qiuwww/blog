// canvas-js-library.js
// http://gcdn.gcpowertools.com.cn/showtopic-23858-1-3.html?utm_source=segmentfault&utm_medium=referral&utm_campaign=20170116
(function () {
  var canvas = {
    ctx: document.getElementById('my-canvas').getContext('2d'),
    drawStroke: function () {
      ctx = this.ctx;
      ctx.beginPath();
      ctx.strokeStyle = '#0f0';
      ctx.moveTo(10, 10);
      ctx.lineTo(25, 100);
      ctx.stroke();
      //上面的是一组样式，绘制，然后填充
      ctx.strokeStyle = '#f00';
      ctx.lineTo(50, 50);
      ctx.stroke();
      ctx.strokeStyle = '#00f';
      ctx.lineTo(10, 10);
      ctx.stroke();
      ctx.closePath();
    },
    drawFill: function () {
      ctx = this.ctx;
      ctx.beginPath();
      ctx.moveTo(75, 50);
      ctx.lineTo(75, 100);
      ctx.lineTo(25, 100);
      ctx.fillStyle = 'red';
      ctx.fill();
    },
    drawCurve: function () {
      ctx = this.ctx;
      ctx.beginPath();
      ctx.strokeStyle = 'blue';
      ctx.moveTo(20, 20);
      //context.quadraticCurveTo(cpx,cpy,x,y);
      ctx.quadraticCurveTo(20, 100, 200, 20);
      ctx.stroke();
    },
    drawRect: function () {
      ctx.fillStyle = 'red';
      ctx.fillRect(25, 25, 100, 100);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.strokeRect(100, 100, 25, 25);
      ctx.clearRect(35, 35, 50, 50);
    },
    init: function () {
      this.drawStroke();
      this.drawFill();
      this.drawCurve();
      this.drawRect();
    },
  };
  canvas.init();
})();
