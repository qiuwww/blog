import { Injectable } from '@angular/core';
import { config } from '../config';

@Injectable()
export class BreakoutCanvasService {

    context: any;
    stage: any;

    public init(canvas: any): void {
        this.stage = canvas;
        this.context = canvas.getContext('2d');
        this.context.fillStyle = 'green';
    }

    public drawIntro() {
        this.context.clearRect(0, 0, this.stage.width, this.stage.height);
        this.context.textAlign = 'center';
        this.context.font = '24px Courier New';
        this.context.fillText('Please Press [<] and [>]', this.stage.width / 2, this.stage.height / 2);
    }

    public drawGameOver(text) {
        this.context.clearRect(this.stage.width / 4, this.stage.height / 3, this.stage.width / 2, this.stage.height / 3);
        this.context.textAlign = 'center';
        this.context.font = '24px Courier New';
        this.context.fillText(text, this.stage.width / 2, this.stage.height / 2);
    }

    public drawScore(score: number) {
        this.context.textAlign = 'left';
        this.context.font = '20px Courier New';
        this.context.fillText(`得分：${score}`, config.BRICK_GAP, 20);
    }

    public drawPaddle(position) {
        this.context.beginPath();
        this.context.rect(
            position - config.PADDLE_WIDTH / 2,
            this.context.canvas.height - config.PADDLE_HEIGHT,
            config.PADDLE_WIDTH,
            config.PADDLE_HEIGHT
        );
        this.context.fill();
        this.context.closePath();
    }

    public drawBall(ball: any) {
        this.context.beginPath();
        this.context.arc(ball.position.x, ball.position.y, config.BALL_RADIUS, 0, Math.PI * 2);
        this.context.fill();
        this.context.closePath();
    }

    public drawBrick(brick) {
        this.context.beginPath();
        this.context.rect(
            brick.x - brick.width / 2,
            brick.y - brick.height / 2,
            brick.width,
            brick.height
        );
        this.context.fill();
        this.context.closePath();
    }

    public drawBricks(bricks) {
        bricks.forEach(brick => this.drawBrick(brick));
    }

    constructor() {
    }
}
