// 方式2，需要根据当前的位置与 速度 * 倾角来计算下一帧应该的位置。

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const WIDTH = document.documentElement.clientWidth;
const HEIGHT = document.documentElement.clientHeight;

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
  centerY: HEIGHT / 2,

  // 小圆点的半径
  baseBallRadius: 1,
  ballFillColor: 'blue',
  // 基础的增量，也就是速度
  baseSpeed: 3,
  // 模拟的小圆点的个数
  ballNum: 360 * 20,

  baseGraphRadius: 100,
  maxGraphRadius: 300,
};

function Ball(ballRadius, baseSpeed) {
  const { ballFillColor } = config;

  this.ballRadius = ballRadius;
  this.ballFillColor = ballFillColor;

  this.baseSpeed = baseSpeed;
  // 用于更新
  this.xSpeed = 0;
  this.ySpeed = 0;

  // 用于记录更新之后的位置，便于下一步作图
  this.curXCoordinate = 0;
  this.curYCoordinate = 0;
}

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.xCoordinate, this.yCoordinate, this.ballRadius, 0, Math.PI * 2, true);
  ctx.fillStyle = this.ballFillColor;
  ctx.fill();
};

// 重新计算方向速度和坐标
Ball.prototype.update = function () {
  const { baseSpeed } = this;
  // 调用一次就累加一次位置记录

  // 变化的是半径，倾角不改变
  // 需要动态的更新shapeRadius和angle
  // this.shapeRadius += baseSpeed;
  this.curXCoordinate = this.curXCoordinate + this.xSpeed;
  this.curYCoordinate = this.curXCoordinate + this.ySpeed;
};

// // 绘制直线
// ctx.beginPath();
// // 起点
// ctx.moveTo(this.xCoordinate + config.centerX, 0 + config.centerY);
// // 终点
// ctx.lineTo(this.xCoordinate, this.yCoordinate);
// ctx.closePath();
// ctx.stroke();

// 获取当前图形，同心的外边的图形的边界
// 默认是一个正方形，直接碰触canvas的边界
// 现在可以调整边界为一个长方形/圆形/双曲线/椭圆？
// 就是要根据

function drawEllipseCurve() {
  const { centerX, centerY } = config;

  if (ctx.ellipse) {
    // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)是现在更新的，
    // 参数的意思：(起点x,起点y,半径x,半径y,旋转的角度，起始角，结果角，顺时针还是逆时针)
    //
    ctx.ellipse(centerX, centerY, centerX * 0.8, centerY / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#058';
    ctx.strokeStyle = '#000';
    // ctx.fill();
    ctx.stroke();
  } else {
    alert('no ellipse!');
  }
}

function drawEllipseLine() {}

drawEllipseCurve();
