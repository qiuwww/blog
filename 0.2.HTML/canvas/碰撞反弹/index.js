var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var WIDTH = document.documentElement.clientWidth;
// var HEIGHT = document.documentElement.clientHeight;
var HEIGHT = WIDTH;

// 设置canvas的宽高
canvas.width = WIDTH;
canvas.height = HEIGHT;

// 基础参数配置
const config = {
  WIDTH: WIDTH,
  HEIGHT: HEIGHT,
  // 基础的参数
  // 中间点的坐标
  centerX: WIDTH / 2,
  centerY: WIDTH / 2,

  // 小圆点的半径
  baseBallRadius: 2,
  ballFillColor: 'blue',
  // 基础的增量，也就是速度
  baseSpeed: 1,
  // 模拟的小圆点的个数
  ballNum: 360,

  baseGraphRadius: 100,
  maxGraphRadius: 300,
};

// 当前页面所有点的集合
const balls = [];

// 使用一些小的球来模拟一个圆
/**
 * @param {number} ballRadius 本身小球的半径
 * @param {number} shapeRadius 距离中心点的距离
 * @param {number} angle 相对于x方向的顺时针倾角
 */
function Ball(ballRadius, shapeRadius, angle) {
  const { ballFillColor } = config;

  this.ballRadius = ballRadius;
  this.shapeRadius = shapeRadius;
  this.angle = angle;
  this.ballFillColor = ballFillColor;

  // 变动的参数
  this.xCoordinate = '';
  this.yCoordinate = '';
}

// 计算倾角之后计算坐标
Ball.prototype.updateCoordinates = function () {
  const { WIDTH, HEIGHT, centerX, centerY } = config;

  // 计算位置
  let computedXCoordinate = centerX + Math.cos(this.angle) * this.shapeRadius;
  let computedYCoordinate = centerY + Math.sin(this.angle) * this.shapeRadius;

  // 判断碰撞
  // 这里要判断，多次碰撞之后的结果

  if (computedXCoordinate >= WIDTH) {
    // 向右
    // 单倍数的时候
    // computedXCoordinate = WIDTH * 2 - computedXCoordinate;
    // 二倍宽度的时候
    computedXCoordinate = WIDTH - (computedXCoordinate % (WIDTH * 2));
    // computedXCoordinate > 0 ? computedXCoordinate : -computedXCoordinate;
  } else if (computedXCoordinate <= 0) {
    // 向左
    computedXCoordinate *= -1;
  }

  if (computedYCoordinate >= HEIGHT) {
    computedYCoordinate -= (computedYCoordinate - HEIGHT) * 2;
  } else if (computedYCoordinate <= 0) {
    computedYCoordinate *= -1;
  }

  this.xCoordinate = computedXCoordinate;
  this.yCoordinate = computedYCoordinate;
};

// 根据坐标绘制
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.xCoordinate, this.yCoordinate, this.ballRadius, 0, Math.PI * 2, true);
  ctx.fillStyle = this.ballFillColor;
  ctx.fill();
};

// 重新计算方向速度和坐标
Ball.prototype.update = function () {
  const { baseSpeed } = config;
  // 变化的是半径，倾角不改变
  // 需要动态的更新shapeRadius和angle
  this.shapeRadius += baseSpeed;
};

function drawAnimationLoopFunc() {
  const { baseBallRadius, baseGraphRadius, ballNum, baseSpeed, WIDTH, HEIGHT } = config;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  while (balls.length < ballNum) {
    const angle = balls.length * ((Math.PI * 2) / ballNum);

    const ball = new Ball(baseBallRadius, baseGraphRadius, angle);
    balls.push(ball);
  }

  for (var i = 0; i < balls.length; i++) {
    // 计算坐标
    balls[i].updateCoordinates();

    // 绘制当前的球
    balls[i].draw();

    // 更新当前的延伸长度，半径
    balls[i].update();
  }

  // if (R >= 400) {
  //   increment = -baseIncrement;
  // } else if (R <= 50) {
  //   increment = baseIncrement;
  // }
  // R += increment;

  // for (let angle = 0; angle < Math.PI * 2; angle += (Math.PI * 2) / ballNum) {
  //   const offsetX = Math.cos(angle) * R;
  //   const offsetY = Math.sin(angle) * R;
  //   const ball = new Ball(r, R, angle, centerX + offsetX, centerY + offsetY);
  //   ball.draw();
  // }

  window.requestAnimationFrame(drawAnimationLoopFunc);
}

