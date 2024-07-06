const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10, paddleHeight = 100, ballSize = 10;
const playerSpeed = 6, computerSpeed =  5;
const paddleSpeed = 5, ballSpeedInitial = 5;
let playerY = (canvas.height - paddleHeight) / 2;
let computerY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = ballSpeedInitial, ballSpeedY = ballSpeedInitial;
let playerScore = 0, computerScore = 0;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX + ballSize > canvas.width) {
        if (ballY > computerY && ballY < computerY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            playerScore++;
            resetBall();
        }
    }

    if (ballX - ballSize < 0) {
        if (ballY > playerY && ballY < playerY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            computerScore++;
            resetBall();
        }
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * ballSpeedInitial;
    updateScore();
}

function moveComputer() {
    const imprecision = 50; 

    if (computerY + paddleHeight / 2 < ballY - imprecision) {
        computerY += paddleSpeed;
    } else if(computerY + paddleHeight / 2 > ballY + imprecision){
        computerY -= paddleSpeed;
    }
}
function updateScore() {
    document.getElementById('playerScore').innerText = playerScore;
    document.getElementById('computerScore').innerText = computerScore;
}
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRect(0, playerY, paddleWidth, paddleHeight, 'white');
    drawRect(canvas.width - paddleWidth, computerY, paddleWidth, paddleHeight, 'white');
    drawCircle(ballX, ballY, ballSize, 'white');

    moveBall();
    moveComputer();
}

setInterval(gameLoop, 1000 / 60);

document.addEventListener('mousemove', function(event) {
    let relativeY = event.clientY - canvas.getBoundingClientRect().top;
    if (relativeY > 0 && relativeY < canvas.height - paddleHeight) {
        playerY = relativeY;
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && playerY > 0) {
        playerY -= paddleSpeed;
    } else if (event.key === 'ArrowDown' && playerY < canvas.height - paddleHeight) {
        playerY += paddleSpeed;
    }
}); 
