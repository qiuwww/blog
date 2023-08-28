var raf;
var ball = {
  x: 350,
  y: 650,
  vx: 0.3,
  vy: 0,
  vySpeedUp: 0.2,
  radius: 10,
  color: 'blue',
  upOrDown: 'down',
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();

    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

function clearAnimation(ctx) {
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillRect(301, 601, 298, 298);
}

function drawAnimationBall(ctx) {
  function draw() {
    clearAnimation(ctx);

    // 水平抛物线
    ball.draw(ctx);

    // 判断是否越界
    if (ball.y + ball.vy + ball.radius > 900) {
      ball.upOrDown = 'up';
    } else if (ball.y - ball.vy + ball.radius < 650 || ball.vy <= 0) {
      ball.upOrDown = 'down';
    }

    if (ball.upOrDown === 'up') {
      ball.vy -= ball.vySpeedUp;
      ball.y -= ball.vy;
    } else {
      ball.vy += ball.vySpeedUp;
      ball.y += ball.vy;
    }

    ball.x += ball.vx;

    if (ball.x > 550) {
      ball.x = 350;
      ball.y = 650;
      ball.vx = 0.3;
      ball.vy = 0;
    }

    raf = window.requestAnimationFrame(draw);
  }
  draw();
}
