// 方式1，根据原点与应处的位置来计算当前应该处在的坐标，这种方式以来碰撞边界的规则性，只能是 90度的倍数，能处理矩形边界

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const WIDTH = document.documentElement.clientWidth;
const HEIGHT = document.documentElement.clientHeight;
// const HEIGHT = WIDTH;

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
    const distance = computedXCoordinate % (WIDTH * 2);
    if (distance > WIDTH) {
      computedXCoordinate = WIDTH * 2 - distance;
    } else {
      // 二倍宽度的时候
      computedXCoordinate = distance;
    }
  } else if (computedXCoordinate <= 0) {
    computedXCoordinate *= -1;

    const distance = computedXCoordinate % (WIDTH * 2);
    if (distance > WIDTH) {
      computedXCoordinate = WIDTH * 2 - distance;
    } else {
      // 二倍宽度的时候
      computedXCoordinate = distance;
    }
  }

  if (computedYCoordinate >= HEIGHT) {
    const distance = computedYCoordinate % (HEIGHT * 2);
    if (distance > HEIGHT) {
      computedYCoordinate = HEIGHT * 2 - distance;
    } else {
      // 二倍宽度的时候
      computedYCoordinate = distance;
    }
  } else if (computedYCoordinate <= 0) {
    computedYCoordinate *= -1;
    const distance = computedYCoordinate % (HEIGHT * 2);
    if (distance > HEIGHT) {
      computedYCoordinate = HEIGHT * 2 - distance;
    } else {
      // 二倍宽度的时候
      computedYCoordinate = distance;
    }
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

  for (let i = 0; i < balls.length; i++) {
    // 计算坐标
    balls[i].updateCoordinates();

    // 绘制当前的球
    balls[i].draw();

    // 更新当前的延伸长度，半径
    balls[i].update();
  }

  window.requestAnimationFrame(drawAnimationLoopFunc);
}

drawAnimationLoopFunc();
