/* eslint-disable no-plusplus */
// eslint-disable-next-line no-console
import Ball from './Ball';
import Earth from './Earth';
import Brick from './Brick';

export default class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;

        this.ctx = ctx;
        this.init();
    }

    init() {
        this.ctx = this.canvas.getContext('2d');
        //
        this.score = 0;
        // параметры прыжка
        this.jump = false;
        this.jumpCount = 0;
        this.jumpHeight = 0;
        this.jumpLength = 50;
        // параметры для блока
        this.brickHeight = 25;
        this.brickWidth = 50;
        this.brickSpeed = 5;
        // массив блоков
        this.bricks = [];
        // начальный блок
        this.bricks.push({
            x: this.canvas.width,
            y: 50,
        });
        // параметры для мячика
        this.ballRadius = 25;
        this.ballD = this.ballRadius * 2;
        this.ballX = (this.canvas.width - this.ballD) / 2;
        this.ballY = this.canvas.height - this.ballD;
        // обработчик прыжка
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            if (e.keyCode === 38) {
                this.jump = true;
            }
        });

        // setTimeout(this.draw, 10);
    }

    nextBrickSpawn(brick) {
        if (brick.x === 125) {
            this.bricks.push({
                x: this.canvas.width,
                y: Math.floor(Math.random() * 100) + 25,
            });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.bricks.length; i++) {
            const currentBrick = this.bricks[i];
            const brick = new Brick(this.ctx, {
                x: currentBrick.x,
                y: currentBrick.y,
                width: this.brickWidth,
                height: this.brickHeight,
            });

            brick.init();

            currentBrick.x -= this.brickSpeed;

            this.nextBrickSpawn(currentBrick);

            if (((this.ballY <= this.bricks[i].y + this.brickHeight - 10
                && this.ballY >= this.bricks[i].y)
                || ((this.ballY + this.ballRadius * 2 <= this.bricks[i].y)
                    && (this.ballY + this.ballRadius * 2 >= this.bricks[i].y + this.brickHeight)))
                && (this.ballX + this.ballRadius * 2 >= this.bricks[i].x + 10
                    && this.ballX <= this.bricks[i].x + this.brickWidth)) {
                console.log('boom');
            }

            if (currentBrick.x === 5) {
                this.score++;
            }

            if (this.jump) {
                this.jumpCount++;
                this.jumpHeight = 4 * this.jumpLength * Math.sin((Math.PI * this.jumpCount) / this.jumpLength);
            }
            if (this.jumpCount > this.jumpLength) {
                this.jumpCount = 0;
                this.jumpHeight = 0;
                this.jump = false;
            }

            this.ballY = this.canvas.height - this.ballD - this.jumpHeight;
            const ball = new Ball(this.ctx, { x: this.ballX, y: this.ballY, radius: this.ballRadius });
            const earth = new Earth(this.ctx, {
                x: 0,
                y: this.canvas.height - this.ballRadius,
                width: this.canvas.width,
                height: this.ballD,
            });
            earth.init();
            ball.init();

            requestAnimationFrame(this.draw.bind(this));
        }
    }
}
