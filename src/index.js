// JavaScript improved by Krushna Chandra Nayak
document.addEventListener('DOMContentLoaded', function () {
  const ball = document.getElementById('ball');
  const paddleTop = document.getElementById('paddletop');
  const paddleBottom = document.getElementById('paddlebottom');
  const container = document.getElementById('container');
  const scoreRod1 = document.getElementById('scoreRod1');
  const scoreRod2 = document.getElementById('scoreRod2');

  let ballX = container.clientWidth / 2 - ball.offsetWidth / 2;
  let ballY = container.clientHeight / 2 - ball.offsetHeight / 2;
  let ballSpeedX = 0;
  let ballSpeedY = 0;

  let paddleSpeed = 20;
  let paddleWidth = paddleTop.offsetWidth;
  let paddleTopX = container.clientWidth / 2 - paddleWidth / 2;
  let paddleBottomX = paddleTopX;

  let scoreTop = 0;
  let scoreBottom = 0;

  let gameStarted = false;

  // Move paddles using 'A' and 'D' keys
  document.addEventListener('keydown', function (event) {
    if (event.key === 'a' || event.key === 'A') {
      // Move left, but prevent going out of the container
      paddleTopX = Math.max(paddleTopX - paddleSpeed, 0);
      paddleBottomX = Math.max(paddleBottomX - paddleSpeed, 0);
    } else if (event.key === 'd' || event.key === 'D') {
      // Move right, but prevent exceeding container width minus paddle width
      paddleTopX = Math.min(paddleTopX + paddleSpeed, container.clientWidth - paddleWidth);
      paddleBottomX = Math.min(paddleBottomX + paddleSpeed, container.clientWidth - paddleWidth);
    }

    paddleTop.style.left = paddleTopX + 'px';
    paddleBottom.style.left = paddleBottomX + 'px';
  });

  // Start game on 'Enter' key press
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !gameStarted) {
      gameStarted = true;
      resetBall();
      ballSpeedX = 3;
      ballSpeedY = 3;
      moveBall();
    }
  });

  function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball hits the left or right walls
    if (ballX <= 0 || ballX >= container.clientWidth - ball.offsetWidth) {
      ballSpeedX = -ballSpeedX;
    }

    // Ball hits the paddles
    if (
      (ballY <= paddleTop.offsetHeight && ballX >= paddleTopX && ballX <= paddleTopX + paddleWidth) ||
      (ballY >= container.clientHeight - paddleBottom.offsetHeight - ball.offsetHeight &&
        ballX >= paddleBottomX && ballX <= paddleBottomX + paddleWidth)
    ) {
      ballSpeedY = -ballSpeedY;
    }

    // Ball goes out (Top loses or Bottom loses)
    if (ballY < 0) {
      scoreBottom++;
      scoreRod2.textContent = scoreBottom; // Update Rod 2's score
      gameStarted = false;
      resetGame('Rod 1 loses! Rod 2 serves next.');
    }

    if (ballY > container.clientHeight - ball.offsetHeight) {
      scoreTop++;
      scoreRod1.textContent = scoreTop; // Update Rod 1's score
      gameStarted = false;
      resetGame('Rod 2 loses! Rod 1 serves next.');
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    if (gameStarted) {
      requestAnimationFrame(moveBall);
    }
  }

  function resetGame(message) {
    alert(`${message}\nScore: Rod 1: ${scoreTop}, Rod 2: ${scoreBottom}`);
    resetBall();
  }

  function resetBall() {
    ballX = container.clientWidth / 2 - ball.offsetWidth / 2;
    ballY = container.clientHeight / 2 - ball.offsetHeight / 2;
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    ballSpeedX = 0;
    ballSpeedY = 0;
  }
});

// Function to handle rod movement with boundary check
function moveRod(e) {
  let rodSpeed = 20;
  let rodLeft = parseInt(window.getComputedStyle(rod1).getPropertyValue('left'));
  let containerWidth = document.getElementById('container').offsetWidth;
  
  if (e.key === 'a' && rodLeft > 0) {
    rod1.style.left = rodLeft - rodSpeed + 'px';
    rod2.style.left = rodLeft - rodSpeed + 'px';
  }
  
  if (e.key === 'd' && (rodLeft + rod1.offsetWidth) < containerWidth) {
    rod1.style.left = rodLeft + rodSpeed + 'px';
    rod2.style.left = rodLeft + rodSpeed + 'px';
  }
}
