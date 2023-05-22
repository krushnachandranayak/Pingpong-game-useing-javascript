//this is javascript code written by Krushna Chandra Nayak

//accessing ball and paddle

var ball = document.getElementById("ball");
console.log(ball);
var paddletop = document.getElementById("paddletop");
console.log(ball);
var paddlebottom = document.getElementById("paddlebottom");
console.log(ball);

//variable for game start
var score;
var maxScore;
var movement;
var paddle;
var ballXspeed = 3;
var ballYspeed = 3;
var gameStart = false;

var playerName = "Player1Name";
var prevScore = "PPMaxScore";
var paddletoptName = "player 1";
var paddlebottomName = "player 2";

// height & widht of window

var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;

//message alert for staring game with iife function

(function () {
  paddle = localStorage.getItem(playerName);
  maxScore = localStorage.getItem(maxScore);

  if (paddle === "null" || maxScore === "null") {
    alert("This is the first time you are playing this game, Let's Start it!");
    maxScore = 0;
    paddle = paddletop;
  } else {
    alert(paddle + "has maximum score of " + maxScore * 50);
  }
  resetBoard(paddle);
})();

//for reset

function resetBoard(paddleName) {
  paddletop.style.left =
    (window.innerWidth - paddletop.offsetHeight) / 2 + "px";
  paddlebottom.style.left =
    (window.innerWidth - paddlebottom.offsetHeight) / 2 + "px";
  ball.style.left = (windowWidth - ball.offsetHeight) / 2 + "px";

  //lossing player
  if (paddleName === paddlebottomName) {
    ball.style.top = paddletop.offsetTop + paddletop.offsetHeight + "px";
    ballYspeed = 2;
  } else if (paddleName === paddletoptName) {
    ball.style.top = paddlebottom.offsetTop + paddlebottom.offsetHeight + "px";
    ballYspeed = -2;
  }

  score = 0;
  gameStart = false;
}

// for wining

function storeWin(paddle, score) {
  if (score > maxScore) {
    //update maximum score which are store
    maxScore = score;
    localStorage.setItem(playerName, paddle);
    localStorage.setItem(prevScore, maxScore);
  }

  clearInterval(movement);
  resetBoard(paddle);

  alert(
    paddle +
      " wins with a score of " +
      score * 100 +
      ". Max score is: " +
      maxScore * 100
  );
}

//adding event for playing game
window.addEventListener("keypress", function () {
  let paddleSpeed = 20;
  let paddleRect = paddletop.getBoundingClientRect();
  // let paddleRect2 = paddlebottom.getBoundingClientRect();

  if (
    event.code === "KeyA" &&
    paddleRect.x + paddleRect.width < window.innerWidth
  ) {
    paddletop.style.left = paddleRect.x + paddleSpeed + "px";
    paddlebottom.style.left = paddleRect.x + paddleSpeed + "px";
  } else if (event.code === "KeyD" && paddleRect.x > 0) {
    paddletop.style.left = paddleRect.x - paddleSpeed + "px";
    paddlebottom.style.left = paddleRect.x - paddleSpeed + "px";
  }

  if (event.code === "Enter") {
    if (!gameStart) {
      gameStart = true;
      let ballRect = ball.getBoundingClientRect();
      let ballX = ballRect.x;
      let ballY = ballRect.y;
      let ballDia = ballRect.width;

      let paddletopHeight = paddletop.offsetHeight;
      let paddlebottomHeight = paddlebottom.offsetHeight;
      let paddletopWidth = paddletop.offsetWidth;
      let paddlebottomWidth = paddlebottom.offsetWidth;

      movement = this.setInterval(function () {
        //move ball
        ballX += ballXspeed;
        ballY += ballYspeed;

        let paddletopX = paddletop.getBoundingClientRect().x;
        let paddlebottomX = paddlebottom.getBoundingClientRect().x;

        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

        if (ballX + ballDia > windowWidth || ballX < 0) {
          ballXspeed = -ballXspeed;
        }

        let ballPos = ballX + ballDia / 2;

        if (ballY <= paddletopHeight) {
          ballYspeed = -ballYspeed;
          score += 1;

          if (ballPos < paddletopX || ballPos > paddletopX + paddletopWidth) {
            storeWin(paddlebottomName, score);
          }
        } else if (ballY + ballDia >= windowHeight - paddlebottomHeight) {
          ballYspeed = -ballYspeed;
          score++;

          if (
            ballPos < paddlebottomX ||
            ballPos > paddlebottomX + paddlebottomWidth
          ) {
            storeWin(paddletop, score);
          }
        }
      }, 10);
    }
  }
});
