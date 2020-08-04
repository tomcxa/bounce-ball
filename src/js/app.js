/* eslint-disable no-plusplus */
// eslint-disable-next-line no-console
import Ball from './Ball';
import Earth from './Earth';
import Brick from './Brick';
import Score from './Score';
import Modal from './Modal';

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.querySelector('.app');
    const canvas = appContainer.querySelector('.canvas');
    const ctx = canvas.getContext('2d');

    let modal = null;

    let score = 0;
    const winScore = 5;

    let frameId = null;
    let jump = false;
    let jumpCount = 0;
    let jumpHeight = 0;
    const jumpLength = 50;

    const brickHeight = 25;
    const brickWidth = 50;
    const bricks = [];
    bricks.push({
        x: canvas.width,
        y: 50,
    });

    const ballRadius = 25;
    const ballDiameter = ballRadius * 2;
    const ballX = (canvas.width - ballDiameter) / 2;
    let ballY = canvas.height - ballDiameter;

    function restart() {
        window.location.reload();
    }

    function showModal(text) {
        modal = new Modal(appContainer, text, restart);
        modal.render();
    }

    function checkLose(brick) {
        if (((ballY <= brick.y + brickHeight - 10
            && ballY >= brick.y)
            || ((ballY + ballRadius * 2 <= brick.y)
                && (ballY + ballRadius * 2 >= brick.y + brickHeight)))
            && (ballX + ballRadius * 2 >= brick.x + 10
                && ballX <= brick.x + brickWidth)
        ) {
            cancelAnimationFrame(frameId);
            showModal('You lose!');
        }
    }

    function checkWin(scoreToWin) {
        if (score === scoreToWin && jump) {
            cancelAnimationFrame(frameId);
            showModal('You win!');
        }
    }

    function scoreUp() {
        score++;
    }

    function nextBrick(brick, gap) {
        if (brick.x === gap) {
            bricks.push({
                x: canvas.width,
                y: Math.floor(Math.random() * 150) + 50, // специально выше чем можно прыгнуть
            });
        }
    }

    function draw() {
        frameId = requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < bricks.length; i++) {
            const currentBrick = bricks[i];
            const brick = new Brick(ctx, {
                x: currentBrick.x,
                y: currentBrick.y,
                width: brickWidth,
                height: brickHeight,
            });

            brick.init();

            currentBrick.x -= 5;

            nextBrick(currentBrick, 125);
            checkLose(currentBrick);

            if (currentBrick.x + brickWidth === ballX && jump) {
                scoreUp();
            }

            checkWin(winScore);
        }

        if (jump) {
            jumpCount++;
            jumpHeight = 4 * jumpLength * Math.sin((Math.PI * jumpCount) / jumpLength);
        }
        if (jumpCount > jumpLength) {
            jumpCount = 0;
            jumpHeight = 0;
            jump = false;
        }

        ballY = canvas.height - ballDiameter - jumpHeight;
        const ball = new Ball(ctx, { x: ballX, y: ballY, radius: ballRadius });
        const earth = new Earth(ctx, {
            x: 0,
            y: canvas.height - ballRadius,
            width: canvas.width,
            height: ballDiameter,
        });
        const scoreField = new Score(ctx, {
            position: canvas.height,
            text: score,
            maxScore: winScore,
        });

        earth.init();
        ball.init();
        scoreField.init();
    }

    document.addEventListener('keydown', (e) => {
        e.preventDefault();
        if (e.keyCode === 38) {
            jump = true;
        }
    });

    requestAnimationFrame(draw);
});