drawAnimationLoopFunc();

// const centerX = WIDTH / 2,
//   centerY = HEIGHT / 2,
//   r = 1 / 2,
//   baseIncrement = 1,
//   ballNum = 360;

// let R = 1,
//   increment = baseIncrement;

// function random(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// }

// function Circle(r, x, y) {
//   this.r = r;
//   this.x = x;
//   this.y = y;
// }

// Circle.prototype.draw = function (r) {
//   ctx.beginPath();
//   ctx.arc(this.x, this.y, r, 0, Math.PI * 2, true); // 绘制
//   // ctx.strokeStyle =
//   //   'rgb(0,' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
//   ctx.strokeStyle = 'blue';
//   ctx.stroke();
// };

// const createBallCircle = (R) => {
//   // 需要计算出来坐标，给定一个x，都会有两个y
//   let r = 1,
//     skip = 1;

//   // x 0->2R
//   // y 0->2R

//   for (let x = 0; x <= R; x += skip) {
//     let y = Math.sqrt(R * R - x * x);
//     // const ballUp = new Ball(r, x, y);

//     if (y > HEIGHT / 2) {
//       y = -y;
//     }
//     ctx.beginPath();

//     ctx.arc(100 + x + R, HEIGHT / 2 + y, r, 0, Math.PI * 2, true);
//     ctx.fillStyle = 'green';
//     ctx.fill();

//     // ctx.beginPath();
//     // // const ballUp = new Ball(r, x, y);
//     // ctx.arc(100 + R - x, HEIGHT / 2 + y, r, 0, Math.PI * 2, true);
//     // ctx.fillStyle = 'red';
//     // ctx.fill();

//     // ctx.beginPath();
//     // // ballUp.draw();
//     // // const ballDown = new Ball(r, x, HEIGHT - y);
//     // ctx.arc(100 + R + x, HEIGHT / 2 - y, r, 0, Math.PI * 2, true);
//     // // ballDown.draw();
//     // ctx.fillStyle = 'blue';
//     // ctx.fill();

//     // ctx.beginPath();
//     // // ballUp.draw();
//     // // const ballDown = new Ball(r, x, HEIGHT - y);
//     // ctx.arc(100 + R - x, HEIGHT / 2 - y, r, 0, Math.PI * 2, true);
//     // // ballDown.draw();
//     // ctx.fillStyle = 'black';
//     // ctx.fill();
//   }
// };

// for (var i = 0; i < 4; i++) {
//   for (var j = 0; j < 3; j++) {
//     ctx.beginPath();
//     var x = 25 + j * 50; // x 坐标值
//     var y = 25 + i * 50; // y 坐标值
//     var radius = 20; // 圆弧半径
//     var startAngle = 0; // 开始点
//     var endAngle = Math.PI + (Math.PI * j) / 2; // 结束点
//     var anticlockwise = i % 2 == 0 ? false : true; // 顺时针或逆时针

//     console.log('绘制图形', x, y, radius, startAngle, endAngle, anticlockwise);

//     ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

//     if (i > 1) {
//       ctx.fill();
//     } else {
//       ctx.stroke();
//     }
//   }
// }

// let r = 10;
// function drawAnimationLoopFunc() {
//   ctx.clearRect(0, 0, WIDTH, HEIGHT);
//   // // ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
//   // // ctx.fillStyle = 'rgba(255, 255, 255, 0)';
//   // // ctx.fillRect(0, 0, WIDTH, HEIGHT);

//   // const circle = new Circle(0, 200, 300);
//   // circle.draw((r += 0.1));

//   createBallCircle((r += 1));

//   if (r > 200) {
//     r = 10;
//   }

//   window.requestAnimationFrame(drawAnimationLoopFunc);
// }

// drawAnimationLoopFunc();

// createBallCircle(200);
